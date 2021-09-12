import PostModel from "../schema/PostSchema";

export const getPostsUtil = async () => {
  const posts = await PostModel.find({}).populate(
    "author",
    "username _id email"
  );
  return posts;
};
