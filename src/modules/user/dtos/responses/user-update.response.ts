import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities/user/user.entity';

@ObjectType()
export class UpdateUserResponse {
  @Field()
  user: User;

  @Field()
  message: string;

  @Field()
  type: string;
}
