import { Field, Int, ObjectType } from '@nestjs/graphql';
import { HotspotService } from 'src/entities/hotspotService/hotspotService.entity';

@ObjectType()
export class AllHotspotServiceQueryResponse {
  @Field(() => [HotspotService])
  hotspots: HotspotService[];

  @Field(() => Int)
  totalCount: number;
}
