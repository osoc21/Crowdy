import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteHotspotServiceResponse {
  @Field()
  message: string;
}
