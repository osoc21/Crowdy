import { gql } from 'apollo-server-express';

/**
 * HOTSPOT  APIS [Funcs]
 */

// ** Hotspot creation
export const CREATE_HOTSPOT_API = gql`
  mutation HotspotCreation($input: CreateHotSpotDTO!) {
    HotspotCreation(data: $input) {
      hotspot {
        id
        hotspot_name
        coordinates
        city
        district
        street
        number
        hotspot_status
        hotspot_deleted
        updatedAt
        createdAt
      }
      message
    }
  }
`;
