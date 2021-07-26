import { InputType, Field } from '@nestjs/graphql';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  BaseNameWithValidation,
  BasePasswordWithValidation,
} from 'src/shared/validation/custom/classes';

@InputType()
export class UpdateUserDTO extends BaseNameWithValidation(class {}) {
  /* Username */
  // @Field()
  // @IsString({ message: `Format non pris en charge.` })
  // @MinLength(8, {
  //   message: `Le nom d'utilisateurs doit avoir au moins 8 caractères.`,
  // })
  // @MaxLength(55, {
  //   message: `Le nom d'utilisateur est très long.`,
  // })
  // @Matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
  //   message: `Format du nom d'utilisateur invalide!
  //     Pas d'espaces, caractères spéciales autorisés (_,.), celles-ci nepeuvent commencer ni être à la fin.`,
  // })
  // // @IsUserNameAlreadyTaken({
  // //   message: `Le nom d'utilisateur choisit est non disponible. Essayez en un autre!`,
  // // })
  // username: string;

  /* Space for birthdate */
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  birthdate: string;
}
