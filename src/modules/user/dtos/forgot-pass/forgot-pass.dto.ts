import { InputType, Field } from '@nestjs/graphql';
import { BaseEmailWithValidation } from 'src/shared/validation/custom/classes';

@InputType()
export class ForgotPassUserDto extends BaseEmailWithValidation(class {}) {}
