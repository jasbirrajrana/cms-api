import { v4 } from "uuid";
import { client } from "./redisConfig";
// import redis from "redis";
export const createConfirmationUrl = async (email: string) => {
  const token = v4();
  console.log("--->token", token);
  await client.set(token, email, "ex", 60 * 60 * 24);
  return `http://localhost:3000/user/confirm/${token}`;
};
