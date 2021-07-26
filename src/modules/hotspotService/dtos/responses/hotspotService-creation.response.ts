import { Field, ObjectType } from '@nestjs/graphql';
import { HotspotService } from 'src/entities/hotspotService/hotspotService.entity';

@ObjectType()
export class CreateHospotServiceResponse {
  @Field()
  hotspotService: HotspotService;

  @Field()
  message: string;
}
