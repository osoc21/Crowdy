import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AdminModule } from './modules/admin/admin.module';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { AppConfigModule } from './config/app/config.module';
import { TypeOrmConfigModule } from './config/databases/postgres/config.module';
import { TypeOrmConfigService } from './config/databases/postgres/config.service';
import { AdminAuthConfigModule } from './config/auth/admin-auth/config.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/Log/winston.config';
import { UserAuthConfigModule } from 'src/config/auth/user/config.module';

import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { UserModule } from './modules/user/user.module';
import { HotspotTypeModule } from './modules/hotspotType/hotspotType.module';
import { HotspotModule } from './modules/hotspot/hotspot.module';
import { HotspotServicesModule } from './modules/hotspotService/hotspotService.module';

/**
 * Import and provide app related classes.
 *
 * @module
 */

@Module({
  imports: [
    /* TypeOrm Import */
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),

    /* Winston Import */
    WinstonModule.forRoot(winstonConfig),

    /* GraphQl Import */
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        credentials: true,
        origin: process.env.APP_URL,
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.extensions.exception.response.message || error.message,
        };
        return graphQLFormattedError;
      },
      context: ({ req, res }) => ({ headers: req.headers, res }),
    }),

    /* Configs */
    TypeOrmConfigModule,
    AdminAuthConfigModule,
    UserAuthConfigModule,
    AppConfigModule,

    /* Modules */
    AdminModule,
    AdminAuthModule,
    UserModule,
    HotspotModule,
    HotspotTypeModule,
    HotspotServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
