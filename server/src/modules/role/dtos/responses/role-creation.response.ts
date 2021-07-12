import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/entities/role/role.entity';

@ObjectType()
export class CreateRoleResponse {
  @Field()
  role: Role;

  @Field()
  message: string;
}
