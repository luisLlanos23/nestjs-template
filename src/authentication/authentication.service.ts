import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/authentication/authentication.dto'
import { DATABASE_MANAGER_PROVIDER } from 'src/database/database.dto';
import { UsersService } from 'src/api/users/users.service';
import { TokenService } from 'src/service/token/token.service';
import { UsersEntity } from 'src/api/users/entities/user.entity';
import { CreateUserDto } from 'src/api/users/dto/user.dto';

@Injectable()
export class AuthenticationService {
  @Inject(DATABASE_MANAGER_PROVIDER) DataSource: DataSource;
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService
  ) {}

  async register(userData: CreateUserDto): Promise<Partial<UsersEntity & { token: string }>> {
    const user = await this.usersService.create(userData);
    const token = await this.tokenService.createTokenKey({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }, '10h');
    await this.setExpirationToken(token)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }

  async login(loginData: LoginDto): Promise<Partial<UsersEntity & { token: string }>> {
    const user = await this.usersService.findByEmail(loginData.email);
    if (!user) throw new Error('User not found');
    const token = await this.tokenService.createTokenKey({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }, '10h');
    await this.setExpirationToken(token)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  }

  private async setExpirationToken(token: string) {
    const tokenDecode = await this.tokenService.verifyToken(token);
    await this.usersService.setExpirationToken(tokenDecode.data.id, tokenDecode);
  }

  async verify(token: string) {
    const data = await this.tokenService.verifyToken(token)
    if (!data) throw new Error('Invalid token');
    return data;
  }
}
