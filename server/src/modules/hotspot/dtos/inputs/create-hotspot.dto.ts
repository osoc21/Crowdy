import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { InputType } from '@nestjs/graphql/dist/decorators/input-type.decorator';
import {
  IsArray,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateHotSpotDTO {
  // Hotspot Name
  @Field()
  @IsString({ message: `Format Invalid.` })
  @MinLength(2, {
    message: `The Hotspot name must contain at least two letters.`,
  })
  @MaxLength(55, {
    message: `The Hotspot name is too long.`,
  })
  hotspot_name: string;

  // Hotspot coordinates
  @Field(() => [GraphQLJSON], { nullable: true })
  @IsArray({ message: `Coordinates format not allowed.` })
  coordinates: [JSON];

  // Hotspot city
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  @MaxLength(25, {
    message: `The Hotspot city is too long.`,
  })
  city: string;

  // Hotspot district
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  @MaxLength(25, {
    message: `The Hotspot district is too long.`,
  })
  district: string;

  // Hotspot street
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  @MaxLength(25, {
    message: `The Hotspot street is too long.`,
  })
  street: string;

  // hotspot number
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  @MaxLength(55, {
    message: `The Hotspot number is too long.`,
  })
  number: string;

  // ** Types
  @Field(() => [String], { nullable: true })
  @IsArray({ message: `Unsupported array format.` })
  types: string[];

  // ** Types
  @Field(() => [String], { nullable: true })
  @IsArray({ message: `Unsupported array format.` })
  services: string[];
}
