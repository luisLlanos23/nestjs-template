import * as fs from 'fs';
import * as Joi from 'joi';
import * as dotenv from 'dotenv';

export type EnvConfig = Record<string, any>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    const parsedConfig = {
      ...config,
      PORT: parseInt(config.PORT || '', 10) || parseInt(process.env.PORT || '', 10) || 4000,
      DATABASE_PORT: parseInt(config.DATABASE_PORT || '', 10) || parseInt(process.env.DATABASE_PORT || '', 10) || 5432,
    };

    this.envConfig = ConfigService.validateInput({
      ...parsedConfig,
      ...process.env,
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
