import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */

@Injectable()
export class AdminJwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.jwtSecret,
      signOptions: {
        expiresIn: this.expiresIn,
      },
    };
  }
  get env(): string {
    return this.configService.get<string>('userAuth.env');
  }

  get jwtSecret(): string {
    return this.configService.get<string>('userAuth.jwtSecret');
  }
  get expiresIn(): string {
    return this.configService.get<string>('userAuth.expiresIn');
  }
  get jwtSecretEmail(): string {
    return this.configService.get<string>('userAuth.jwtSecretEmail');
  }
  get expiresInEmail(): string {
    return this.configService.get<string>('userAuth.expiresInEmail');
  }
}
