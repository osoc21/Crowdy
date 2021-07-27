import { Controller, Post, Req, Res } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth.service';

@Controller('users')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}
  /* LOGOUT POST endpoint */
  @Post('logout-admin')
  async logoutAdmin(@Req() request, @Res() response) {
    try {
      await this.adminAuthService.logoutAdmin(request, response);
    } catch (error) {
      return response.status(500).json(`Echec du logout: ${error.message}`);
    }
  }
  // /* CV upload POST endpoint */
  // @Post('refresh-token-admin')
  // async refreshTokenAdmin(@Req() request, @Res() response) {
  //   try {
  //     await this.adminAuthService.refreshTokenAdmin(request, response);
  //   } catch (error) {
  //     return response
  //       .status(500)
  //       .json(`Echec lors du refreshToken: ${error.message}`);
  //   }
  // }
}
