import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { RoleRepository } from './repository/role.repository';
import { RoleResolver } from './resolver/role.resolvers';
import { RoleService } from './services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository]), AdminAuthModule],
  providers: [RoleResolver, RoleService],
})
export class RoleModule {}
