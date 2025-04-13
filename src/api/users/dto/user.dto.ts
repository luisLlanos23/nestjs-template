import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const USERS_ENTITY = 'users';
export const USERS_PROVIDER = 'USERS_REPOSITORY';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  lastName?: string;
  @IsOptional()
  @IsString()
  password?: string;
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
  @IsOptional()
  @IsDate()
  tokenExpiration? : Date;

}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}