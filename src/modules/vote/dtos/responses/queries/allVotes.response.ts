import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Vote } from 'src/entities/vote/vote.entity';

@ObjectType()
export class AllVotesQueryResponse {
  @Field(() => [Vote])
  votes: Vote[];

  @Field(() => Int)
  totalCount: number;
}
