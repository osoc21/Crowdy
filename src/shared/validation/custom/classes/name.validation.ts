import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Constructor } from '../../../../shared/library/shared.constructor';

export function BaseNameWithValidation<TBase extends Constructor>(Base: TBase) {
  @InputType()
  abstract class AbstractBaseNameValidation extends Base {
    @Field()
    @IsNotEmpty({ message: `The name cannot be empty.` })
    @IsString({
      message: `"$value" Invalid name format..`,
    })
    @MinLength(2, {
      message: `FirstName too short.`,
    })
    @MaxLength(25, { message: `FirstName too long.` })
    @Matches(/^[A-Za-zzéàèçùû]+$/, {
      message: `Only letters are authorized (a-zA-Z). No spaces or special characters.`,
    })
    firstname: string;

    @Field()
    @IsNotEmpty({ message: `LastName should not be empty.` })
    @IsString({
      message: `"$value" Invalid format for LastName.`,
    })
    @MinLength(2, {
      message: `LastName must contain at least too characters.`,
    })
    @MaxLength(25, { message: `LastName too long.` })
    @Matches(/^[A-Za-zzéàèçùû ]+$/, {
      message: `Only letters and spaces are allowed (a-zA-Z ). No special characters allowed.`,
    })
    lastname: string;
  }
  return AbstractBaseNameValidation;
}
