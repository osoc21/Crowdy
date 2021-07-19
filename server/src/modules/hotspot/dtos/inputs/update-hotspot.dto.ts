import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import GraphQLJSON from 'graphql-type-json';
import { version } from 'uuid';

@InputType()
export class UpdateHotspotDTO {
  // hotspot Id
  @Field()
  @IsString({ message: `String format not supported.` })
  @IsUUID(4, { message: `Not valid UUID version!` })
  hotspot_id: string;

  // Hotspot name
  @Field()
  @IsString({ message: `String format not supported.` })
  // @MinLength(2, {
  //   message: `Hotspot Type name must have at least 2 characters.`,
  // })
  @MaxLength(55, {
    message: `Hotspot Type name too long.`,
  })
  hotspot_name: string;

  // Hotspot coordinates
  @Field(() => [GraphQLJSON], { nullable: true })
  @IsArray({ message: `Coordinates format not allowed.` })
  coordinates: [JSON];

  // Hotspot city
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  // @MinLength(2, {
  //   message: `The city of the hotspot must contain at least two letters.`,
  // })
  @MaxLength(25, {
    message: `The Hotspot city is too long.`,
  })
  city: string;

  // Hotspot district
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  // @MinLength(2, {
  //   message: `The Hotspot district must contain at least two letters.`,
  // })
  @MaxLength(25, {
    message: `The Hotspot district is too long.`,
  })
  district: string;

  // hotspot street
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  // @MinLength(2, {
  //   message: `The Hotspot street must contain at least two letters.`,
  // })
  @MaxLength(25, {
    message: `The Hotspot street is too long.`,
  })
  street: string;

  // hotspot Number
  @Field({ nullable: true })
  @IsString({ message: `Format Invalid.` })
  // @MinLength(2, {
  //   message: `The Hotspot number must contain at least two letters.`,
  // })
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
