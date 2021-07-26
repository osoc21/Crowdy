import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, IsUUID, MaxLength } from 'class-validator';
import {
  BaseNameWithValidation,
  BasePasswordWithValidation,
} from 'src/shared/validation/custom/classes';
import { EmailAlreadyExists } from 'src/shared/validation/decorators/user';

@InputType()
export class CreateUserDTO extends BaseNameWithValidation(
  BasePasswordWithValidation(class {}),
) {
  /* Email */
  @Field()
  @IsEmail({}, { message: `"$value" Is in an invalid format.` })
  @EmailAlreadyExists({
    message: `"$value" is already taken by another user. If, it is yours, proceed to Login.`,
  })
  @MaxLength(100, { message: `E-mail adress too long.` })
  email: string;
}
