import { Field, ObjectType } from '@nestjs/graphql';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';

@ObjectType()
export class UpdateHotspoTypeResponse {
  @Field()
  type: HotspotType;

  @Field()
  message: string;
}
