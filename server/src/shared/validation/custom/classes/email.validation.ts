import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsEmail } from 'class-validator';
import { Constructor } from '../../../../shared/library/shared.constructor';

export function BaseEmailWithValidation<TBase extends Constructor>(
  Base: TBase,
) {
  @InputType()
  abstract class AbstractBaseEmailValidation extends Base {
    @Field()
    @IsEmail({}, { message: `"$value" Is an invalid format.` })
    @MaxLength(100, { message: `Email adress too long.` })
    email: string;
  }
  return AbstractBaseEmailValidation;
}
