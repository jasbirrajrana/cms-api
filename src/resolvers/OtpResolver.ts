import * as argon2 from "argon2";
import { UserResponse } from "../Types/UserResponse";
import { Arg, Mutation, ObjectType } from "type-graphql";
import { sendMailForOtp } from "../config/sendMail";
import OtpModel from "../schema/OtpSchema";
import UserModel from "../schema/UserSchema";

@ObjectType()
export class OtpResolver {
  @Mutation(() => UserResponse)
  async sendOtp(
    @Arg("username", () => String) username: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ): Promise<UserResponse> {
    let isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return {
        errors: [
          {
            field: "Email",
            message: "Email Already Registered!",
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
    let sentOtp = await sendMailForOtp(email);

    let otp_sent_prev: any = await OtpModel.find({ email });
    if (otp_sent_prev.length !== 0) {
      otp_sent_prev = await OtpModel.updateOne({ otp: sentOtp });
      return { goingForVerification: true };
    }
    await OtpModel.create({
      email,
      otp: sentOtp,
      username,
      password: hashedPassword,
    });
    return { goingForVerification: true };
  }
}
