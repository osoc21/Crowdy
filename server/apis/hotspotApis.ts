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
// ** Variables
// {
//   "input": {
//     "hotspot_name": "Koken Market",
//     "hotspot_coordinates":  [],
//     "city":"",
//     "district": "",
//     "street": "",
//     "number": ""
//   }
// }

// ** Expected Data in NetWork:: Hotspot Creation
// {
//   "data": {
//     "HotspotCreation": {
//       "hotspot": {
//         "id": "feee3055-8fbd-4c92-a794-9cad3d5e0147",
//         "hotspot_name": "Koken Market",
//         "coordinates": [],
//         "city": "",
//         "district": "",
//         "street": "",
//         "number": "",
//         "hotspot_status": "active",
//         "hotspot_deleted": false,
//         "updatedAt": "1626265742624",
//         "createdAt": "1626265742624"
//       },
//       "message": "The Hotspot has been saved!"
//     }
//   }
// }
// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

/* HOTSPOT UPDATE*/
export const UPDATE_HOTSPOT_API = gql`
  mutation HotspotUpdate($input: UpdateHotspotDTO!) {
    HotspotUpdate(data: $input) {
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
// ** Variables
// {
//   "input": {
//     "hotspot_id": "feee3055-8fbd-4c92-a794-9cad3d5e0147",
//     "hotspot_name": "Koken Market",
//     "hotspot_coordinates":  [],
//     "city":"",
//     "district": "",
//     "street": "",
//     "number": ""
//   }
// }

// ** Expected Data in NetWork:: Hotspot Update
// {
//   "data": {
//     "HotspotUpdate": {
//       "hotspot": {
//         "id": "feee3055-8fbd-4c92-a794-9cad3d5e0147",
//         "hotspot_name": "Koken Market",
//         "coordinates": [],
//         "city": "",
//         "district": "",
//         "street": "",
//         "number": "",
//         "hotspot_status": "active",
//         "hotspot_deleted": false,
//         "updatedAt": "1626266516083",
//         "createdAt": "1626265742624"
//       },
//       "message": "The Hotspot has been updated!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT ARCHIVE
export const ARCHIVE_HOTSPOT_API = gql`
  mutation HotspotArchive($input: DeleteHotspotDTO!) {
    HotspotArchive(data: $input) {
      message
    }
  }
`;

// ** Hotspot archive variables
// {"input": {"hotspot_id": "feee3055-8fbd-4c92-a794-9cad3d5e0147"}}

// ** Expected Data
// {
//   "data": {
//     "HotspotArchive": {
//       "message": "The Hotspot has been archived!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT RESTORE
export const RESTORE_HOTSPOT_API = gql`
  mutation HotSpotRestore($input: DeleteHotspotDTO!) {
    HotSpotRestore(data: $input) {
      message
    }
  }
`;

// ** Hotspot restore variables
// {"input": {"hotspot_id": "feee3055-8fbd-4c92-a794-9cad3d5e0147"}}

// ** Expected Data
// {
//   "data": {
//     "HotSpotRestore": {
//       "message": "The Hotspot has been restored!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT DELETE
export const DELETE_HOTSPOT_API = gql`
  mutation HotspotDelete($input: DeleteHotspotDTO!) {
    HotspotDelete(data: $input) {
      message
    }
  }
`;

// ** Hotspot Delete variables
// {"input": {"hotspot_id": "feee3055-8fbd-4c92-a794-9cad3d5e0147"}}

// ** Expected Data
// {
//   "data": {
//     "HotspotDelete": {
//       "message": "The Hotspot has been deleted!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }
