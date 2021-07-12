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
    readonly userAuthConfig: AdminJwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: userAuthConfig.jwtSecret,
    });
  }

  async validate(payload: IJwtPayloadAdmin): Promise<Admin> {
    const { id } = payload;
    const user = await this.authUserRepository.findOne({ id });

    if (!user) {
      throw new UnauthorizedException(
        'Please authenticated yourself first as an Admin!',
      );
    }

    return user;
  }
}
