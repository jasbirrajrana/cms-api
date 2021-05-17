import UserModel, { User } from "../schema/UserSchema";
import { Arg, Ctx, Mutation, ObjectType, Query } from "type-graphql";
import * as argon2 from "argon2";
import { UserResponse } from "../Types/UserResponse";
import { ctx } from "../Types/Mycontext";
import { v4 } from "uuid";
import { COOKIE_NAME } from "../Types/constants";
import { sendEmail } from "../utils/sendMail";
import { client } from "../utils/redisConfig";

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
    @Arg("username", () => String) username: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: ctx
  ): Promise<UserResponse> {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return {
        errors: [
          {
            field: "email",
            message: "Email is Already in Use!",
          },
        ],
      };
    }
    if (password.length <= 4) {
      return {
        errors: [
          {
            field: "password",
            message: "password length must be greater than 4",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    // req.session.userId = user._id;
    const token = v4();
    console.log(typeof token);
    client.set(token, user._id);
    const url = `http://localhost:3000/user/confirm/${token}`;
    await sendEmail(user.email, url);
    return { user };
  }
}
