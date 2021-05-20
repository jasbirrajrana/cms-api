import { getModelForClass, Prop } from "@typegoose/typegoose";
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
  @Prop({ type: () => String, default: "" })
  subtitle: string;

  @Field()
  @Prop({ type: () => String, required: true })
  body: string;

  @Field()
  @Prop({
    type: () => String,
    default:
      "https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg",
  })
  featureImage: string;

  @Field()
  @Prop({ default: Date.now() })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now() })
  updatedAt: Date;
}

const PostModel = getModelForClass(Post);
export default PostModel;
