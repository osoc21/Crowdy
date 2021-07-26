import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminAuthModule } from '../admin-auth/admin-auth.module';
import { HotSpotRepository } from '../hotspot/repository/hotspot.repository';
import { VoteRepository } from './repository/vote.repository';
import { VoteResolver } from './resolver/vote.resolvers';
import { VoteService } from './services/vote.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoteRepository, HotSpotRepository]),
    AdminAuthModule,
  ],
  providers: [VoteResolver, VoteService],
})
export class VoteModule {}
