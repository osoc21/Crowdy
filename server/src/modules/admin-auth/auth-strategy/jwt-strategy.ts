import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AdminJwtConfigService } from 'src/config/auth/admin-auth/config.service';
import { Admin } from 'src/entities/admin/admin.entity';
import { IJwtPayloadAdmin } from '../interfaces/jwt-payload.interface';
import { AdminAuthRepository } from '../repository/admin-auth.repository';

@Injectable()
export class JwtStrategyAdmin extends PassportStrategy(Strategy, 'jwt-admin') {
  constructor(
    @InjectRepository(AdminAuthRepository)
    private readonly authUserRepository: AdminAuthRepository,
    readonly adminAuthConfig: AdminJwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: adminAuthConfig.jwtSecret,
    });
  }

  async validate(payload: IJwtPayloadAdmin): Promise<Admin> {
    const { id } = payload;
    const admin = await this.authUserRepository.findOne({ id });

    if (!admin) {
      throw new UnauthorizedException(
        'Please authenticated yourself first as an Admin!',
      );
    }

    return admin;
  }
}
