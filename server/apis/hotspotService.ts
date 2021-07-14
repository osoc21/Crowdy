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
