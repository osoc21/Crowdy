import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AdminModule } from './modules/admin/admin.module';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { AppConfigModule } from './config/app/config.module';
import { AdminAuthConfigModule } from './config/auth/admin-auth/config.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/Log/winston.config';
import { UserAuthConfigModule } from 'src/config/auth/user/config.module';
import { ConfigModule } from '@nestjs/config';

import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { UserModule } from './modules/user/user.module';
import { HotspotTypeModule } from './modules/hotspotType/hotspotType.module';
import { HotspotModule } from './modules/hotspot/hotspot.module';
import { HotspotServicesModule } from './modules/hotspotService/hotspotService.module';
import { VoteModule } from './modules/vote/vote.module';

/**
 * Import and provide app related classes.
 *
 * @module
 */

@Module({
  imports: [
    //** environement */
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.production.env',
    }),

    /* TypeOrm Import */
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.database_url
        ? { url: process.env.DATABASE_URL }
        : {
            host: process.env.TYPEORM_HOST,
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_NAME,
            port: +process.env.TYPEORM_PORT,
          }),
      autoLoadEntities: Boolean(process.env.TYPEORM_AUTO_LOAD_ENTITIES),
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
      logger: 'file',
      extra:
        process.env.NODE_ENV === 'production'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : null,
    }),

    /* Winston Import */
    WinstonModule.forRoot(winstonConfig),

    /* GraphQl Import */
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ headers: req.headers, res }),
    }),

    /* Configs */
    AdminAuthConfigModule,
    UserAuthConfigModule,
    AppConfigModule,

    /* Modules */
    AdminModule,
    AdminAuthModule,
    VoteModule,
    UserModule,
    HotspotModule,
    HotspotTypeModule,
    HotspotServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
