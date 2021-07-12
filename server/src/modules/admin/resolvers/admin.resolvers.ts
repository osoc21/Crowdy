import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentAdmin } from 'src/modules/admin-auth/auth-strategy/auth-decorators/current.admin.decorator';
import { GqlAuthGuardAdmin } from 'src/modules/admin-auth/auth-strategy/guards/auth-gql.guard';
import { Admin } from '../../../entities/admin/admin.entity';
import { AccountDeletionResponse } from '../dtos/responses/account-deletion.response';
import { UpdateAdminDto } from '../dtos/update-user.dto';
import { AdminService } from '../services/admin.service';

@Resolver()
// @UseGuards(new GqlAuthGuard(), new RolesGuard(new Reflector()))
export class AdminResolver {
  constructor(private userService: AdminService) {}

  /* Get Admin Infos */
  // @Roles(UserRole.USER)
  @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => Admin)
  async AdminProfile(
    @CurrentAdmin()
    user: Admin,
  ) {
    return user;
  }

  /* Update Admin Info */
  @Mutation(() => Admin)
  async AdminUpdateInfo(
    @CurrentAdmin()
    user: Admin,
    @Args('data') updateUserDto: UpdateAdminDto,
  ) {
    const id = user.id;
    return this.userService.updateUser(updateUserDto, id);
  }

  /* Delete admin account */
  @Mutation(() => AccountDeletionResponse)
  async AdminDeleteAccount(
    @CurrentAdmin()
    user: Admin,
  ) {
    const id = user.id;
    await this.userService.deleteUser(id);
    return { message: `Votre compte a été supprimé avec succès` };
  }
}
