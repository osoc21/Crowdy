import { Field, ObjectType } from '@nestjs/graphql';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';

@ObjectType()
export class CreateHospotTypeResponse {
  @Field()
  type: HotspotType;

  @Field()
  message: string;
}
