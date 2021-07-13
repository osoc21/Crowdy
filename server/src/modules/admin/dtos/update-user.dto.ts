import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { BaseNameWithValidation } from 'src/shared/validation/custom/classes';
import { UsernameAlreadyExists } from 'src/shared/validation/decorators/admin';

@InputType()
export class UpdateAdminDto extends BaseNameWithValidation(class {}) {
  @Field()
  @IsString({ message: `Username invalid format.` })
  @MinLength(6, {
    message: `Le Nom d'utilisateur doit avoir au moins 12 caractères.`,
  })
  @MaxLength(16, {
    message: `Le Nom d'utilisateur trop long.`,
  })
  @Matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,16}$/, {
    message: `Nom d'utilisateur non valide. Essayez-en un autre.`,
  })
  @UsernameAlreadyExists({
    message: `"$value" est déjà pris. Essayez-en un autre.`,
  })
  username: string;
}
