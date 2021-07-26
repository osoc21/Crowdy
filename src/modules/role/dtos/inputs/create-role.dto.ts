import { InputType, Field } from '@nestjs/graphql';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateRoleDTO {
  @Field()
  @IsString({ message: `Format non pris en charge.` })
  @MinLength(2, {
    message: `Le role doit avoir au moins 2 caractères.`,
  })
  @MaxLength(55, {
    message: `Le role  trop long.`,
  })
  role_name: string;
}
