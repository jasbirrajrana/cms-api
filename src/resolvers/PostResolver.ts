import { isAuth } from "../middleware/isAuth";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  UseMiddleware,
} from "type-graphql";
import PostModel, { Post } from "../schema/PostSchema";
import { ctx } from "../Types/Mycontext";
import slugify from "slugify";
import UserModel, { User } from "../schema/UserSchema";

@ObjectType()
export class PostResolver {
  @Query(() => Post)
  async getPostByslug(@Arg("slug", () => String) slug: string): Promise<Post> {
    const post = await PostModel.findOne({ slug }).populate(
      "author",
      "username _id, email"
    );
    console.log(post);
    if (!post) {
      throw new Error("Post Not found!");
    }
    return post;
  }
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
      author: req.session.userId,
      slug,
    });
    if (!post) {
      return false;
    }
    return true;
  }
}
