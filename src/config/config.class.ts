import { join } from 'path';
import { ConfigService } from './config.service';

export function ConfigServiceI() {
  const FOLDER_ENV = join(__dirname, '..', '..', 'env');
  const FILE_ENV = `${FOLDER_ENV}/${process.env.NODE_ENV || 'development'}.env`;
  return new ConfigService(FILE_ENV);
}
