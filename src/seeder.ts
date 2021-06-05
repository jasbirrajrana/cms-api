import dotenv from "dotenv";
import { Connect } from "./config/db";
import chalk from "chalk";
import PostModel from "./schema/PostSchema";
import UserModel from "./schema/UserSchema";
import posts from "./data/posts";
dotenv.config();
const importData = async () => {
  try {
    Connect();
    await PostModel.deleteMany();
    const adminUser = await UserModel.findOne({
      email: process.env.ADMIN_EMAIL!,
    });
    const samplePosts = posts.map((x) => {
      return { ...x, author: adminUser?._id };
    });
    console.log(samplePosts);

    await PostModel.insertMany(samplePosts);
    console.log(chalk.bgCyan.inverse("Data imported!"));
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};

importData();
