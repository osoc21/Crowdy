import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user/user.entity';
import { UserCredentialsDto } from '../dtos/login-user/user-credentials.dto';
import { ChangePasswordUserDto } from '../dtos/change-pass/change-pass.dto';
import { MessageResponseUser } from '../dtos/generic-response/response.dto';
import { CreateUserDTO } from '../dtos/inputs/create-user.dto';
import { UpdateUserDTO } from '../dtos/inputs/update-user.dto';
import { CreateUserResponse } from '../dtos/responses/user-creation.response';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  /* User creation repository */
  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserResponse> {
    const { firstname, lastname, email, password } = createUserDTO;

    // Getting the actual ability

    const user = this.create();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await user.encryptPassword(password, user.salt);
    user.role = 'student';
    user.status = 'registered';

    try {
      await this.manager.save(user);
      delete user.archived;
      delete user.confirmationToken;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.password;
      delete user.salt;
      delete user.revoke_login;
      delete user.recoverToken;
      delete user.tokenVersion;
      delete user.status;
      delete user.role;

      return {
        user,
        message: 'User saved successfully.',
        type: 'success',
      };
    } catch (error) {
      if (error.code.toString() === '23505') {
        return {
          message: `User already exists. Please try with another e-mail adress.`,
          type: 'error',
        };
      } else {
        return {
          message: `Error occured while saving user infos. Please try again later!`,
          type: 'error',
        };
      }
    }
  }
  /* Employee Update repository */
  async updateUserInfo(id, updateUserDTO: UpdateUserDTO): Promise<User> {
    const { firstname, lastname } = updateUserDTO;
    const user = await this.findUserById(id);
    user.firstname = firstname ? firstname : user.firstname;
    user.lastname = lastname ? lastname : user.lastname;
    user.fullname = `${firstname} ${lastname}`;

    try {
      await this.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while updating user infos. Please try again later!`,
      );
    }
  }

  /* Get USER by ID */
  async findUserById(userId: string): Promise<User> {
    const user = await this.findOne(userId);
    if (!user)
      throw new NotFoundException(
        `An error occured, user not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );
    return user;
  }

  /* Find User by EMAIL USER*/
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({
      where: { email },
    });
    if (!user)
      throw new NotFoundException(
        `An error occured, user not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );
    return user;
  }

  /* Find User by EMAIL USER*/
  async findUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({
      where: { username },
    });
    if (!user)
      throw new NotFoundException(
        `An error occured, user not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );
    return user;
  }

  /* Check User credentials */
  async checkUserCredentials(
    authCredentialsDto: UserCredentialsDto,
  ): Promise<User | null> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
