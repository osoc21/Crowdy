import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { AdminRepository } from './repository/admin.repository';
import { AdminResolver } from './resolvers/admin.resolvers';
import { AdminService } from './services/admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository]), AdminAuthModule],
  providers: [AdminResolver, AdminService],
})
export class AdminModule {}
