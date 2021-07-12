import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MessageResponse {
  @Field({ nullable: true })
  message: string;
  @Field()
  type: string;
}
