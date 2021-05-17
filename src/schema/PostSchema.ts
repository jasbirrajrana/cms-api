import { getModelForClass, Prop, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "./UserSchema";
@ObjectType()
export class Post {
  @Field()
  _id: string;

  @Field((_type) => User)
  @Prop({ ref: User, required: true })
  author: string;

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
