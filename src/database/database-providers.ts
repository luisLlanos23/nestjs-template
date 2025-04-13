import { DataSource } from 'typeorm';
import { DATABASE_MANAGER_PROVIDER } from 'src/database/database.dto';
import { ConfigService } from 'src/config/config.service';

const configService = new ConfigService(__dirname + '/../../.env');

export const AppDataSource = new DataSource({
  type: 'postgres',
  schema: configService.schemaDatabase(),
  host: configService.hostDatabase(),
  port: configService.portDatabase(),
  username: configService.userDatabase(),
  password: configService.passDatabase(),
  database: configService.nameDatabase(),
  migrationsTableName: 'migrations_registers',
  migrations: [__dirname + './migrations/*{.ts,.js}'],
  entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
  synchronize: configService.runMigrations() ? true : false,
});

export const databaseManagerProviders = [
  {
    provide: DATABASE_MANAGER_PROVIDER,
    inject: [ConfigService],
    useFactory: async () => {
      await AppDataSource.initialize();
      if (configService.runMigrations()) {
        const migrations = await AppDataSource.showMigrations();
        if (migrations) {
          console.log('Migrations are pending. Ensure you have created migration files using TypeORM CLI or programmatically.');
          await AppDataSource.runMigrations();
          console.log('Migrations have been executed successfully.');
        } else {
          console.log('No pending migrations.');
        }
      }
      return AppDataSource;
    },
  },
];
