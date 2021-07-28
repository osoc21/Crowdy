import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuthConfigModule } from 'src/config/auth/user/config.module';
import { UserJwtConfigService } from 'src/config/auth/user/config.service';
import { JwtStrategyUser } from './auth-strategy/jwt-strategy';
import { UserRepository } from './repository/user.repository';
import { UserResolver } from './resolver/user.resolvers';
import { UserService } from './services/user.service';

@Module({
  imports: [
    UserAuthConfigModule,

    PassportModule.register({
      defaultStrategy: 'jwt-user',
    }),

    JwtModule.registerAsync({
      useClass: UserJwtConfigService,
    }),

    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserResolver, UserService, JwtStrategyUser],
  exports: [JwtStrategyUser, PassportModule, UserService],
})
export class UserModule {}
