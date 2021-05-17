import mongoose from "mongoose";
import chalk from "chalk";
const Connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
    console.log(
      chalk.hex("#f7fd04").bold(`MongoDb connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(chalk.hex("#ff6347").bold(`Error:${error.message}`));
    process.exit(1);
  }
};

export { Connect };
