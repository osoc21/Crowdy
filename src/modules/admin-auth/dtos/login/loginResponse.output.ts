import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class LoginResponse {
  @Field()
  id: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field()
  fullname: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  avatar: string;
  @Field()
  role: string;
  @Field()
  accessToken: string;
}
