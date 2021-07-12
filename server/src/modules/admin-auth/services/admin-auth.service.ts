import {
  Req,
  Res,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminJwtConfigService } from 'src/config/auth/admin-auth/config.service';
import { AdminConfigService } from 'src/config/auth/admin/config.service';
import { Admin } from '../../../entities/admin/admin.entity';
import { AdminCredentialsDto } from '../dtos/login/user-credentials.dto';
import { AdminRegisterDto } from '../dtos/register/register-admin.dto';
import { UserRole } from '../enums/admin-roles.enum';
import { IJwtPayloadAdmin } from '../interfaces/jwt-payload.interface';
import { AdminAuthRepository } from '../repository/admin-auth.repository';
import { IDecodedJwtEmailVerif } from '../interfaces/decoded-jwt-email-verif.interface';
import { getConnection } from 'typeorm';
import { ForgotPassDto } from '../dtos/forgot-pass/forgot-pass.dto';
import { ResetPasswordDto } from '../dtos/reset-pass/reset-pass.dto';
import { ChangeEmailDto } from '../dtos/change-email/change-email.dto';
import { ChangePasswordDto } from '../dtos/change-pass/change-pass.dto';
import { IJwtEmployeePayload } from '../interfaces-employee/jwt-payload.interface';
import { LoginResponse } from '../dtos/login/loginResponse.output';
import {
  createRefreshTokenAdmin,
  sendRefreshTokenAdmin,
} from '../constants/constants';
import { Response } from 'express';

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectRepository(AdminAuthRepository)
    private readonly adminAuthRepository: AdminAuthRepository,
    private readonly jwtService: JwtService,
    private readonly adminAuthConfig: AdminConfigService,
    private readonly userJwtAuthConfig: AdminJwtConfigService,
  ) {}

  /* INSERT USER ADMIN IN DB */
  async createAdmin() {
    const admin_1 = new Admin();
    admin_1.firstname = this.adminAuthConfig.name_1;
    admin_1.lastname = this.adminAuthConfig.prenom_1;
    admin_1.email = this.adminAuthConfig.email_1;
    admin_1.role = this.adminAuthConfig.role;
    admin_1.salt = await bcrypt.genSalt();
    admin_1.password = await admin_1.encryptPassword(
      this.adminAuthConfig.password,
      admin_1.salt,
    );
    await this.adminAuthRepository.save(admin_1);

    const admin_2 = new Admin();
    admin_2.firstname = this.adminAuthConfig.name_2;
    admin_2.lastname = this.adminAuthConfig.prenom_2;
    admin_2.email = this.adminAuthConfig.email_2;
    admin_2.role = this.adminAuthConfig.role;
    admin_2.salt = await bcrypt.genSalt();
    admin_2.password = await admin_2.encryptPassword(
      this.adminAuthConfig.password,
      admin_2.salt,
    );
    await this.adminAuthRepository.save(admin_2);
  }

  // /* SIGN-UP ADMIN */
  // async signUp(registerUserDto: UserRegisterDto): Promise<User> {
  //   const user = await this.userAuthRepository.createUser(
  //     registerUserDto,
  //     UserRole.USER,
  //   );
  //   const token = await this.generateToken(user);
  //   await this.adminMailerService.send_verification_email(
  //     user.email,
  //     token,
  //     user.lastname,
  //   );
  //   return user;
  // }

  /* Sign-In ADMIN */
  async signIn(
    userCredentials: AdminCredentialsDto,
    res: Response,
  ): Promise<LoginResponse> {
    const user = await this.adminAuthRepository.checkCredentials(
      userCredentials,
    );
    if (!user) {
      throw new UnauthorizedException(`Invalid LogIn Infos.`);
    }

    const payload: IJwtPayloadAdmin = {
      id: user.id,
      username: user.username,
      user_number: user.user_number,
      role: user.role,
    };

    const accessToken = await this.jwtService.sign(payload);
    // Clear potential cookies
    res.clearCookie('jidAdmin', { path: '/' });
    // for cookies - send refresh token
    sendRefreshTokenAdmin(res, createRefreshTokenAdmin(user));
    const userData: LoginResponse = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.fullname,
      avatar: user.avatar,
      email: user.email,
      role: user.role,
      accessToken: accessToken,
    };

    return userData;
  }

  /* LOGOUT Admin */
  async logoutAdmin(req, res) {
    res.cookie('jidAdmin', 'deleted', {
      expire: Date.now(),
      sameSite: 'strict',
      httpOnly: true,
    });

    res
      .clearCookie('jidAdmin', { path: '/' })
      .status(200)
      .send({ message: 'Logout Successfull!' });
  }

  /* ************************************************************** *
   *               FINDING USER    [ADMIN]                          *
  /* ************************************************************** */

  /* Find User by ID ADMIN*/
  private async findUser_by_id(id: string): Promise<Admin> {
    const user = await this.adminAuthRepository.findOne(id);

    if (!user)
      throw new NotFoundException(
        `An error occured, admin not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );

    return user;
  }

  /* Find User by EMAIL ADMIN*/
  private async findUser_by_email(email: string): Promise<Admin> {
    const user = await this.adminAuthRepository.findOne({
      where: { email },
    });

    if (!user)
      throw new NotFoundException(
        `An error occured, user not found.
                 Maybe the provided data are invalid or deleted from the Database.`,
      );

    return user;
  }

  /* **************************************************************************** */
  /*               EMAILS  METHODS ADMIN*/
  /* **************************************************************************** */

  //

  /* ************************************************************** *
   *               TOKENS     [ADMIN]                               *
  /* ************************************************************** */

  /* GENERATE TOKENS FOR EMAILS ADMIN*/
  private async generateToken(user: Admin): Promise<string> {
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
