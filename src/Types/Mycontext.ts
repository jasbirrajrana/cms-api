import { Request, Response } from "express";
import { Redis } from "ioredis";
import { Cookie } from "express-session";

export type ctx = {
  req: Request & any;
  redis: Redis;
  res: Response;
  cookie: Cookie;
};
