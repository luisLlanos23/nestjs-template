import { Module, Global, DynamicModule } from '@nestjs/common';
import { databaseManagerProviders } from 'src/database/database-providers';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [...databaseManagerProviders],
      exports: [...databaseManagerProviders],
    };
  }
}
