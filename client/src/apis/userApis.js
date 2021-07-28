import { gql } from "@apollo/client";
/**
 * USER  APIS [Funcs]
 */

// ** User SignUp
export const USER_SIGNUP_API = gql`
  mutation UserRegister($input: CreateUserDTO!) {
    UserRegister(data: $input) {
      user {
        id
        firstname
        lastname
        fullname
        email
        user_ID
        avatar
      }
      type
      message
    }
  }
`;

// ** Expected Data in NetWork:: User SignUp
// {
//   "data": {
//     "UserRegister": {
//       "user": {
//         "id": "89407c7e-a990-46e7-a748-82ba5e72cb93",
//         "firstname": "Inganji",
//         "lastname": "Eben Ezeer",
//         "fullname": "Inganji Eben Ezeer",
//         "email": "ebenezeeringanji@gmail.com",
//         "user_ID": "ZX-USR-INER-28072",
//         "avatar": null
//       },
//       "type": "success",
//       "message": "User saved successfully."
//     }
//   }
// }

// ** Expected Data From The network :: #Dummy Data
/**
 * {
  "input": {
    "firstname": "Inganji",
    "lastname": "Eben Ezeer",
    "email": "ebenezeeringanji@gmail.com",
    "password": "Zedix123456"
  }
}
 */

// ** USER LOGIN
export const USER_LOGIN_API = gql`
  mutation UserLogin($input: UserCredentialsDto!) {
    UserLogin(data: $input) {
      id
      firstname
      lastname
      fullname
      avatar
      email
      role
      createdAt
      accessToken
    }
  }
`;

// ** Variables for User Login
/**
 * 
 * {
  "input": {
    "email": "ebenezeeringanji@gmail.com",
    "password": "Zedix123456"
  }
}
 */

// ** Expected Data in NetWork:: User Login
// {
//   "data": {
//     "UserLogin": {
//       "id": "89407c7e-a990-46e7-a748-82ba5e72cb93",
//       "firstname": "Inganji",
//       "lastname": "Eben Ezeer",
//       "fullname": "Inganji Eben Ezeer",
//       "avatar": null,
//       "email": "ebenezeeringanji@gmail.com",
//       "role": "student",
//       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4MTYzLCJleHAiOjE2MjYxNzE3NjN9.rR1mj24BRMLH8hY17r2Cd48-r4oB9HyoZdB2UZWmfBk"
//     }
//   }
// }

// ** User Update Info
export const USER_UPDATE_INFO_API = gql`
  mutation UserUpdateInfo($input: UpdateUserDTO!) {
    UserUpdateInfo(data: $input) {
      user {
        id
        firstname
        lastname
        fullname
        avatar
        user_ID
        username
      }
      type
      message
    }
  }
`;

// ** Variables for User Update Info
/**
 * 
 * {
  "input": {
    "firstname": "John", 
    "lastname": "Smith"
  }
}
 */

// ** Expected Data in NetWork:: User Login
// {
//   "data": {
//     "UserUpdateInfo": {
//       "user": {
//         "id": "89407c7e-a990-46e7-a748-82ba5e72cb93",
//         "firstname": "John",
//         "lastname": "Smith",
//         "fullname": "Inganji Eben Ezeer",
//         "avatar": null,
//         "user_ID": "ZX-USR-INER-28072",
//         "username": "kSIIIKGnx1kj"
//       },
//       "type": "success",
//       "message": "User Information up-to-date."
//     }
//   }
// }

// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** USER PROFILE
export const USER_PROFILE_API = gql`
  query {
    UserProfile {
      id
      firstname
      lastname
      fullname
      user_ID
      username
      role
      updatedAt
      createdAt
    }
  }
`;

// ** Expected Data in NetWork:: User Profile
// {
//   "data": {
//     "UserProfile": {
//       "id": "89407c7e-a990-46e7-a748-82ba5e72cb93",
//       "firstname": "John",
//       "lastname": "Smith",
//       "fullname": "Inganji Eben Ezeer",
//       "user_ID": "ZX-USR-INER-28072",
//       "username": "kSIIIKGnx1kj",
//       "role": "student",
//       "updatedAt": "1626168651514",
//       "createdAt": "1626167822132"
//     }
//   }
// }

// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** USER LIST
export const USER_LIST_API = gql`
  query {
    UsersList {
      id
      firstname
      lastname
      fullname
      user_ID
      username
      role
      updatedAt
      createdAt
    }
  }
`;

// ** Expected Data in NetWork:: Users List
// {
//   "data": {
//     "UsersList": [
//       {
//         "id": "89407c7e-a990-46e7-a748-82ba5e72cb93",
//         "firstname": "John",
//         "lastname": "Smith",
//         "fullname": "Inganji Eben Ezeer",
//         "user_ID": "ZX-USR-INER-28072",
//         "username": "kSIIIKGnx1kj",
//         "role": "student",
//         "updatedAt": "1626168651514",
//         "createdAt": "1626167822132"
//       }
//     ]
//   }
// }

// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }
