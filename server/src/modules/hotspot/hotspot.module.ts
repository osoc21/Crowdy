import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { HotSpotRepository } from './repository/hotspot.repository';
import { HotspotResolver } from './resolver/hotspot.resolvers';
import { HotSpotService } from './services/Hotspot.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotSpotRepository]), AdminAuthModule],
  providers: [HotspotResolver, HotSpotService],
})
export class HotspotModule {}
