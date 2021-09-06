import { isAdmin, isAuth } from "../middleware/isAuth";
import { Arg, Ctx, Mutation, ObjectType, UseMiddleware } from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { ctx } from "../Types/Mycontext";
import cloudinary from "cloudinary";
@ObjectType()
export class UploadResolver {
  @Mutation(() => String)
  @UseMiddleware(isAuth)
  @UseMiddleware(isAdmin)
  async upload(
    @Arg("file", () => GraphQLUpload)
    { createReadStream, filename }: FileUpload,

    @Ctx() { req }: ctx
  ) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    try {
      const result = await new Promise((resolve, reject) => {
        createReadStream().pipe(
          cloudinary.v2.uploader.upload_stream((error, result) => {
            if (error) {
              reject(error);
            }

            resolve(result);
          })
        );
      });
      //@ts-ignore
      const newPhoto = { filename, path: result.secure_url };
      return newPhoto.path;
    } catch (error) {
      console.log(error);
    }
  }
}
