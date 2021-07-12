import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role/role.entity';
import { CreateRoleDTO } from '../dtos/inputs/create-role.dto';
import { DeleteRoleDTO } from '../dtos/inputs/delete-role.dto';
import { UpdateRoleDTO } from '../dtos/inputs/update-role.dto';
import { AllRolesQueryResponse } from '../dtos/responses/queries/allRoles.response';
import { RoleRepository } from '../repository/role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,
  ) {}

  /* Get all Roles */
  async getAllRoles(
    page: number,
    perPage: number,
    q?: string,
    deleted?: boolean,
  ): Promise<AllRolesQueryResponse> {
    let roleQB = await this.roleRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.employees', 'employee');
    let countResults = await roleQB.getCount();

    if (deleted == true) {
      roleQB = roleQB.andWhere('e.role_deleted = true', { deleted });
      countResults = await roleQB.getCount();
    } else if (deleted == false) {
      roleQB = roleQB.andWhere('e.role_deleted = false', { deleted });
      countResults = await roleQB.getCount();
    }

    if (q) {
      roleQB = roleQB.andWhere('e.role_name ilike :role_name', {
        role_name: `%${q}%`,
      });
      countResults = await roleQB.getCount();
    }
    const skipValue: number = perPage * (page - 1);
    const roles = await roleQB
      .take(perPage)
      .skip(skipValue)
      .getMany();
    return {
      roles: roles,
      totalCount: countResults,
    };
  }

  // ** Get all active roles
  async AllActiveRoles(): Promise<Role[]> {
    return await this.roleRepository.find({
      where: {
        role_deleted: 'false',
      },
      relations: ['employees'],
    });
  }

  // ** Get Selected Role
  async getSelectedRole(id: string) {
    return await this.roleRepository.findOne(id);
  }

  /* Role creation service */
  async createRole(createRoleDTO: CreateRoleDTO): Promise<Role> {
    return await this.roleRepository.createRole(createRoleDTO);
  }

  /* Role Update service */
  async updateRole(updateRoleDTO: UpdateRoleDTO) {
    return await this.roleRepository.updateRole(updateRoleDTO);
  }

  /* Role Archive service */
  async archiveRole(deleteRoleDTO: DeleteRoleDTO) {
    return await this.roleRepository.archiveRole(deleteRoleDTO);
  }

  /* Role Restore service */
  async restoreRole(deleteRoleDTO: DeleteRoleDTO) {
    return await this.roleRepository.restoreRole(deleteRoleDTO);
  }

  /* Role delete service */
  async deleteRole(deleteRoleDTO: DeleteRoleDTO) {
    return await this.roleRepository.deleteRole(deleteRoleDTO);
  }
}
