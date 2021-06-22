import redis from "redis";
import bluebird from "bluebird";

bluebird.promisifyAll(redis);
export const client = redis.createClient({
  url: process.env.REDIS_PUBLIC_ENDPOINT!,
  auth_pass: process.env.REDIS_DATABASE_PASSWORD!,
});

client.on("error", (err) => {
  global.console.log(err.message);
});
