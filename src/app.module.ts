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
    /* TypeOrm Import */
    // TypeOrmModule.forRootAsync({
    //   useClass: TypeOrmConfigService,
    // }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? '.development.env'
          : '.production.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_NAME,
      port: +process.env.TYPEORM_PORT,
      // url: process.env.TYPEORM_URL,
      autoLoadEntities: Boolean(process.env.TYPEORM_AUTO_LOAD_ENTITIES),
      synchronize: Boolean(process.env.TYPEORM_SYNCRONIZE),
      logging: Boolean(process.env.TYPEORM_LOGGING),
      logger: 'file',
      ssl: false,
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
