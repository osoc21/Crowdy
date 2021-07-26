import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { version } from 'uuid';

@InputType()
export class UpdateRoleDTO {
  @Field()
  @IsString({ message: `Format non pris en charge.` })
  @IsUUID(4, { message: `La version ne correspond pas!` })
  role_id: string;

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
