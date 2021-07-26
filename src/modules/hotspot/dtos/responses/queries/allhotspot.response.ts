import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';

@ObjectType()
export class AllHotspotQueryResponse {
  @Field(() => [HotSpot])
  hotspots: HotSpot[];

  @Field(() => Int)
  totalCount: number;
}
