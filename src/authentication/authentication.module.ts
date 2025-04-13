import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { AuthenticationController } from 'src/authentication/authentication.controller';
import { TokenService } from 'src/service/token/token.service';
import { UsersModule } from 'src/api/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({})
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, TokenService],
})
export class AuthenticationModule {}
