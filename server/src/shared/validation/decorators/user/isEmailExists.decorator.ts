import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await getRepository(User)
      .createQueryBuilder('users')
      .where('users.email = :email', { email })
      .getOne();
    if (user) return false;
    return true;
  }
}

export function EmailAlreadyExists(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}
