import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserJwtConfigService } from 'src/config/auth/user/config.service';
import { User } from 'src/entities/user/user.entity';
import { IJwtUserPayload } from '../interfaces-user/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class JwtStrategyUser extends PassportStrategy(Strategy, 'jwt-user') {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    readonly userAuthConfig: UserJwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: userAuthConfig.jwtSecret,
    });
  }

  async validate(payload: IJwtUserPayload): Promise<User> {
    const { id } = payload;
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new UnauthorizedException(
        'Please authenticated yourself first as User!',
      );
    }

    return user;
  }
}
