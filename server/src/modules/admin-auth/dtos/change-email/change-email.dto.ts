import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { BaseEmailWithValidation } from 'src/shared/validation/custom/classes';

@InputType()
export class ChangeEmailDto extends BaseEmailWithValidation(class {}) {
  @Field(() => String)
  @IsNotEmpty()
  token: any;
}
