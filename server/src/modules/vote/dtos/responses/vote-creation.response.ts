import { Field, ObjectType } from '@nestjs/graphql';
import { Vote } from 'src/entities/vote/vote.entity';

@ObjectType()
export class CreateVoteResponse {
  @Field()
  vote: Vote;

  @Field()
  message: string;
}
