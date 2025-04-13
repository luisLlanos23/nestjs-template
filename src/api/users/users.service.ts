import { UpdateResult } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { BaseRepo } from 'src/base/base.repository';
import { BaseService } from 'src/base/base.service';
import { ChangePasswordDto, CreateUserDto, UpdateUserDto, USERS_PROVIDER } from 'src/api/users/dto/user.dto';
import { UsersEntity } from 'src/api/users/entities/user.entity';
import { CryptoUtilities } from 'src/utils/crypto/crypto.utils'
import { TokenData, TokenService } from 'src/service/token/token.service';

@Injectable()
export class UsersService extends BaseService<
  UsersEntity,
  CreateUserDto,
  UpdateUserDto
  > {
  public repository: BaseRepo<UsersEntity>;

  constructor(
    @Inject(USERS_PROVIDER) repository: BaseRepo<UsersEntity>,
    private tokenService: TokenService
  ) {
    super();
    this.repository = repository;
  }

  async create(user: CreateUserDto): Promise<UsersEntity> {
    return await this.repository.save({
      ...user,
      password: await new CryptoUtilities().encrypt(user.password),
    });
  }

  async getAll(): Promise<Partial<UsersEntity>[]> {
    return (await this.repository.find()).map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  }

  async getById(id: number): Promise<Partial<UsersEntity> | null> {
    const user = await this.repository.findOne({ where: { id } });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<UsersEntity | null> {
    const user = await this.repository.createQueryBuilder('user')
      .where('trim(lower(user.email)) = trim(lower(:email)) and user.deleted_at is null', { email })
      .getOne();
    return user;
  }

  async update(id: number, user: UpdateUserDto): Promise<UpdateResult> {
    const userToUpdate = await this.repository.findOne({ where: { id } });
    if (!userToUpdate) throw new Error('User not found');
    if (user.password) {
      user.password = await new CryptoUtilities().encrypt(user.password);
    }
    return await this.repository.update(id, {
      ...userToUpdate,
      ...user,
    });
  }

  async removeUser(id: number, token: string): Promise<UpdateResult> {
    const dataToken = await this.tokenService.verifyTokenKey(token);
    const userToDelete = await this.repository.findOne({ where: { id } });
    if (!userToDelete) throw new Error('User not found');
    if (userToDelete.id !== dataToken.data.id && !dataToken.data.isAdmin) {
      throw new Error('You cannot delete this account unless you are an admin');
    }
    return await this.repository.softDelete(id);
  }

  async setExpirationToken(id: number, decodedToken: TokenData): Promise<void> {
    const expirationDate = new Date(decodedToken.exp * 1000);
    await this.repository.update(id, { tokenExpiration: expirationDate });
  }

  async userEnable(id: number, token: string): Promise<UpdateResult> {
    const dataToken = await this.tokenService.verifyTokenKey(token);
    const userToEnable = await this.repository.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .withDeleted()
      .getOne();
    if (!userToEnable) throw new Error('User not found');
    if (dataToken.data.id !== userToEnable.id && !dataToken.data.isAdmin) {
      throw new Error('You cannot enable this account unless you are an admin');
    }
    return await this.repository.restore(id);
  }

  async changePassword(passwords: ChangePasswordDto, token: string, userId: number): Promise<UpdateResult> {
    const payload = await this.verifyTokenAndGetPayload(token);
    const user = await this.getUserAndValidateAccess(payload.data, userId);
    await this.validatePasswords(passwords.newPassword, passwords.password, user.password);
    user.password = await this.encryptPassword(passwords.newPassword);
    return await this.repository.update(user.id, user);
  }

  private async verifyTokenAndGetPayload(token: string) {
    const payload = await this.tokenService.verifyToken(token);
    if (!payload) throw new Error('Invalid token');
    return payload;
  }

  private async getUserAndValidateAccess(payload: { id: number, email: string, isAdmin: boolean }, userId: number) {
    const user = await this.repository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    if (payload.id !== user.id && !payload.isAdmin) {
      throw new Error('Cannot change password for this user');
    }
    return user;
  }

  private async validatePasswords(newPassword: string, oldPassword: string, currentPassword: string) {
    const cryptoUtilities = new CryptoUtilities();
    if (!cryptoUtilities.isCorrectPassword(oldPassword, currentPassword)) {
      throw new Error('Old password is incorrect');
    }
    if (await cryptoUtilities.isCorrectPassword(newPassword, currentPassword)) {
      throw new Error('New password cannot be the same as old password');
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    const cryptoUtilities = new CryptoUtilities();
    return await cryptoUtilities.encrypt(password);
  }
}