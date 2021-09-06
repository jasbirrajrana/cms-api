import UserModel from "../schema/UserSchema";
import { MiddlewareFn } from "type-graphql";
import { ctx } from "../Types/Mycontext";

export const isAuth: MiddlewareFn<ctx> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not Authenticated");
  }
  return next();
};

export const isAdmin: MiddlewareFn<ctx> = async ({ context }, next) => {
  const user = await UserModel.findById(context.req.session.userId);
  if (!user?.isAdmin) {
    throw new Error("Not Authenticated!");
  }
  return next();
};

export const isSuperAdmin: MiddlewareFn<ctx> = async ({ context }, next) => {
  const user = await UserModel.findById(context.req.session.userId);
  if (!user?.isSuperAdmin) {
    throw new Error("Not Authenticated as Super Admin");
  }
  return next();
};
