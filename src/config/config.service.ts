import * as fs from 'fs';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';

export type EnvConfig = Record<string, any>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = fs.existsSync(filePath)
      ? dotenv.parse(fs.readFileSync(filePath))
      : {};

    this.envConfig = ConfigService.validateInput({
      DATABASE_HOST: config.DATABASE_HOST || process.env.DATABASE_HOST || 'localhost',
      DATABASE_NAME: config.DATABASE_NAME || process.env.DATABASE_NAME || 'test',
      DATABASE_PORT: parseInt(config.DATABASE_PORT || process.env.DATABASE_PORT || '5432', 10),
      DATABASE_USER: config.DATABASE_USER || process.env.DATABASE_USER || 'user',
      DATABASE_PASS: config.DATABASE_PASS || process.env.DATABASE_PASS || 'password',
      DATABASE_SCHEMA: config.DATABASE_SCHEMA || process.env.DATABASE_SCHEMA || 'public',
      PORT: parseInt(config.PORT || process.env.PORT || '4000', 10),
      RUN_MIGRATIONS: config.RUN_MIGRATIONS === 'true' || process.env.RUN_MIGRATIONS === 'true' || false,
      SECRET_TOKEN: config.SECRET_TOKEN || process.env.SECRET_TOKEN || 'default-secret',
    });
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  hostDatabase(): string {
    return this.envConfig.DATABASE_HOST;
  }
  nameDatabase(): string {
    return this.envConfig.DATABASE_NAME;
  }
  schemaDatabase(): string {
    return this.envConfig.DATABASE_SCHEMA;
  }
  portDatabase(): number {
    return this.envConfig.DATABASE_PORT;
  }
  userDatabase(): string {
    return this.envConfig.DATABASE_USER;
  }
  passDatabase(): string {
    return this.envConfig.DATABASE_PASS;
  }
  isDevelopment(): string {
    return this.envConfig.DEVELOPMENT;
  }
  portApi(): number {
    return this.envConfig.PORT;
  }
  runMigrations(): boolean {
    return this.envConfig.RUN_MIGRATIONS;
  }
  secretToken(): string {
    return this.envConfig.SECRET_TOKEN;
  }

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DATABASE_HOST: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASS: Joi.string().required(),
      DATABASE_SCHEMA: Joi.string().required(),
      PORT: Joi.number().required(),
      RUN_MIGRATIONS: Joi.boolean().default(false),
      SECRET_TOKEN: Joi.string().required(),
    });
    const { error, value: validatedEnvConfig } =
      envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
