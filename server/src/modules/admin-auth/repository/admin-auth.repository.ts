import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../../../entities/admin/admin.entity';
import { AdminRegisterDto } from '../dtos/register/register-admin.dto';
import { UserRole } from '../enums/admin-roles.enum';
import { AdminCredentialsDto } from '../dtos/login/user-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Admin)
export class AdminAuthRepository extends Repository<Admin> {
  async createUser(
    registerInput: AdminRegisterDto,
    role: UserRole,
  ): Promise<Admin> {
    const { firstname, lastname, email, password } = registerInput;

    const user = this.create();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.role = role;
    user.salt = await bcrypt.genSalt();
    user.password = await user.encryptPassword(password, user.salt);

    try {
      await this.manager.save(user);
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `l'adresse e-mail est déjà utilisé. Veuillez réessayer plus tard.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Erreur lors de l'enregistrement dans la base de données`,
        );
      }
    }
  }

  /* Check auth User */
  async checkCredentials(
    authCredentialsDto: AdminCredentialsDto,
  ): Promise<Admin | null> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
