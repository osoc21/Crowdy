import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { TypeOrmConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: process.env.DEV_MODE
        ? '.development.env'
        : '.production.env',
      isGlobal: true,
      validationSchema: Joi.object({
        TYPEORM_HOST: Joi.required(),
        TYPEORM_PORT: Joi.number().default(5432),
        TYPEORM_LOGGING: Joi.bool().default(false),
        TYPEORM_SYNCHRONIZE: Joi.bool().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [ConfigService, TypeOrmConfigService],
  exports: [ConfigService, TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
