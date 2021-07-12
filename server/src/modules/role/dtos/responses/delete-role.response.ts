import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from 'src/entities/role/role.entity';

@ObjectType()
export class DeleteRoleResponse {
  @Field()
  message: string;
}
