import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { version } from 'uuid';

@InputType()
export class DeleteVoteDTO {
  @Field()
  @IsString({ message: `Unsupported Format.` })
  @IsUUID(4, { message: `The version of UUID does not correspond!` })
  vote_id: string;
}
