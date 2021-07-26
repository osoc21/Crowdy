import { UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Vote } from 'src/entities/vote/vote.entity';
import { GqlAuthGuardAdmin } from 'src/modules/admin-auth/auth-strategy/guards/auth-gql.guard';
import { CreateVoteDTO } from '../dtos/inputs/create-vote.dto';
import { DeleteVoteDTO } from '../dtos/inputs/delete-vote.dto';
import { UpdateVoteDTO } from '../dtos/inputs/update-vote.dto';
import { DeleteVoteResponse } from '../dtos/responses/delete-vote.response';
import { AllVotesQueryResponse } from '../dtos/responses/queries/allVotes.response';
import { CreateVoteResponse } from '../dtos/responses/vote-creation.response';
import { UpdateVoteResponse } from '../dtos/responses/vote-update.response';
import { VoteService } from '../services/vote.service';

@Resolver()
// @UseGuards(new GqlAuthGuardAdmin())
export class VoteResolver {
  constructor(private voteService: VoteService) {}

  /* Read all votes */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => AllVotesQueryResponse)
  async AllVotes(
    @Args('page', { type: () => Int }) page: number,
    @Args('perPage', { type: () => Int }) perPage: number,
    @Args('q', { type: () => String, nullable: true }) q?: string,
    @Args('deleted', { type: () => Boolean, nullable: true }) deleted?: boolean,
  ): Promise<AllVotesQueryResponse> {
    return await this.voteService.getAllVotes(page, perPage, q, deleted);
  }

  /* Read all votes for selection*/
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => [Vote])
  async AllActiveVotes(): Promise<Vote[]> {
    return await this.voteService.AllActiveVotes();
  }

  // ** Get Selected Vote
  // @UseGuards(new GqlAuthGuardAdmin())
  @Query(() => Vote)
  async SelectedVote(@Args('id', { type: () => String }) id: string) {
    return await this.voteService.getSelectedVote(id);
  }

  /* Create vote Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => CreateVoteResponse)
  async VoteCreation(
    @Args('data') createVoteDTO: CreateVoteDTO,
  ): Promise<CreateVoteResponse> {
    const vote = await this.voteService.createVote(createVoteDTO);
    return {
      vote: vote,
      message: 'The vote has been saved successfully.',
    };
  }

  /* Update vote Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => UpdateVoteResponse)
  async VoteUpdate(
    @Args('data') updateVoteDTO: UpdateVoteDTO,
  ): Promise<UpdateVoteResponse> {
    const vote = await this.voteService.updateVote(updateVoteDTO);
    return {
      vote: vote,
      message: 'The vote as been updated successfully.',
    };
  }

  /* Archive vote Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteVoteResponse)
  async VoteArchive(
    @Args('data') deleteVoteDTO: DeleteVoteDTO,
  ): Promise<DeleteVoteResponse> {
    await this.voteService.archiveVote(deleteVoteDTO);
    return {
      message: 'The vote has been successfully updated.',
    };
  }

  /* Restore vote Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteVoteResponse)
  async VoteRestore(
    @Args('data') deleteVoteDTO: DeleteVoteDTO,
  ): Promise<DeleteVoteResponse> {
    await this.voteService.restoreVote(deleteVoteDTO);
    return {
      message: 'The vote has been restored successfully.',
    };
  }

  /* Delete vote Mutation */
  // @UseGuards(new GqlAuthGuardAdmin())
  @Mutation(() => DeleteVoteResponse)
  async VoteDelete(
    @Args('data') deleteVoteDTO: DeleteVoteDTO,
  ): Promise<DeleteVoteResponse> {
    await this.voteService.deleteVote(deleteVoteDTO);
    return {
      message: 'The vote has been successfully deleted.',
    };
  }
}
