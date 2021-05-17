import { MiddlewareFn } from "type-graphql";
import { ctx } from "../Types/Mycontext";

export const isAuth: MiddlewareFn<ctx> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not Authenticated");
  }
  return next();
};
