import { client } from "../utils/redisConfig";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import redis from "redis";
import UserModel from "../schema/UserSchema";
import { ctx } from "../Types/Mycontext";
import { UserResponse } from "../Types/UserResponse";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => UserResponse)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() { req }: ctx
  ): Promise<UserResponse> {
    let e: any;

    await client.get(token, function (error, value) {
      if (!error) {
        e = String(value);
      }
    });

    const user = await UserModel.findOne({ e });
    if (user?.isVerfied) {
      return {
        errors: [
          {
            message: "Already verified!",
          },
        ],
      };
    }

    let updatedUser: any;
    if (user) {
      user.isVerfied = true;
      updatedUser = await user.save();
    }
    req.session.userId = updatedUser._id;
    await client.del(token);
    return { user: updatedUser };
  }
}
