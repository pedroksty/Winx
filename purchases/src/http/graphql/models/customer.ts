import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { Purchase } from "./purchase";

@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer {
  @Field(() => ID)
  id: string

  @Field(() => ID)
  authUserId: string

  @Field(() => [Purchase])
  purchases: Purchase[]


}