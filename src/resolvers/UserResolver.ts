import UserModel, { User } from "../schema/UserSchema";
import { Arg, Ctx, Mutation, ObjectType, Query } from "type-graphql";
import * as argon2 from "argon2";
import { UserResponse } from "../Types/UserResponse";
import { ctx } from "../Types/Mycontext";
import { COOKIE_NAME } from "../Types/constants";
import PostModel, { Post } from "../schema/PostSchema";
import { sendMailForOtp } from "../config/sendMail";
import OtpModel, { Otp } from "../schema/OtpSchema";
import { confirmOtp } from "../utils/confirmOtp";

@ObjectType()
export class UserResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: ctx) {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: ctx) {
    if (!req.session.userId) {
      return null;
    }
    console.log(req.session.userId);
    return UserModel.findById(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: ctx
  ): Promise<UserResponse> {
    const userExist = await UserModel.findOne({ email });
    if (userExist === null) {
      return {
        errors: [
          {
            field: "email",
            message: "could not find a user with provided Email id!",
          },
        ],
      };
    }
    const valid = await argon2.verify(userExist.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "password is not matching!",
          },
        ],
      };
    }

    if (!userExist.isVerfied) {
      return {
        errors: [
          {
            field: "Verification",
            message: "You are'nt verfied user!",
          },
        ],
      };
    }
    // store user id session

    // this will set a cookie on the user

    // keep them logged in

    req.session.userId = userExist._id;

    return {
      user: userExist,
    };
  }
  @Mutation(() => UserResponse)
  async register(
    @Arg("otp", () => Number) otp: number,
    @Ctx() { req }: ctx
  ): Promise<UserResponse> {
    let { username, password, email }: any = await OtpModel.findOne({ otp });

    let otp_obj = await confirmOtp(email, otp);
    const user = await UserModel.create({
      username,
      password,
      email,
      isVerfied: true,
    });
    if (user) {
      try {
        await OtpModel.deleteOne({ _id: otp_obj._id });
      } catch (error) {
        throw new Error(error);
      }
    }
    req.session.userId = user._id;
    return { user };
  }

  @Query(() => [Post])
  async getPosts(@Arg("_id", () => String) _id: string) {
    const posts = await PostModel.find({ author: _id });
    return posts;
  }

  @Query(() => [Post])
  async getMyPosts(@Ctx() { req }: ctx) {
    const posts = await PostModel.find({ author: req.session.userId });
    return posts;
  }
}
