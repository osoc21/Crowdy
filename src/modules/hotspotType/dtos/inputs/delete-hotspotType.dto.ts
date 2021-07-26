import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { version } from 'uuid';

@InputType()
export class DeleteHotspotTypeDTO {
  @Field()
  @IsString({ message: `Invalid String Format.` })
  @IsUUID(4, { message: `Invalid UUID version!` })
  type_id: string;
}
