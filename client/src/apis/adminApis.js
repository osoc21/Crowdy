import { gql } from "@apollo/client";

/**
 * ADMIN  APIS [Funcs]
 */

// ** Admin SignUp
export const ADMIN_SIGNUP_API = gql`
  mutation AdminSignup {
    AdminSignup {
      message
    }
  }
`;

// ** Expected Data in NetWork:: Admin SignUp
// {
//   "data": {
//     "AdminSignup": {
//       "message": "Admin Succesfully created."
//     }
//   }
// }

// ** Admin Login
export const ADMIN_LOGIN_API = gql`
  mutation AdminLogin($input: AdminCredentialsDto!) {
    AdminLogin(data: $input) {
      id
      firstname
      lastname
      fullname
      avatar
      email
      role
      accessToken
    }
  }
`;

// ** Variables for Admin Login
/**
 * 
 * {
  "input": {
    "email": "ebenezeeringanji@gmail.com",
		"password": "Zedix123456"
  }
}
 */

// ** Expected Data From The network :: #Dummy Data
// {
//   "data": {
//     "AdminLogin": {
//       "id": "03e7afd6-525e-4ebd-bcc0-5f973b4e0905",
//       "firstname": "INGANJI",
//       "lastname": "Eben Ezeer",
//       "fullname": "INGANJI Eben Ezeer",
//       "avatar": null,
//       "email": "ebenezeeringanji@gmail.com",
//       "role": "Admin",
//       "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAzZTdhZmQ2LTUyNWUtNGViZC1iY2MwLTVmOTczYjRlMDkwNSIsInVzZXJuYW1lIjoiU0NRQzg0TkkzT2tTIiwidXNlcl9udW1iZXIiOiJaWC1VU1ItSU5FUi00NzQ3MyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTYyNjE2MjQ1NiwiZXhwIjoxNjI2MTY2MDU2fQ.d1yLtcynuLpshMJO_Ha_AnTjG1OpvI8R5YYA1sGoOtw"
//     }
//   }
// }

// ** ADMIN PROFILE
export const ADMIN_PROFILE_API = gql`
  query {
    AdminProfile {
      id
      firstname
      lastname
      fullname
      username
      role
      updatedAt
      createdAt
    }
  }
`;

// ** Expected Data From The network :: #Dummy Data
// {
// {
//   "data": {
//     "AdminProfile": {
//       "id": "03e7afd6-525e-4ebd-bcc0-5f973b4e0905",
//       "firstname": "John",
//       "lastname": "Doe",
//       "fullname": "John Doe",
//       "username": "kSIcIIKGkx1kj",
//       "role": "Admin",
//       "updatedAt": "1626170319571",
//       "createdAt": "1626161485711"
//     }
//   }
// }

// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }

// ** ADMIN ACCOUNT DELETION
export const ADMIN_ACCOUNT_DELETE = gql`
  mutation AdminDeleteAccount {
    AdminDeleteAccount {
      message
    }
  }
`;

// ** Authorization HTTP HEADER MOCKUP
// {
//   "authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5NDA3YzdlLWE5OTAtNDZlNy1hNzQ4LTgyYmE1ZTcyY2I5MyIsInVzZXJuYW1lIjoia1NJSUlLR254MWtqIiwidXNlcl9pZCI6IlpYLVVTUi1JTkVSLTI4MDcyIiwiaWF0IjoxNjI2MTY4NTgxLCJleHAiOjE2MjYxNzIxODF9.JlhE0SEzvmB1rTJEWB_t-H4mPbAK-A6OPG1w16ONdzI"
// }
