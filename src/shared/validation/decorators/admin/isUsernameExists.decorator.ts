import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Admin } from '../../../../entities/admin/admin.entity';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsAdminUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(username: string) {
    const admin = await getRepository(Admin)
      .createQueryBuilder('admins')
      .where('admins.username = :username', { username })
      .getOne();
    if (admin) return false;
    return true;
  }
}

export function UsernameAlreadyExists(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAdminUsernameAlreadyExistConstraint,
    });
  };
}
