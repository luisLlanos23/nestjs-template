import { Module, DynamicModule, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(path: any): DynamicModule {
    const provides = [
      {
        provide: ConfigService,
        useValue: new ConfigService(path),
      },
    ];

    return {
      module: ConfigModule,
      providers: provides,
      exports: provides,
    };
  }
}
