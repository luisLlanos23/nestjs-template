import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/api/users/users.service';
import { UsersController } from 'src/api/users/users.controller';
import { USERS_PROVIDER } from 'src/api/users/dto/user.dto';
import { UsersEntity } from './entities/user.entity';
import { TokenService } from 'src/service/token/token.service';
import { DATABASE_MANAGER_PROVIDER } from 'src/database/database.dto';

@Module({
  imports: [
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [{
    provide: USERS_PROVIDER,
    inject: [DATABASE_MANAGER_PROVIDER],
    useFactory: (DataSource: DataSource) => DataSource.getRepository(UsersEntity)
  },
    UsersService,
    TokenService
  ],
  exports: [USERS_PROVIDER, UsersService],
})
export class UsersModule {}
