import { v4 } from "uuid";
import { client } from "./redisConfig";
export const createConfirmationUrl = async (email: string) => {
  const token = v4();
  console.log("--->token", token);
  await client.set(token, email);
  return `http://localhost:3000/user/confirm/${token}`;
};
