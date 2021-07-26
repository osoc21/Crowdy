import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { version } from 'uuid';

@InputType()
export class UpdateVoteDTO {
  @Field()
  @IsString({ message: `Unsupported format.` })
  @IsUUID(4, { message: `UUID is not supported!` })
  vote_id: string;

  @Field()
  @IsString({ message: `Unsupported format.` })
  @MinLength(1, {
    message: `Vote must contain at least one number.`,
  })
  @MaxLength(3, {
    message: `Vote too long.`,
  })
  vote_value: string;
}
