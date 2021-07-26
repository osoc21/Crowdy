import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from 'src/entities/vote/vote.entity';
import { HotSpotRepository } from 'src/modules/hotspot/repository/hotspot.repository';
import { CreateVoteDTO } from '../dtos/inputs/create-vote.dto';
import { DeleteVoteDTO } from '../dtos/inputs/delete-vote.dto';
import { UpdateVoteDTO } from '../dtos/inputs/update-vote.dto';
import { AllVotesQueryResponse } from '../dtos/responses/queries/allVotes.response';
import { VoteRepository } from '../repository/vote.repository';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteRepository)
    private readonly voteRepository: VoteRepository,
    private readonly hotspotRepository: HotSpotRepository,
  ) {}

  /* Vote creation repository */
  async createVote(createVoteDTO: CreateVoteDTO): Promise<Vote> {
    const { vote_value, hotSpotID } = createVoteDTO;

    // ** Get the actual hotspot
    const hotspot = await this.hotspotRepository.findOne(hotSpotID, {
      where: {
        hotspot_deleted: 'false',
      },
    });
    if (!hotspot) {
      throw new InternalServerErrorException(
        'The hotspot is unavailable or non existant.',
      );
    }

    const vote = this.voteRepository.create();

    vote.vote_value = vote_value;
    vote.hotspot = hotspot;

    try {
      await this.voteRepository.save(vote);
      return vote;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `The vote has been registered. Please try again later.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Error while saving the data into the database.`,
        );
      }
    }
  }

  /* Get all Votes */
  async getAllVotes(
    page: number,
    perPage: number,
    q?: string,
    deleted?: boolean,
  ): Promise<AllVotesQueryResponse> {
    let voteQB = await this.voteRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.employees', 'employee');
    let countResults = await voteQB.getCount();

    if (deleted == true) {
      voteQB = voteQB.andWhere('e.role_deleted = true', { deleted });
      countResults = await voteQB.getCount();
    } else if (deleted == false) {
      voteQB = voteQB.andWhere('e.role_deleted = false', { deleted });
      countResults = await voteQB.getCount();
    }

    if (q) {
      voteQB = voteQB.andWhere('e.role_name ilike :role_name', {
        role_name: `%${q}%`,
      });
      countResults = await voteQB.getCount();
    }
    const skipValue: number = perPage * (page - 1);
    const votes = await voteQB
      .take(perPage)
      .skip(skipValue)
      .getMany();
    return {
      votes: votes,
      totalCount: countResults,
    };
  }

  // ** Get all active Votes
  async AllActiveVotes(): Promise<Vote[]> {
    return await this.voteRepository.find({
      where: {
        vote_deleted: 'false',
      },
      relations: ['hotspot'],
    });
  }

  // ** Get Selected Vote
  async getSelectedVote(id: string) {
    return await this.voteRepository.findOne(id);
  }

  /* Vote creation service */
  // async createVote(createVoteDTO: CreateVoteDTO): Promise<Vote> {
  //   return await this.voteRepository.createVote(createVoteDTO);
  // }

  /* Vote Update service */
  async updateVote(updateVoteDTO: UpdateVoteDTO) {
    return await this.voteRepository.updateVote(updateVoteDTO);
  }

  /* Vote Archive service */
  async archiveVote(deleteVoteDTO: DeleteVoteDTO) {
    return await this.voteRepository.archiveVote(deleteVoteDTO);
  }

  /* Vote Restore service */
  async restoreVote(deleteVoteDTO: DeleteVoteDTO) {
    return await this.voteRepository.restoreVote(deleteVoteDTO);
  }

  /* Vote delete service */
  async deleteVote(deleteVoteDTO: DeleteVoteDTO) {
    return await this.voteRepository.deleteVote(deleteVoteDTO);
  }
}
