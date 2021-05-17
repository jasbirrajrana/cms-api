import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "./UserSchema";
import { ObjectId } from "mongodb";
@ObjectType()
export class Post {
  @Field()
  _id: string;

  @Field()
  @Prop({ type: () => String, ref: User })
  user: string;

  @Field()
  @Prop({ type: () => String })
  slug: string;

  @Field()
  @Prop({ type: () => String, required: true })
  title: string;

  @Field()
  @Prop({ type: () => String, required: true })
  body: string;

  @Field()
  @Prop({ default: Date.now() })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now() })
  updatedAt: Date;
}

const PostModel = getModelForClass(Post);
export default PostModel;
