import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotSpotRepository } from '../hotspot/repository/hotspot.repository';
import { HotSpotTypeRepository } from './repository/hotspotType.repository';
import { HotspotTypeResolver } from './resolver/hotspotType.resolvers';
import { HotSpotTypeService } from './services/HotspotType.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotSpotTypeRepository, HotSpotRepository]),
  ],
  providers: [HotspotTypeResolver, HotSpotTypeService],
})
export class HotspotTypeModule {}
