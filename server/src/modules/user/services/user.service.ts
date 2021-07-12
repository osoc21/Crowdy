import {
  Body,
  Injectable,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { getConnection } from 'typeorm';
import { UserJwtConfigService } from 'src/config/auth/user/config.service';
import { User } from 'src/entities/user/user.entity';
import { ChangePasswordUserDto } from '../dtos/change-pass/change-pass.dto';
import { MessageResponseUser } from '../dtos/generic-response/response.dto';
import { ChangeEmailUserDto } from '../dtos/change-email/change-email.dto';
import { ResetPasswordUserDto } from '../dtos/reset-pass/reset-pass.dto';
import { IJwtUserPayload } from '../interfaces-user/jwt-payload.interface';
import { IDecodedJwtEmailVerif } from '../interfaces-user/decoded-jwt-email-verif.interface';
import { ForgotPassUserDto } from '../dtos/forgot-pass/forgot-pass.dto';
import { CreateUserDTO } from '../dtos/inputs/create-user.dto';
import { UserCredentialsDto } from '../dtos/login-user/user-credentials.dto';
import { LoginResponseUser } from '../dtos/login-user/loginResponse.output';
import { Response } from 'express';
import { UpdateUserDTO } from '../dtos/inputs/update-user.dto';
import { CreateUserResponse } from '../dtos/responses/user-creation.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly userJwtAuthConfig: UserJwtConfigService,
  ) {}
  /* Get all Users */
  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  /* USER creation service */
  async createUser(createUserDTO: CreateUserDTO): Promise<CreateUserResponse> {
    const response = await this.userRepository.createUser(createUserDTO);
    if (response.type == 'success') {
      const token = await this.generateToken(response.user);
    }
    return response;
  }

  /* Login Employee */
  async logInUser(
    userCredentials: UserCredentialsDto,
    res: Response,
  ): Promise<LoginResponseUser> {
    const user = await this.userRepository.checkUserCredentials(
      userCredentials,
    );
    if (!user) {
      throw new UnauthorizedException(`Provided LogIn infos are incorrect.`);
    }
    const payload: IJwtUserPayload = {
      id: user.id,
      username: user.username,
      user_id: user.user_ID,
    };
    const accessToken = await this.jwtService.sign(payload);
    const refreshToken = jwt.sign(
      { userId: user.id, tokenVersion: user.tokenVersion },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      },
    );
    // clear potential cookies
    res.clearCookie('jidUser', { path: '/' });
    // for cookies - send refresh token
    const userData: LoginResponseUser = {
      id: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
    return userData;
  }

  /* Logout USER */
  async logoutUser(req, res) {
    res.cookie('jidUser', 'deleted', {
      expire: Date.now(),
      sameSite: 'strict',
      httpOnly: true,
    });
    res
      .clearCookie('jidUser', { path: '/' })
      .status(200)
      .send({ message: 'Logout Successfull!' });
  }

  /* user Update service */
  async updateUserInfo(id, updateUserDTO: UpdateUserDTO) {
    return await this.userRepository.updateUserInfo(id, updateUserDTO);
  }

  /* ************************************************************** *
   *               TOKENS     [USER]                               *
  /* ************************************************************** */
  /* GENERATE FOR USER LOGIN*/
  async generateToken(user: User): Promise<string> {
    const token = await jwt.sign(
      {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
      },
      this.userJwtAuthConfig.jwtSecretEmail,
      {
        expiresIn: this.userJwtAuthConfig.expiresInEmail,
      },
    );
    return token;
  }
}
