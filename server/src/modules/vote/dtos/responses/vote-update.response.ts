import { Field, ObjectType } from '@nestjs/graphql';
import { Vote } from 'src/entities/vote/vote.entity';

@ObjectType()
export class UpdateVoteResponse {
  @Field()
  vote: Vote;

  @Field()
  message: string;
}
