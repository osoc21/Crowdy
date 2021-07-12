import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterAdminResponse {
  @Field()
  message: string;
}
