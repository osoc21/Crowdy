import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AdminAuthRepository } from './repository/admin-auth.repository';
import { AdminAuthResolver } from './resolvers/admin-auth.resolvers';
import { AdminAuthService } from './services/admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyAdmin } from './auth-strategy/jwt-strategy';
import { AdminAuthConfigModule } from 'src/config/auth/admin-auth/config.module';
import { AdminJwtConfigService } from 'src/config/auth/admin-auth/config.service';
import { AdminConfigModule } from 'src/config/auth/admin/config.module';
import { AdminAuthController } from './controller/admin-auth.controller';

@Module({
  imports: [
    AdminAuthConfigModule,
    AdminConfigModule,

    PassportModule.register({
      defaultStrategy: 'jwt-admin',
    }),

    JwtModule.registerAsync({
      useClass: AdminJwtConfigService,
    }),

    TypeOrmModule.forFeature([AdminAuthRepository]),

    /* Mail */
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthResolver, AdminAuthService, JwtStrategyAdmin],
  exports: [JwtStrategyAdmin, PassportModule, AdminAuthService],
})
export class AdminAuthModule {}
