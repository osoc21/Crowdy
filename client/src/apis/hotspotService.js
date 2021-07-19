import { gql } from 'apollo-server-express';

/**
 * HOTSPOT  APIS [Funcs]
 */

// ** Hotspot Service creation
export const CREATE_HOTSPOT_SERVICE_API = gql`
  mutation HotspotCreationService($input: CreateHotSpotServiceDTO!) {
    HotspotCreationService(data: $input) {
      hotspotService {
        id
        service_name
        service_deleted
        updatedAt
        createdAt
      }
      message
    }
  }
`;
// ** Variables
// {
//   "input": {
//     "service_name":"toilettes"
//   }
// }

// ** Expected Data in NetWork:: Hotspot service Creation
// {
//   "data": {
//     "HotspotCreationService": {
//       "hotspotService": {
//         "id": "8a180177-bdc0-4c50-8f49-563d22ffb41b",
//         "service_name": "toilettes",
//         "service_deleted": false,
//         "updatedAt": "1626268341945",
//         "createdAt": "1626268341945"
//       },
//       "message": "The Hotspot Service has been saved!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

/* HOTSPOT SERVICE UPDATE*/
export const UPDATE_HOTSPOT_SERVICE_API = gql`
  mutation HotspotServiceUpdate($input: HotspotServiceUpdateDTO!) {
    HotspotServiceUpdate(data: $input) {
      hotspotService {
        id
        service_name
        service_deleted
        updatedAt
        createdAt
      }
      message
    }
  }
`;
// ** Variables
// {
//   "input": {
//     "service_id": "8a180177-bdc0-4c50-8f49-563d22ffb41b",
//     "service_name":"Drinks"
//   }
// }

// ** Expected Data in NetWork:: Hotspot Update Service
// {
//   "data": {
//     "HotspotServiceUpdate": {
//       "hotspotService": {
//         "id": "8a180177-bdc0-4c50-8f49-563d22ffb41b",
//         "service_name": "Drinks",
//         "service_deleted": false,
//         "updatedAt": "1626268498121",
//         "createdAt": "1626268341945"
//       },
//       "message": "The Hotspot Service has been updated!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT SERVICE ARCHIVE
export const ARCHIVE_HOTSPOT_SERVICE_API = gql`
  mutation HotspotServiceArchive($input: DeleteHotspotServiceDTO!) {
    HotspotServiceArchive(data: $input) {
      message
    }
  }
`;

// ** Hotspot archive Service variables
// {
//   "input": {
//     "service_id": "8a180177-bdc0-4c50-8f49-563d22ffb41b"
//   }
// }

// ** Expected Data
// {
//   "data": {
//     "HotspotServiceArchive": {
//       "message": "The Hotspot Service has been archived!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT SERVICE RESTORE
export const RESTORE_HOTSPOT_SERVICE_API = gql`
  mutation HotSpotServiceRestore($input: DeleteHotspotServiceDTO!) {
    HotSpotServiceRestore(data: $input) {
      message
    }
  }
`;

// ** Hotspot restore services variables
// {"input": {"hotspot_id": "feee3055-8fbd-4c92-a794-9cad3d5e0147"}}

// ** Expected Data
// {
//   "data": {
//     "HotSpotServiceRestore": {
//       "message": "The Hotspot Service has been restored!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT SERVICE DELETE
export const DELETE_HOTSPOT_SERVICE_API = gql`
  mutation HotspotServiceDelete($input: DeleteHotspotServiceDTO!) {
    HotspotServiceDelete(data: $input) {
      message
    }
  }
`;

// ** Hotspot Delete Service variables
// {"input": {"hotspot_id": "feee3055-8fbd-4c92-a794-9cad3d5e0147"}}

// ** Expected Data
// {
//   "data": {
//     "HotspotServiceDelete": {
//       "message": "The Hotspot Service has been deleted!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

/**
 * ********************************************************************************************************************************************************************************************************************************************
 * ********************************************************************************************************************************************************************************************************************************************
 */
/**
 *  THIS PART IS FOR QUERIES ONLY
 */

/**
 * ********************************************************************************************************************************************************************************************************************************************
 * ********************************************************************************************************************************************************************************************************************************************
 */

// ** QUERY :: ALL ACTIVE HOTSPOT
export const ALL_ACTIVE_HOTSPOTS_SERVICES = gql`
  query {
    AllActiveHotspotServices {
      id
      service_name
      hotSpots {
        id
        hotspot_name
        coordinates
        district
        street
        number
        hotspot_status
        hotspot_deleted
        updatedAt
        createdAt
      }
      service_deleted
      updatedAt
      createdAt
    }
  }
`;

// ** NO variables to provide
// ** Expected DATA
// {
//   "data": {
//     "AllActiveHotspotServices": [
//       {
//         "id": "a19ed3df-e9c3-4dfb-8620-10154bca473f",
//         "service_name": "Karate thing",
//         "hotSpots": [
//           {
//             "id": "cac6da75-b902-4254-bb3b-9f8e1dd8f51e",
//             "hotspot_name": "Koken House",
//             "coordinates": [],
//             "district": "",
//             "street": "",
//             "number": "",
//             "hotspot_status": "active",
//             "hotspot_deleted": false,
//             "updatedAt": "1626354546996",
//             "createdAt": "1626354546996"
//           }
//         ],
//         "service_deleted": false,
//         "updatedAt": "1626354170951",
//         "createdAt": "1626354170951"
//       },
//       {
//         "id": "ecbce8ec-fef8-45c6-8b2a-cfa2b4c8e996",
//         "service_name": "Yoga stuff",
//         "hotSpots": [
//           {
//             "id": "cac6da75-b902-4254-bb3b-9f8e1dd8f51e",
//             "hotspot_name": "Koken House",
//             "coordinates": [],
//             "district": "",
//             "street": "",
//             "number": "",
//             "hotspot_status": "active",
//             "hotspot_deleted": false,
//             "updatedAt": "1626354546996",
//             "createdAt": "1626354546996"
//           }
//         ],
//         "service_deleted": false,
//         "updatedAt": "1626354161495",
//         "createdAt": "1626354161495"
//       },
//       {
//         "id": "2854972b-58c3-430c-860e-41d38a160e68",
//         "service_name": "Beer thing",
//         "hotSpots": [
//           {
//             "id": "cac6da75-b902-4254-bb3b-9f8e1dd8f51e",
//             "hotspot_name": "Koken House",
//             "coordinates": [],
//             "district": "",
//             "street": "",
//             "number": "",
//             "hotspot_status": "active",
//             "hotspot_deleted": false,
//             "updatedAt": "1626354546996",
//             "createdAt": "1626354546996"
//           }
//         ],
//         "service_deleted": false,
//         "updatedAt": "1626354178247",
//         "createdAt": "1626354178247"
//       }
//     ]
//   }
// }

// ** QUERY :: GET SELECTED HOTSPOT
export const GET_SELECTED_HOTSPOT_SERVICE = gql`
  query($id: String!) {
    SelectedHotspotService(id: $id) {
      id
      service_name
      service_deleted
      updatedAt
      createdAt
    }
  }
`;

//** VARIABLES TO PROVIDE
// {
//   "id":"1b2d9093-3bf3-4086-aa26-4f8510af7ba2"
// }

// BLueprint of expected DATA
// {
//   "data": {
//     "SelectedHotspotService": {
//       "id": "1b2d9093-3bf3-4086-aa26-4f8510af7ba2",
//       "service_name": "Sthg cool",
//       "service_deleted": false,
//       "updatedAt": "1626271175601",
//       "createdAt": "1626271175601"
//     }
//   }
// }
