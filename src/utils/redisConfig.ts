import redis from 'redis'
import { promisify } from 'util'
export const client = redis.createClient({
  url: process.env.REDIS_PUBLIC_ENDPOINT!,
  auth_pass: process.env.REDIS_DATABASE_PASSWORD!,
});
export const getAsync = promisify(client.get).bind(client)

// export const client = new Redis({
//   host: process.env.REDIS_PUBLIC_ENDPOINT,
//   password: process.env.REDIS_DATABASE_PASSWORD
// })

client.on("error", (err) => {
  global.console.log(err.message);
});
