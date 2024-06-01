import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 5000,
  database_url: process.env.DB,
  coin_api: process.env.COINPAPRIKA_API_URL,
  redis_url: process.env.REDIS_URL,
};
