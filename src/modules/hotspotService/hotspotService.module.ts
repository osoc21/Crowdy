import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { HotSpotRepository } from '../hotspot/repository/hotspot.repository';
import { HotspotServiceRepository } from './repository/hotspotService.repository';
import { HotspotServiceResolver } from './resolver/hotspotService.resolvers';
import { HotSpotService } from './services/HotspotService.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotspotServiceRepository, HotSpotRepository]),
    AdminAuthModule,
  ],
  providers: [HotspotServiceResolver, HotSpotService],
})
export class HotspotServicesModule {}
