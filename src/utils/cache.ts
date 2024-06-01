import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

const getCache = async (key: string): Promise<string | null> => {
  try {
    return await redis.get(key);
  } catch (err) {
    console.error('Error getting cache:', err);
    return null;
  }
};

const setCache = async (
  key: string,
  value: string,
  ttl: number,
): Promise<void> => {
  try {
    await redis.set(key, value, 'EX', ttl);
  } catch (err) {
    console.error('Error setting cache:', err);
  }
};

export { getCache, setCache };
