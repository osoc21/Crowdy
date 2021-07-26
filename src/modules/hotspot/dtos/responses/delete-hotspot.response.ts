import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteHotspotResponse {
  @Field()
  message: string;
}
