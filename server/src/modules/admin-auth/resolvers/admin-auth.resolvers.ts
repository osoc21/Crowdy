import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminCredentialsDto } from '../dtos/login/user-credentials.dto';
import { LoginResponse } from '../dtos/login/loginResponse.output';
import { RegisterResponse } from '../dtos/register/register-return-admin.dto';
import { AdminRegisterDto } from '../dtos/register/register-admin.dto';
import { MessageResponse } from '../dtos/emails/success-message.response';
import { ForgotPassDto } from '../dtos/forgot-pass/forgot-pass.dto';
import { ResetPasswordDto } from '../dtos/reset-pass/reset-pass.dto';
import { Admin } from 'src/entities/admin/admin.entity';
import { ChangeEmailDto } from '../dtos/change-email/change-email.dto';
import { ChangePasswordDto } from '../dtos/change-pass/change-pass.dto';
import { RegisterAdminResponse } from '../dtos/admin/create-admin.response';
import { MyContext } from '../interfaces/MyContext';
import { UseGuards } from '@nestjs/common';
import { CurrentAdmin } from '../auth-strategy/auth-decorators/current.admin.decorator';
import { GqlAuthGuardAdmin } from '../auth-strategy/guards/auth-gql.guard';

@Resolver()
export class AdminAuthResolver {
  constructor(private adminAuthService: AdminAuthService) {}

  /* Create Admin */
  @Mutation(() => RegisterAdminResponse)
  async AdminSignup(): Promise<RegisterAdminResponse> {
    await this.adminAuthService.createAdmin();
    return {
      message: 'Admin Succesfully created.',
    };
  }

  // /* Register Mutation */
  // @Mutation(() => RegisterResponse)
  // async Register(
  //   @Args('data') createUserInput: UserRegisterDto,
  // ): Promise<RegisterResponse> {
  //   const user = await this.authUserService.signUp(createUserInput);
  //   return {
  //     user,
  //     message: 'Vous avez été enregistré avec succès',
  //   };
  // }

  /* Login Mutation */
  @Mutation(() => LoginResponse)
  async AdminLogin(
    @Args('data') authCredentialDto: AdminCredentialsDto,
    @Context() { res }: MyContext,
  ): Promise<{ accessToken: string }> {
    return await this.adminAuthService.signIn(authCredentialDto, res);
  }

  // /* Email confirmation Mutation */
  // @Mutation(() => MessageResponse)
  // async AdminEmailValidation(
  //   @Args('data') jwtToken: string,
  // ): Promise<{ message: string; type: string }> {
  //   return await this.adminAuthService.verifyEmail(jwtToken);
  // }

  // /* Forgot-pass Mutation Admin */
  // @Mutation(() => MessageResponse)
  // async AdminForgotPass(
  //   @Args('data') forgotPassDto: ForgotPassDto,
  // ): Promise<{ message: string; type: string }> {
  //   return await this.adminAuthService.forgotPass(forgotPassDto);
  // }

  // /* Change Password Mutation */
  // @Mutation(() => MessageResponse)
  // @UseGuards(new GqlAuthGuardAdmin())
  // async AdminChangePassword(
  //   @CurrentAdmin()
  //   user: Admin,
  //   @Args('data') changePasswordDto: ChangePasswordDto,
  // ): Promise<{ message: string; type: string }> {
  //   const id: string = user.id;
  //   console.log(id);
  //   return await this.adminAuthService.changePass(id, changePasswordDto);
  // }

  // /* Reset - Password Mutation */
  // @Mutation(() => MessageResponse)
  // async AdminResetPassword(
  //   @Args('data') resetPasswordDto: ResetPasswordDto,
  // ): Promise<{ message: string }> {
  //   return await this.adminAuthService.resetPass(resetPasswordDto);
  // }

  // /* Change E-mail send token Mutation */
  // @Mutation(() => MessageResponse)
  // @UseGuards(new GqlAuthGuardAdmin())
  // async AdminChangeEmailToken(
  //   @CurrentAdmin()
  //   user: Admin,
  // ): Promise<{ message: string; type: string }> {
  //   return await this.adminAuthService.sendChangeMailToken(user.email);
  // }

  // /* Change E-mail  Mutation */
  // @Mutation(() => MessageResponse)
  // @UseGuards(new GqlAuthGuardAdmin())
  // async AdminChangeEmail(
  //   @CurrentAdmin()
  //   @Args('data')
  //   changeEmailDto: ChangeEmailDto,
  // ): Promise<{ message: string; type: string }> {
  //   return await this.adminAuthService.changeMail(changeEmailDto);
  // }

  // /* Resend Confirmation e-mail */
  // @Mutation(() => MessageResponse)
  // @UseGuards(new GqlAuthGuardAdmin())
  // async AdminResendConfirmationEmail(
  //   @CurrentAdmin()
  //   user: Admin,
  // ): Promise<{ message: string }> {
  //   return await this.adminAuthService.resendVerifEmail(user.email);
  // }
}
