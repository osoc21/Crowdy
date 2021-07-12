import { UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'src/entities/role/role.entity';
import { GqlAuthGuardAdmin } from 'src/modules/admin-auth/auth-strategy/guards/auth-gql.guard';
import { RolesGuard } from 'src/modules/admin-auth/auth-strategy/guards/roles-user.guard';
import { CreateRoleDTO } from '../dtos/inputs/create-role.dto';
import { DeleteRoleDTO } from '../dtos/inputs/delete-role.dto';
import { UpdateRoleDTO } from '../dtos/inputs/update-role.dto';
import { DeleteRoleResponse } from '../dtos/responses/delete-role.response';
import { AllRolesQueryResponse } from '../dtos/responses/queries/allRoles.response';
import { CreateRoleResponse } from '../dtos/responses/role-creation.response';
import { UpdateRoleResponse } from '../dtos/responses/role-update.response';
import { RoleService } from '../services/role.service';

@Resolver()
// @UseGuards(new GqlAuthGuardAdmin())
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  // /* Read all roles */
  // @UseGuards(new GqlAuthGuardAdmin())
  // @Query(() => AllRolesQueryResponse)
  // async AllRoles(
  //   @Args('page', { type: () => Int }) page: number,
  //   @Args('perPage', { type: () => Int }) perPage: number,
  //   @Args('q', { type: () => String, nullable: true }) q?: string,
  //   @Args('deleted', { type: () => Boolean, nullable: true }) deleted?: boolean,
  // ): Promise<AllRolesQueryResponse> {
  //   return await this.roleService.getAllRoles(page, perPage, q, deleted);
  // }

  // /* Read all roles for selection*/
  // // @UseGuards(new GqlAuthGuardAdmin())
  // @Query(() => [Role])
  // async AllActiveRoles(): Promise<Role[]> {
  //   return await this.roleService.AllActiveRoles();
  // }

  // // ** Get Selected Role
  // // @UseGuards(new GqlAuthGuardAdmin())
  // @Query(() => Role)
  // async SelectedRole(@Args('id', { type: () => String }) id: string) {
  //   return await this.roleService.getSelectedRole(id);
  // }

  // /* Create role Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  // @Mutation(() => CreateRoleResponse)
  // async RoleCreation(
  //   @Args('data') createRoleDTO: CreateRoleDTO,
  // ): Promise<CreateRoleResponse> {
  //   const role = await this.roleService.createRole(createRoleDTO);
  //   return {
  //     role,
  //     message: 'Le role été enregistré avec succès',
  //   };
  // }

  // /* Update role Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  // @Mutation(() => UpdateRoleResponse)
  // async RoleUpdate(
  //   @Args('data') updateRoleDTO: UpdateRoleDTO,
  // ): Promise<UpdateRoleResponse> {
  //   const role = await this.roleService.updateRole(updateRoleDTO);
  //   return {
  //     role,
  //     message: 'Le role a été modifié avec succès',
  //   };
  // }

  // /* Archive role Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  // @Mutation(() => DeleteRoleResponse)
  // async RoleArchive(
  //   @Args('data') deleteRoleDTO: DeleteRoleDTO,
  // ): Promise<DeleteRoleResponse> {
  //   await this.roleService.archiveRole(deleteRoleDTO);
  //   return {
  //     message: 'Le role a été archivé avec succès',
  //   };
  // }

  // /* Restore role Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  // @Mutation(() => DeleteRoleResponse)
  // async RoleRestore(
  //   @Args('data') deleteRoleDTO: DeleteRoleDTO,
  // ): Promise<DeleteRoleResponse> {
  //   await this.roleService.restoreRole(deleteRoleDTO);
  //   return {
  //     message: 'Le role a été restauré avec succès',
  //   };
  // }

  // /* Delete role Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  // @Mutation(() => DeleteRoleResponse)
  // async RoleDelete(
  //   @Args('data') deleteRoleDTO: DeleteRoleDTO,
  // ): Promise<DeleteRoleResponse> {
  //   await this.roleService.deleteRole(deleteRoleDTO);
  //   return {
  //     message: 'Le role a été supprimé avec succès',
  //   };
  // }
}
