import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteHotspotTypeResponse {
  @Field()
  message: string;
}
