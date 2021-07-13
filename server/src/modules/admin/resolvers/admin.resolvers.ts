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
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => Admin)
  async AdminUpdateInfo(
    @CurrentAdmin()
    admin: Admin,
    @Args('data') updateUserDto: UpdateAdminDto,
  ) {
    const id = admin.id;
    return this.userService.updateAdmin(updateUserDto, id);
  }

  /* Delete admin account */
  @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => AccountDeletionResponse)
  async AdminDeleteAccount(
    @CurrentAdmin()
    user: Admin,
  ) {
    const id = user.id;
    await this.userService.deleteAdmin(id);
    return { message: `Your account has been successfully deleted!` };
  }
}
