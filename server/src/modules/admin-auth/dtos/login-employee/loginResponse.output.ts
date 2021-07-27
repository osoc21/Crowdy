import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class LoginResponseEmployee {
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
  @Field(() => [GraphQLJSON])
  ability: object[];
  @Field()
  accessToken: string;
}
