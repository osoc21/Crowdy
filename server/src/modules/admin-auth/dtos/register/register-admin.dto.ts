import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';
import {
  BaseNameWithValidation,
  BasePasswordWithValidation,
} from 'src/shared/validation/custom/classes';
import { EmailAlreadyExists } from 'src/shared/validation/decorators/admin';

@InputType()
export class AdminRegisterDto extends BaseNameWithValidation(
  BasePasswordWithValidation(class {}),
) {
  @Field()
  @IsEmail(
    {},
    { message: `"$value" n'est pas le format d'e-mail pris en charge.` },
  )
  @EmailAlreadyExists({
    message: `"$value" est est déjà pris. Si c'est vôtre adresse E-mail, passez à la connexion.`,
  })
  @MaxLength(100, { message: `L'adresse Email est trop grand.` })
  email: string;
}
