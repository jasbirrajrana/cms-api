import { isAuth } from "../middleware/isAuth";
import {
  Arg,
  Ctx,
  Mutation,
  ObjectType,
  Query,
  UseMiddleware,
} from "type-graphql";
import PostModel, { Post } from "../schema/PostSchema";
import { ctx } from "../Types/Mycontext";
import slugify from "slugify";

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
  @Query(() => [Post])
  async getAllPosts() {
    const posts = await PostModel.find({}).populate(
      "author",
      "username _id email"
    );
    console.log(posts);

    return posts;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("title", () => String) title: string,
    @Arg("body", () => String) body: string,
    @Arg("subtitle", { nullable: true }) subtitle: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("tag",()=>String) tag:string,

    @Ctx() { req }: ctx
  ): Promise<boolean> {
    const slug = slugify(title);
    const post = await PostModel.create({
      title,
      body,
      author: req.session.userId,
      slug,
      subtitle,
      description,
     tag
    });
    await post.save()
    if (!post) {
      return false;
    }
    return true;
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg("slug", () => String) slug: string,
    @Arg("title", { nullable: true }) title: string,
    @Arg("body", { nullable: true }) body: string,
    @Arg("subtitle", { nullable: true }) subtitle: string,
    @Arg("description", { nullable: true }) description: string
  ) {
    const post = await PostModel.findOne({ slug }).populate(
      "author",
      "username _id, email"
    );
    if (!post) {
      throw new Error("Post not found!");
    }
    if (post) {
      post.title = title || post.title;
      post.subtitle = subtitle || post.subtitle;
      post.slug = title ? slugify(title) : post.slug;
      post.body = body || post.body;
      post.description = description || post.description;
    }
    const updatedPost = await post.save();
    console.log("updated!");
    return updatedPost;
  }
}
