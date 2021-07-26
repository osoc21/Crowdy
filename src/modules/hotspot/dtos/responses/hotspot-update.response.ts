import { Field, ObjectType } from '@nestjs/graphql';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';

@ObjectType()
export class UpdateHotspotResponse {
  @Field()
  hotspot: HotSpot;

  @Field()
  message: string;
}
