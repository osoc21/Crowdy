import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccountDeletionResponse {
  @Field()
  message: string;
}
