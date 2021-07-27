import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';

@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyTakenConstraint
  implements ValidatorConstraintInterface {
  async validate(username: string) {
    const user = await getRepository(User)
      .createQueryBuilder('users')
      .where('users.username = :username', { username })
      .getOne();
    if (user) return false;
    return true;
  }
}

export function IsUserNameAlreadyTaken(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyTakenConstraint,
    });
  };
}
