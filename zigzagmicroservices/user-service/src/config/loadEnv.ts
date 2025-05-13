import * as dotenv from 'dotenv';
import * as path from 'path';

const env = process.env.APP_ENV || 'development';

let envFile = '.env';

if (env === 'staging') {
  envFile = '.env.staging';
} else if (env === 'production') {
  envFile = '.env.production';
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`✅ Loaded environment from ${envFile}`);