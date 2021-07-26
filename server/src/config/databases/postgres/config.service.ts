import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Boolean } from 'aws-sdk/clients/cognitosync';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.type,
      url: this.url,
      // host: this.host,
      // port: this.port,
      // username: this.username,
      // password: this.password,
      // database: this.database,

      autoLoadEntities: this.autoLoadEntities,
      synchronize: this.synchronize,

      logging: this.logging,
      logger: 'file',
    };
  }
  get env(): string {
    return this.configService.get<string>('typeOrm.env');
  }

  get type(): any {
    return this.configService.get<any>('typeOrm.database.type');
  }
  get ssl(): boolean {
    return this.configService.get<Boolean>('typeOrm.database.url');
  }
  get url(): string {
    return this.configService.get<string>('typeOrm.database.url');
  }
  // get database(): string {
  //   return this.configService.get<string>('typeOrm.database.database');
  // }
  // get port(): number {
  //   return this.configService.get<number>('typeOrm.database.port');
  // }
  // get host(): string {
  //   return this.configService.get<string>('typeOrm.database.host');
  // }
  // get username(): string {
  //   return this.configService.get<string>('typeOrm.database.username');
  // }
  // get password(): string {
  //   return this.configService.get<string>('typeOrm.database.password');
  // }
  get autoLoadEntities(): boolean {
    return this.configService.get<boolean>('typeOrm.database.autoLoadEntities');
  }
  get synchronize(): boolean {
    return this.configService.get<boolean>('typeOrm.database.synchronize');
  }
  get logging(): boolean {
    return this.configService.get<boolean>('typeOrm.database.logging');
  }
}
