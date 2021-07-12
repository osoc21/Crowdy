import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AdminConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

      validationSchema: Joi.object({
        NAME_1: Joi.string(),
        PRENOM_1: Joi.string(),
        EMAIL_1: Joi.string().email(),
        NAME_2: Joi.string(),
        PRENOM_2: Joi.string(),
        EMAIL_2: Joi.string().email(),
      }),
    }),
  ],
  providers: [ConfigService, AdminConfigService],
  exports: [ConfigService, AdminConfigService],
})
export class AdminConfigModule {}
