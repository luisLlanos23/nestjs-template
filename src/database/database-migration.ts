import * as path from 'path';
import { glob } from 'glob';
import { execSync } from 'child_process';

const entityGlob = 'src/api/*/entities/*entity.ts';
const migrationsDir = 'src/database/migrations';

const files = glob.sync(entityGlob);

if (!files.length) {
  console.log('No entity files were found.');
  process.exit(0);
}

files.forEach((filePath) => {
  const parts = filePath.split('/');
  const entityFile = parts[parts.length - 1];
  const entityName = entityFile.replace('.ts', '').replace('.entity', '');
  const migrationName = `${entityName}`;
  const fullPath = path.join(migrationsDir, migrationName);
  console.log(`Generate migration for ${filePath} -> ${fullPath}`);

  try {
    execSync(`npx typeorm migration:create ${fullPath.replace('.ts', '')}`, { stdio: 'inherit' });
  } catch (err: any) {
    console.error(`Error on entity migration: ${filePath}:`, err.message);
  }
});
