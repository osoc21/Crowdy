import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';

@ObjectType()
export class allActiveHotspotResponse {
  @Field(() => [HotSpot])
  hotspots: HotSpot[];

  @Field(() => Int)
  totalVoteCount: number;

  @Field(() => Int)
  crowdLevel: number;
}
