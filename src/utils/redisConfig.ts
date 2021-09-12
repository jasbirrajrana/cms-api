import redis from "redis";
import asyncRedis from "async-redis";
import Redis from "ioredis";
// import { promisify } from "util";
import bluebird from "bluebird";
// bluebird.promisifyAll(redis);

export const client = redis.createClient({
  url: process.env.REDIS_PUBLIC_ENDPOINT!,
  auth_pass: process.env.REDIS_DATABASE_PASSWORD!,
  //@ts-ignore
  port: process.env.REDIS_CACHE_PORT,
});

//@ts-ignore
// export const client = new Redis({
//   port: process.env.REDIS_CACHE_PORT,
//   host: process.env.REDIS_PUBLIC_ENDPOINT!,
//   password: process.env.REDIS_DATABASE_PASSWORD!,
// });
// export const client = asyncRedis.decorate(wAsync);
// export const getAsync = promisify(client.get).bind(client);

// export const client = new Redis({
//   host: process.env.REDIS_PUBLIC_ENDPOINT,
//   password: process.env.REDIS_DATABASE_PASSWORD
// })

client.on("error", function (err) {
  console.log("Redis error encountered", err);
});

client.on("end", function () {
  console.log("Redis connection closed");
});
