import { Field, ObjectType } from '@nestjs/graphql';
import { HotspotService } from 'src/entities/hotspotService/hotspotService.entity';

@ObjectType()
export class UpdateHotspotServiceResponse {
  @Field()
  hotspotService: HotspotService;

  @Field()
  message: string;
}
