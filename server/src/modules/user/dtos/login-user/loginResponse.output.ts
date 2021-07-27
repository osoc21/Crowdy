import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class LoginResponseUser {
  @Field()
  id: string;
  @Field()
  username: string;
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
  createdAt: string;
  @Field()
  accessToken: string;
}
