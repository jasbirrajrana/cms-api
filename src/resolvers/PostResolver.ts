import { isAdmin, isAuth } from "../middleware/isAuth";
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
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { bucketName, storage } from "../utils/storage";
import { client } from "../utils/redisConfig";
import { red } from "chalk";
import { post } from "@typegoose/typegoose";
import { getPostsUtil } from "../utils/getPosts";
import { json } from "body-parser";

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
  async getAllPosts(@Ctx() { redis }: ctx) {
    const posts = await PostModel.find({}).populate(
      "author",
      "username _id email"
    );
    if (!posts) {
      return [];
    }
    return posts;
  }
  @Query(() => Post)
  async getPostById(@Arg("post_id", () => String) post_id: string) {
    const post = await PostModel.findById(post_id).populate(
      "author",
      "username _id email"
    );
    if (!post) {
      throw new Error("No post found");
    }
    return post;
  }

  @Mutation(() => Number)
  async Like(@Arg("postId", () => String) postId: string) {
    const post = await PostModel.findById(postId);
    if (!post) {
      return;
    }

    if (post) {
      post.likes = post.likes + 1;
      await post.save();
    }
    return post.likes;
  }
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async createPost(
    @Arg("title", () => String) title: string,
    @Arg("body", () => String) body: string,
    @Arg("subtitle", { nullable: true }) subtitle: string,
    @Arg("description", { nullable: true }) description: string,
    // @Arg("featureImage", () => GraphQLUpload)
    @Arg("featureImage", () => String) featureImage: string,
    @Arg("tag", () => String)
    tag: string,
    // { createReadStream, filename }: FileUpload,
    @Ctx() { req }: ctx
  ): Promise<boolean> {
    const slug = slugify(title);

    const post = await PostModel.create({
      title,
      body,
      author: req.session.userId,
      slug,
      description,
      featureImage,
      tag,
      subtitle,
    });

    await post.save();
    // let featureImageUrl = "";
    // //checking that whom is creating a new post *only admin is allowed to do this*
    // await new Promise(async (resolve, reject) =>
    //   createReadStream()
    //     .pipe(
    //       bucketName.file(filename).createWriteStream({
    //         resumable: false,
    //         gzip: true,
    //       })
    //     )
    //     .on("error", reject)
    //     .on("finish", () =>
    //       bucketName
    //         .file(filename)
    //         .makePublic()
    //         .then(async (e) => {
    //           // console.log(
    //           //   `https://storage.googleapis.com/jasbirrajranablog/${e[0].object}`
    //           // );
    //           featureImageUrl = `https://storage.googleapis.com/jasbirrajranablog/${e[0].object}`;
    //           console.log(featureImageUrl);
    //           const slug = slugify(title);
    //           const post = await PostModel.create({
    //             title,
    //             body,
    //             author: req.session.userId,
    //             slug,
    //             description,
    //             featureImage: featureImageUrl,
    //             tag,
    //             subtitle,
    //           });
    //           await post.save();
    //         })
    // )
    // );
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async updatePost(
    @Arg("id", () => String) id: string,
    @Arg("title", { nullable: true }) title: string,
    @Arg("body", { nullable: true }) body: string,
    @Arg("tag", { nullable: true }) tag: string,
    @Arg("subtitle", { nullable: true }) subtitle: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("featureImage", { nullable: true }) featureImage: string
  ) {
    const post = await PostModel.findById(id).populate(
      "author",
      "username _id, email"
    );
    if (!post) {
      throw new Error("Post not found!");
    }
    if (post) {
      post.title = title || post.title;
      post.tag = tag || post.tag;
      post.subtitle = subtitle || post.subtitle;
      post.slug = title ? slugify(title) : post.slug;
      post.body = body || post.body;
      if (featureImage === "") {
        post.featureImage = post.featureImage;
      }
      post.featureImage = featureImage || post.featureImage;
      post.description = description || post.description;
    }
    await post.save();
    console.log("updated!");
    return true;
  }
}
