import { client,getAsync } from "../utils/redisConfig";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
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
    let emailid=await getAsync(token) 
    let user = await UserModel.findOne({ email: emailid })
    if (!user) {
      throw new Error("Something went wrong!")
    }
    if (user?.isVerfied) {
      return {
        errors: [
          {
            message: "Already verified",
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
