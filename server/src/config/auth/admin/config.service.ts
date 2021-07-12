import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with user config based operations.
 *
 * @class
 */
@Injectable()
export class AdminConfigService {
  constructor(private configService: ConfigService) {}

  get name_1(): string {
    return this.configService.get<string>('userAdminConf.name_1');
  }

  get prenom_1(): string {
    return this.configService.get<string>('userAdminConf.prenom_1');
  }

  get email_1(): string {
    return this.configService.get<string>('userAdminConf.email_1');
  }

  get role(): string {
    return this.configService.get<string>('userAdminConf.role');
  }

  get password(): string {
    return this.configService.get<string>('userAdminConf.password');
  }

  get name_2(): string {
    return this.configService.get<string>('userAdminConf.name_2');
  }

  get prenom_2(): string {
    return this.configService.get<string>('userAdminConf.prenom_2');
  }
  get email_2(): string {
    return this.configService.get<string>('userAdminConf.email_2');
  }
}
