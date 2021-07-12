import { Field, ObjectType } from '@nestjs/graphql';
import { Admin } from 'src/entities/admin/admin.entity';

@ObjectType()
export class RegisterResponse {
  @Field()
  admin: Admin;
  @Field()
  message: string;
}
