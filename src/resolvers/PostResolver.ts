import { isAuth } from "../middleware/isAuth";
import { Arg, Ctx, Mutation, ObjectType, UseMiddleware } from "type-graphql";
import PostModel from "../schema/PostSchema";
import { ctx } from "../Types/Mycontext";
import slugify from "slugify";
@ObjectType()
export class PostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("title", () => String) title: string,
    @Arg("body", () => String) body: string,
    @Ctx() { req }: ctx
  ): Promise<boolean> {
    const slug = slugify(title);
    const post = await PostModel.create({
      title,
      body,
      user: req.session.userId,
      slug,
    });
    if (!post) {
      return false;
    }
    return true;
  }
}
