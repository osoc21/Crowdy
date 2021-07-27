import { gql } from "@apollo/client";

export const CAST_VOTE_API = gql`mutation VoteCreation($input: CreateVoteDTO!) {
  VoteCreation(data: $input) {
    vote {
      id
      vote_value
      # hotspot {
      #   id
      #   hotspot_name
      #   coordinates
      #   city
      #   district
      #   street
      #   number
      #   hotspot_status
      #   hotspot_deleted
      #   updatedAt
      #   createdAt
      # }
      vote_deleted
      updatedAt
      createdAt
    }
    message
  }
}`;