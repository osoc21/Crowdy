import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteVoteResponse {
  @Field()
  message: string;
}
