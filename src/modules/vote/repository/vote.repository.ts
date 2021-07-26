import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateVoteDTO } from '../dtos/inputs/create-vote.dto';
import { DeleteVoteDTO } from '../dtos/inputs/delete-vote.dto';
import { UpdateVoteDTO } from '../dtos/inputs/update-vote.dto';
import { Vote } from 'src/entities/vote/vote.entity';

@Injectable()
@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {
  /* Vote creation repository */
  async createVote(createVoteDTO: CreateVoteDTO): Promise<Vote> {
    const { vote_value } = createVoteDTO;

    const vote = this.create();
    vote.vote_value = vote_value;

    try {
      await this.manager.save(vote);
      return vote;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `The vote already exist. Please try again later.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Error while saving your data in database.`,
        );
      }
    }
  }

  /* Vote Update repository */
  async updateVote(updateVoteDTO: UpdateVoteDTO): Promise<Vote> {
    const { vote_value, vote_id } = updateVoteDTO;
    const vote = await this.findVoteById(vote_id);
    vote.vote_value = vote_value ? vote_value : vote.vote_value;

    try {
      await this.save(vote);
      return vote;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while updating your data. Try again later!`,
      );
    }
  }

  /* Vote archive repository */
  async archiveVote(deleteVoteDTO: DeleteVoteDTO) {
    const { vote_id } = deleteVoteDTO;
    const vote = await this.findVoteById(vote_id);
    vote.vote_deleted = true;

    try {
      await this.save(vote);
      return vote;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error occured while updating the database. Please try again later!`,
      );
    }
  }

  /* Vote restore repository */
  async restoreVote(deleteVoteDTO: DeleteVoteDTO) {
    const { vote_id } = deleteVoteDTO;
    const vote = await this.findVoteById(vote_id);
    vote.vote_deleted = false;

    try {
      await this.save(vote);
      return vote;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error occured while updating the database. Please try again later!`,
      );
    }
  }

  /* Vote delete repository */
  async deleteVote(deleteVoteDTO: DeleteVoteDTO) {
    const { vote_id } = deleteVoteDTO;
    const vote = await this.findVoteById(vote_id);
    const result = await this.delete(vote.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `We have a problem while deleting the vote. 
                 Maybe the data u provided is invalid or already deleted in our database.`,
      );
    }
  }

  /* Vote by id */

  async findVoteById(voteId: string): Promise<Vote> {
    const vote = await this.findOne(voteId);

    if (!vote)
      throw new NotFoundException(
        `We have a problem finding the vote. 
                 Maybe the data u provided is invalid or already deleted in our database.`,
      );
    return vote;
  }
}
