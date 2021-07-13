import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateHotSpotDTO {
  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot must contain at least two letters.`,
  })
  @MaxLength(55, {
    message: `The Hotspot is too long.`,
  })
  hotspot_name: string;
}
