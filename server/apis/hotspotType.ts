import { gql } from 'apollo-server-express';

/**
 * HOTSPOT TYPE  APIS [Funcs]
 */

// ** Hotspot TYPE creation
export const CREATE_HOTSPOT_TYPE_API = gql`
  mutation HotspotTypeCreation($input: CreateHotspotTypeDTO!) {
    HotspotTypeCreation(data: $input) {
      type {
        id
        type_name
        type_deleted
        updatedAt
        createdAt
      }
      message
    }
  }
`;
// ** Variables needed
// {
//   "input": {
//     "type_name": "Park"
//   }
// }

// ** Expected Data in NetWork:: Hotspot TYPE Creation
// {
//   "data": {
//     "HotspotTypeCreation": {
//       "type": {
//         "id": "e3046f9f-43b3-4884-952f-f063c5a7e1db",
//         "type_name": "Park",
//         "type_deleted": false,
//         "updatedAt": "1626267541355",
//         "createdAt": "1626267541355"
//       },
//       "message": "The Hotspot type has been saved!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

/* HOTSPOT UPDATE*/
export const UPDATE_HOTSPOT_TYPE_API = gql`
  mutation HotspotTypeUpdate($input: UpdateHotspotTypeDTO!) {
    HotspotTypeUpdate(data: $input) {
      type {
        id
        type_name
        type_deleted
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
//     "type_id": "e3046f9f-43b3-4884-952f-f063c5a7e1db",
//     "type_name": "Park"
//   }
// }

// ** Expected Data in NetWork:: Hotspot TYPE Update
// {
//   "data": {
//     "HotspotTypeUpdate": {
//       "type": {
//         "id": "e3046f9f-43b3-4884-952f-f063c5a7e1db",
//         "type_name": "Park",
//         "type_deleted": false,
//         "updatedAt": "1626267709455",
//         "createdAt": "1626267541355"
//       },
//       "message": "The Hotspot type has been updated!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT TYPE ARCHIVE
export const ARCHIVE_HOTSPOT_TYPE_API = gql`
  mutation HotspotTypeArchive($input: DeleteHotspotTypeDTO!) {
    HotspotTypeArchive(data: $input) {
      message
    }
  }
`;

// ** Hotspot type archive variables
// {
//   "input": {
//     "type_id": "e3046f9f-43b3-4884-952f-f063c5a7e1db"
//   }
// }

// ** Expected Data
// {
//   "data": {
//     "HotspotTypeArchive": {
//       "message": "The Hotspot type has been archived!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT TYPE RESTORE
export const RESTORE_HOTSPOT_TYPE_API = gql`
  mutation HotspotTypeRestore($input: DeleteHotspotTypeDTO!) {
    HotspotTypeRestore(data: $input) {
      message
    }
  }
`;

// ** Hotspot type restore variables
// {
//   "input": {
//     "type_id": "e3046f9f-43b3-4884-952f-f063c5a7e1db"
//   }
// }

// ** Expected Data
// {
//   "data": {
//     "HotspotTypeRestore": {
//       "message": "The Hotspot type has been restored!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** HOTSPOT TYPE DELETE
export const DELETE_HOTSPOT_TYPE_API = gql`
  mutation HotspotTypeDelete($input: DeleteHotspotTypeDTO!) {
    HotspotTypeDelete(data: $input) {
      message
    }
  }
`;

// ** Hotspot Delete variables
// {
//   "input": {
//     "type_id": "e3046f9f-43b3-4884-952f-f063c5a7e1db"
//   }
// }

// ** Expected Data
// {
//   "data": {
//     "HotspotTypeDelete": {
//       "message": "The Hotspot type has been deleted!"
//     }
//   }
// }

// Admin authentication if needed:  Down below :
// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }
