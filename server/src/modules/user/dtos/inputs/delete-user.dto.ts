import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { version } from 'uuid';

@InputType()
export class DeleteUserDTO {
  @Field()
  @IsString({ message: `Format non pris en charge.` })
  @IsUUID(4, { message: `La version ne correspond pas!` })
  employee_id: string;
}
