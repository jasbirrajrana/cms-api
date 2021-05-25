import redis from "redis";
import bluebird from "bluebird";

bluebird.promisifyAll(redis);
export const client = redis.createClient(
  6380,
  process.env.REDIS_CACHE_HOST_NAME,
  {
    auth_pass: process.env.REDIS_CACHE_KEY,
    tls: process.env.REDIS_CACHE_HOST_NAME,
  }
);
