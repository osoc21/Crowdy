import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/entities/role/role.entity';

@ObjectType()
export class AllRolesQueryResponse {
  @Field(() => [Role])
  roles: Role[];

  @Field(() => Int)
  totalCount: number;
}
