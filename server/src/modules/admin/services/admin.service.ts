import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admin/admin.entity';
import { UpdateAdminDto } from '../dtos/update-user.dto';
import { AdminRepository } from '../repository/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly userRepository: AdminRepository,
  ) {}

  /* User Info Update */

  async updateUser(updateUserDto: UpdateAdminDto, id: string): Promise<Admin> {
    const user = await this.findUserById(id);
    const { firstname, lastname, username } = updateUserDto;
    user.firstname = firstname ? firstname : user.firstname;
    user.lastname = lastname ? lastname : user.lastname;
    user.username = username ? username : user.username;
    user.fullname = `${firstname} ${lastname}`;

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Erreur lors de la mise à jour de vos données. Réessayer plus tard!`,
      );
    }
  }

  /* User Account deletion */

  async deleteUser(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Nous rencontrons un problème pour trouver cet utilisateur. 
                 Peut-être que les données que vous avez fournies sont invalides ou ont été supprimées`,
      );
    }
  }

  /* User found by id */

  async findUserById(userId: string): Promise<Admin> {
    const user = await this.userRepository.findOne(userId);

    if (!user)
      throw new NotFoundException(
        `Nous rencontrons un problème pour trouver cet utilisateur. 
                 Peut-être que les données que vous avez fournies sont invalides ou ont été supprimées`,
      );

    return user;
  }
}
