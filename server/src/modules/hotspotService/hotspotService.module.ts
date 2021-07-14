import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { HotspotRepository } from './repository/hotspotService.repository';
import { HotspotServiceResolver } from './resolver/hotspotService.resolvers';
import { HotSpotService } from './services/HotspotService.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotspotRepository]), AdminAuthModule],
  providers: [HotspotServiceResolver, HotSpotService],
})
export class HotspotServicesModule {}
