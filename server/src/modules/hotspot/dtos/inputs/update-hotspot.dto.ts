import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { version } from 'uuid';

@InputType()
export class UpdateHotspotDTO {
  @Field()
  @IsString({ message: `String format not supported.` })
  @IsUUID(4, { message: `Not valid UUID version!` })
  hotspot_id: string;

  @Field()
  @IsString({ message: `String format not supported.` })
  @MinLength(2, {
    message: `Hotspot Type name must have at least 2 characters.`,
  })
  @MaxLength(55, {
    message: `Hotspot Type name too long.`,
  })
  hotspot_name: string;
}
