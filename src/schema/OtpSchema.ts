import { getModelForClass, Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { User } from "./UserSchema";

@ObjectType()
export class Otp {
  @Field()
  _id: string;

  @Field()
  @Prop({ type: () => String })
  email: string;

  @Field()
  @Prop({ type: () => Number })
  otp: number;

  @Field()
  @Prop({ type: () => String })
  username: string;

  @Prop()
  password: string;
}

const OtpModel = getModelForClass(Otp);
export default OtpModel;
