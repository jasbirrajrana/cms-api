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

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
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
