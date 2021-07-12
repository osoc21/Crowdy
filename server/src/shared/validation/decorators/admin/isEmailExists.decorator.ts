import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Admin } from '../../../../entities/admin/admin.entity';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsAdminAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string) {
    const admin = await getRepository(Admin)
      .createQueryBuilder('admins')
      .where('admins.email = :email', { email })
      .getOne();
    if (admin) return false;
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
      validator: IsAdminAlreadyExistConstraint,
    });
  };
}
