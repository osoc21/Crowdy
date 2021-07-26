import { InputType, Field } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';
import { BaseEmailWithValidation } from 'src/shared/validation/custom/classes';

@InputType()
export class EmployeeCredentialsDto extends BaseEmailWithValidation(class {}) {
  @Field()
  @IsString({
    message: `"$value" n'est pas le format du Mot de passe pris en charge.`,
  })
  @MaxLength(33, { message: `Le mot de passe Invalide.` })
  password: string;
}
