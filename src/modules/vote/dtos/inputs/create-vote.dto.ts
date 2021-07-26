import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateVoteDTO {
  @Field()
  @IsString({ message: `Unsupported Format. Must be an string` })
  @MinLength(1, {
    message: `You need to input at least a number.`,
  })
  @MaxLength(3, {
    message: `The input number is too long.`,
  })
  vote_value: string;

  /* hotspot id */
  @Field()
  @IsString({ message: `Unsupported ID format.` })
  @IsUUID(4, { message: `The version is invalid!` })
  hotSpotID: string;
}
