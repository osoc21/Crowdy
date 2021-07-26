import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AdminJwtConfigService } from './config.service';
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
        JWT_SECRET: Joi.string().required(),
        EXPIRES_IN: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, AdminJwtConfigService],
  exports: [ConfigService, AdminJwtConfigService],
})
export class AdminAuthConfigModule {}
