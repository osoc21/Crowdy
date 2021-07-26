import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageResponseUser {
  @Field({ nullable: true })
  message: string;
  @Field()
  type: string;
}
