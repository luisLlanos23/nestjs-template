import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { ApiModule } from 'src/api/api.module';
import { TokenService } from 'src/service/token/token.service';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AuthVerifyTokenMiddleware } from 'src/middlewares/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot('.env'),
    DatabaseModule.forRoot(),
    ApiModule,
    AuthenticationModule,
    JwtModule.register({})
  ],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthVerifyTokenMiddleware)
      .forRoutes({ path: 'api/*', method: RequestMethod.ALL })
  }
}