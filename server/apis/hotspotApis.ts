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
//     "hotspot_name": "Koken House",
//     "coordinates":  [],
//     "city":"",
//     "district": "",
//     "street": "",
//     "number": "",
//     "services":["a19ed3df-e9c3-4dfb-8620-10154bca473f","ecbce8ec-fef8-45c6-8b2a-cfa2b4c8e996","2854972b-58c3-430c-860e-41d38a160e68"],
//     "types":["66b28f29-b7ad-4127-9850-c9697dfacc10","e1b57835-0554-4dd1-ba80-53aaead64def","abf44f4a-be7a-49aa-92b4-453ff5d15816"]
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
//     "hotspot_id": "cac6da75-b902-4254-bb3b-9f8e1dd8f51e",
//     "hotspot_name": "Koken House",
//     "coordinates":  [],
//     "city":"",
//     "district": "",
//     "street": "",
//     "number": "",
//     "services":["a19ed3df-e9c3-4dfb-8620-10154bca473f","ecbce8ec-fef8-45c6-8b2a-cfa2b4c8e996","2854972b-58c3-430c-860e-41d38a160e68"],
//     "types":["66b28f29-b7ad-4127-9850-c9697dfacc10","e1b57835-0554-4dd1-ba80-53aaead64def","abf44f4a-be7a-49aa-92b4-453ff5d15816"]
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
export const ALL_ACTIVE_HOTSPOTS = gql`
  query {
    AllActiveHotspot {
      id
      hotspot_name
      coordinates
      types {
        id
        type_name
        type_deleted
        updatedAt
        createdAt
      }
      services {
        id
        service_name
        service_deleted
        updatedAt
        createdAt
      }
      city
      district
      street
      number
      hotspot_status
      hotspot_deleted
      updatedAt
      createdAt
    }
  }
`;

// ** variables to provide
// ** Expected DATA
// {
//   "data": {
//     "AllActiveHotspot": [
//       {
//         "id": "cac6da75-b902-4254-bb3b-9f8e1dd8f51e",
//         "hotspot_name": "Koken House",
//         "coordinates": [],
//         "types": [
//           {
//             "id": "66b28f29-b7ad-4127-9850-c9697dfacc10",
//             "type_name": "Resto",
//             "type_deleted": false,
//             "updatedAt": "1626354144487",
//             "createdAt": "1626354144487"
//           },
//           {
//             "id": "e1b57835-0554-4dd1-ba80-53aaead64def",
//             "type_name": "Bar",
//             "type_deleted": false,
//             "updatedAt": "1626354149635",
//             "createdAt": "1626354149635"
//           },
//           {
//             "id": "abf44f4a-be7a-49aa-92b4-453ff5d15816",
//             "type_name": "Park",
//             "type_deleted": false,
//             "updatedAt": "1626354138673",
//             "createdAt": "1626354138673"
//           }
//         ],
//         "services": [
//           {
//             "id": "2854972b-58c3-430c-860e-41d38a160e68",
//             "service_name": "Beer thing",
//             "service_deleted": false,
//             "updatedAt": "1626354178247",
//             "createdAt": "1626354178247"
//           },
//           {
//             "id": "ecbce8ec-fef8-45c6-8b2a-cfa2b4c8e996",
//             "service_name": "Yoga stuff",
//             "service_deleted": false,
//             "updatedAt": "1626354161495",
//             "createdAt": "1626354161495"
//           },
//           {
//             "id": "a19ed3df-e9c3-4dfb-8620-10154bca473f",
//             "service_name": "Karate thing",
//             "service_deleted": false,
//             "updatedAt": "1626354170951",
//             "createdAt": "1626354170951"
//           }
//         ],
//         "city": "",
//         "district": "",
//         "street": "",
//         "number": "",
//         "hotspot_status": "active",
//         "hotspot_deleted": false,
//         "updatedAt": "1626354546996",
//         "createdAt": "1626354546996"
//       }
//     ]
//   }
// }

// ** QUERY :: GET SELECTED HOTSPOT
export const GET_SELECTED_HOTSPOT = gql`
  query($id: String!) {
    SelectedHotspot(id: $id) {
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
  }
`;

//** VARIABLES TO PROVIDE
// {
//   "id":"00dbae87-e229-4275-88f2-bc85370c1f2c"
// }

// BLueprint of expected DATA
// {
//   "data": {
//     "SelectedHotspot": {
//       "id": "00dbae87-e229-4275-88f2-bc85370c1f2c",
//       "hotspot_name": "Koken Market",
//       "coordinates": [],
//       "city": "",
//       "district": "",
//       "street": "",
//       "number": "",
//       "hotspot_status": "active",
//       "hotspot_deleted": false,
//       "updatedAt": "1626269070780",
//       "createdAt": "1626269070780"
//     }
//   }
// }
