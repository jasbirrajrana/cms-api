import { ObjectType, Query } from "type-graphql";

@ObjectType()
export class HelloResolver {
  @Query(() => String, { nullable: true })
  hello() {
    return "Hello from type-graphql";
  }
}
