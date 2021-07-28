import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotspotServiceRepository } from '../hotspotService/repository/hotspotService.repository';
import { HotSpotTypeRepository } from '../hotspotType/repository/hotspotType.repository';
import { VoteRepository } from '../vote/repository/vote.repository';
import { HotSpotRepository } from './repository/hotspot.repository';
import { HotspotResolver } from './resolver/hotspot.resolvers';
import { HotSpotService } from './services/Hotspot.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HotSpotRepository,
      HotSpotTypeRepository,
      HotspotServiceRepository,
      VoteRepository,
    ]),
  ],
  providers: [HotspotResolver, HotSpotService],
})
export class HotspotModule {}
