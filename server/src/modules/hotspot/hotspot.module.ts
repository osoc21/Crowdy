import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { HotSpotRepository } from './repository/hotspot.repository';
import { HotspotTypeResolver } from './resolver/hotspot.resolvers';
import { HotSpotService } from './services/Hotspot.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotSpotRepository]), AdminAuthModule],
  providers: [HotspotTypeResolver, HotSpotService],
})
export class HotspotModule {}
