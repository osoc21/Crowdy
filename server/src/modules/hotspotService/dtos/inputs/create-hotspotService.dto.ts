import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateHotSpotServiceDTO {
  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot must contain at least two letters.`,
  })
  @MaxLength(55, {
    message: `The Hotspot is too long.`,
  })
  service_name: string;
}
