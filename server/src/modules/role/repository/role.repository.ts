import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from 'src/entities/role/role.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRoleDTO } from '../dtos/inputs/create-role.dto';
import { DeleteRoleDTO } from '../dtos/inputs/delete-role.dto';
import { UpdateRoleDTO } from '../dtos/inputs/update-role.dto';

@Injectable()
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  /* Role creation repository */
  async createRole(createRoleDTO: CreateRoleDTO): Promise<Role> {
    const { role_name } = createRoleDTO;

    const role = this.create();
    role.role_name = role_name;

    try {
      await this.manager.save(role);
      return role;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `le role existe déjà. Veuillez réessayer plus tard.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Erreur lors de l'enregistrement dans la base de données`,
        );
      }
    }
  }

  /* Role Update repository */
  async updateRole(updateRoleDTO: UpdateRoleDTO): Promise<Role> {
    const { role_name, role_id } = updateRoleDTO;
    const role = await this.findRoleById(role_id);
    role.role_name = role_name ? role_name : role.role_name;

    try {
      await this.save(role);
      return role;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la mise à jour de vos données. Réessayer plus tard!`,
      );
    }
  }

  /* Role archive repository */
  async archiveRole(deleteRoleDTO: DeleteRoleDTO) {
    const { role_id } = deleteRoleDTO;
    const role = await this.findRoleById(role_id);
    role.role_deleted = true;

    try {
      await this.save(role);
      return role;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la mise à jour de vos données. Réessayer plus tard!`,
      );
    }
  }

  /* Role restore repository */
  async restoreRole(deleteRoleDTO: DeleteRoleDTO) {
    const { role_id } = deleteRoleDTO;
    const role = await this.findRoleById(role_id);
    role.role_deleted = false;

    try {
      await this.save(role);
      return role;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la mise à jour de vos données. Réessayer plus tard!`,
      );
    }
  }

  /* Role delete repository */
  async deleteRole(deleteRoleDTO: DeleteRoleDTO) {
    const { role_id } = deleteRoleDTO;
    const role = await this.findRoleById(role_id);
    const result = await this.delete(role.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Nous rencontrons un problème pour trouver la position. 
                 Peut-être que les données que vous avez fournies sont invalides ou ont été supprimées`,
      );
    }
  }

  /* User Role by id */

  async findRoleById(roleId: string): Promise<Role> {
    const role = await this.findOne(roleId);

    if (!role)
      throw new NotFoundException(
        `Nous rencontrons un problème pour trouver ce Role. 
                 Peut-être que les données que vous avez fournies sont invalides ou ont été supprimées`,
      );
    return role;
  }
}
