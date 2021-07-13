import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';

@ObjectType()
export class AllHotspotTypeQueryResponse {
  @Field(() => [HotspotType])
  types: HotspotType[];

  @Field(() => Int)
  totalCount: number;
}
