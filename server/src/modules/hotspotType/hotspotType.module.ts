import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { HotSpotTypeRepository } from './repository/hotspotType.repository';
import { HotspotTypeResolver } from './resolver/hotspotType.resolvers';
import { HotSpotTypeService } from './services/HotspotType.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotSpotTypeRepository]), AdminAuthModule],
  providers: [HotspotTypeResolver, HotSpotTypeService],
})
export class HotspotTypeModule {}
