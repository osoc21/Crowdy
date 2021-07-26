import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities/user/user.entity';

@ObjectType()
export class CreateUserResponse {
  @Field({ nullable: true })
  user?: User;

  @Field()
  message: string;

  @Field()
  type: string;
}
