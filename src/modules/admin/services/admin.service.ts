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
    private readonly adminRepository: AdminRepository,
  ) {}

  /* User Info Update */

  async updateAdmin(updateUserDto: UpdateAdminDto, id: string): Promise<Admin> {
    const user = await this.findUserById(id);
    const { firstname, lastname, username } = updateUserDto;
    user.firstname = firstname ? firstname : user.firstname;
    user.lastname = lastname ? lastname : user.lastname;
    user.username = username ? username : user.username;
    user.fullname = `${firstname} ${lastname}`;

    try {
      await this.adminRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while updating user infos. Please try again later!`,
      );
    }
  }

  /* User Account deletion */

  async deleteAdmin(id: string) {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `An error occured, user not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );
    }
  }

  /* User found by id */

  async findUserById(userId: string): Promise<Admin> {
    const user = await this.adminRepository.findOne(userId);

    if (!user)
      throw new NotFoundException(
        `An error occured, user not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );

    return user;
  }
}
