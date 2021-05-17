import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  _id: string;

  @Field()
  @Prop({ type: () => String, required: true })
  username: string;

  @Field()
  @Prop({ type: () => String, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: () => Boolean, default: false })
  verified: boolean;

  @Field()
  @Prop({ default: Date.now() })
  createdAt: Date;

  @Field()
  @Prop({ default: Date.now() })
  updatedAt: Date;
}

const UserModel = getModelForClass(User);
export default UserModel;
