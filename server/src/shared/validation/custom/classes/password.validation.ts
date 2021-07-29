import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { Constructor } from 'src/shared/library/shared.constructor';

export function BasePasswordWithValidation<TBase extends Constructor>(
  Base: TBase,
) {
  @InputType()
  abstract class AbstractBasePasswordValidation extends Base {
    @Field()
    @IsString({
      message: `"$value" is in an invalid format.`,
    })
    @MinLength(8, {
      message: `Password must contain at least 8 characters.`,
    })
    @MaxLength(32, { message: `Password too long.` })
    // @Matches(
    //   /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //   {
    //     message: `Password must contain at least :
    // * An UpperCase.
    // * Une lettre minuscule.
    // * A number or a special character.
    // `,
    //   },
    // )
    password: string;
  }
  return AbstractBasePasswordValidation;
}
