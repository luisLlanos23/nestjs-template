import * as passport from 'passport';
import * as SwaggerUi from 'swagger-ui-express'
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { HttpExceptionFilter } from 'src/utils/filters/http-exception.filter';
import { TransformInterceptor } from 'src/utils/interceptors/transform.interceptor';
import SwaggerApi from 'src/openapi'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '800mb' }));
  app.use(bodyParser.urlencoded({ limit: '800mb', extended: true }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(compression());
  app.useWebSocketAdapter(new IoAdapter(app));

  app.use('/docs/api', SwaggerUi.serve, SwaggerUi.setup(await SwaggerApi()))

  app.use(passport.initialize());
  const configService = app.get(ConfigService);
  await app.listen(configService.portApi());
}
bootstrap();
