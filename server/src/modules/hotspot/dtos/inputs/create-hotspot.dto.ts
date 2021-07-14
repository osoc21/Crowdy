import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateHotSpotDTO {
  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot name must contain at least two letters.`,
  })
  @MaxLength(55, {
    message: `The Hotspot name is too long.`,
  })
  hotspot_name: string;

  @Field(() => [GraphQLJSON])
  @IsArray({ message: `Coordinates format not allowed.` })
  hotspot_coordinates: [JSON];

  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The city of the hotspot must contain at least two letters.`,
  })
  @MaxLength(25, {
    message: `The Hotspot city is too long.`,
  })
  city: string;

  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot district must contain at least two letters.`,
  })
  @MaxLength(25, {
    message: `The Hotspot district is too long.`,
  })
  district: string;

  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot street must contain at least two letters.`,
  })
  @MaxLength(25, {
    message: `The Hotspot street is too long.`,
  })
  street: string;

  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot number must contain at least two letters.`,
  })
  @MaxLength(55, {
    message: `The Hotspot number is too long.`,
  })
  number: string;
}
