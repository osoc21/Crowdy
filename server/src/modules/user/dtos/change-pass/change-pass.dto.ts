import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { BasePasswordWithValidation } from 'src/shared/validation/custom/classes';

@InputType()
export class ChangePasswordUserDto extends BasePasswordWithValidation(
  class {},
) {
  @Field()
  @IsString({
    message: `"$value" n'est pas le format du Mot de passe pris en charge.`,
  })
  @MinLength(8, {
    message: `Le mot de passe doit avoir au moins 8 caractères.`,
  })
  @MaxLength(32, { message: `Le mot de passe est trop grand.` })
  @Matches(
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message: `Le mot de passe doit contenir au moins:
    * Une lettre majuscule.
    * Une lettre minuscule.
    * Un chiffre ou un caractère spécial.
    `,
    },
  )
  newPassword: string;

  @Field()
  @IsString({
    message: `"$value" n'est pas le format du Mot de passe pris en charge.`,
  })
  @MinLength(8, {
    message: `Le mot de passe doit avoir au moins 8 caractères.`,
  })
  @MaxLength(32, { message: `Le mot de passe est trop grand.` })
  @Matches(
    /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message: `Le mot de passe doit contenir au moins:
    * Une lettre majuscule.
    * Une lettre minuscule.
    * Un chiffre ou un caractère spécial.
    `,
    },
  )
  repeatedPassword: string;
}
