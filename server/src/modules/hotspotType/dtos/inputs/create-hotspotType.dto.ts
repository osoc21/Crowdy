import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateHotspotTypeDTO {
  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot type name must contain at least two letters.`,
  })
  @MaxLength(55, {
    message: `The Hotspot type name name is too long.`,
  })
  type_name: string;
}
