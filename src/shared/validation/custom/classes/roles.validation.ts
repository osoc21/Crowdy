import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, ValidateNested } from 'class-validator';
import { UserRole } from 'src/modules/admin-auth/enums/admin-roles.enum';
import { Constructor } from '../../../../shared/library/shared.constructor';

export function BaseRolesWithValidation<TBase extends Constructor>(
  Base: TBase,
) {
  @InputType()
  abstract class AbstractBaseRolesValidation extends Base {
    @Field(() => [UserRole])
    @IsEnum(UserRole, { each: true })
    @ValidateNested({
      each: true,
      message: 'Nous détectons un problème, réessayez plus tard!',
    })
    roles: UserRole[];
  }
  return AbstractBaseRolesValidation;
}
