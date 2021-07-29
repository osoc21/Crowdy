![Crowdy Logo](/docs/img/crowdy-logo.svg)

# CROWDY

We build a user-friendly web-app "crowdedness meter" to help students meet safely in Ghent hotspots. Our ultimate goal is to offer students the opportunity to reclaim the ownership of their reputation, by demonstrating that it is possible to have a social life while respecting government measures. For students, by students.

[The Project](https://crowdy-osoc.herokuapp.com/)

[GitHub Page](https://osoc21.github.io/Crowdy/)


## Authors

- [Eben Ezeer Inganji] (https://www.linkedin.com/in/eben-ezeer-inganji-aa3665127/) (https://gitlab.com/ezer.in) (https://github.com/ezering)
- [Loeka Wyseure] (https://www.devine-creations.be/)
- [Kaj De Muynck] (http://kajdemuynck.be/)
- [Eléna Lefèbvre] (https://www.linkedin.com/in/el%C3%A9na-lef%C3%A8bvre-869625130/)


## Features

- List of hotspots
- Hotspots info page (amenities, crowdedness, location)
- Map of hotspots
- QR code scanner
- Vote system
- Account system
- Profile page




  ## Color Reference

| Color             | Hex    |
| ----------------- | ------ |
| Indigo | ![#4d4bc0](https://via.placeholder.com/10/4d4bc0?text=+) #4d4bc0 |
| Aquamarine | ![#4dfff0](https://via.placeholder.com/10/4dfff0?text=+) #4dfff0 |
| Rajah | ![#f8bb84](https://via.placeholder.com/10/f8bb84?text=+) #f8bb84 |
| Electric Violet | ![#b02aff](https://via.placeholder.com/10/b02aff?text=+) #b02aff |


## Screenshots

![Crowdy Logo](/docs/img/crowdy-map-s.png)
![Crowdy Logo](/docs/img/crowdy-report-s.png)
![Crowdy Logo](/docs/img/crowdy-hotspot-details-s.png)


## Deployment (CLIENT)

To deploy this project run

```bash
  npm run build
```


## Environment Variables (CLIENT)

To run this project, you will need to add the following environment variables to your .env.local file


### Local env

The base URL of the QR-codes that the scanner will receive (to check if the scanned code is from Crowdy):

`REACT_APP_BASE_URL=https://crowdy-osoc.herokuapp.com/`

The URL of the backend server:

`REACT_APP_SERVER_BACKEND=https://crowdy-server-backend.herokuapp.com/graphql`

Your Access Token of the Mapbox-service to display the map:

`REACT_APP_MAPBOX_ACCESS_TOKEN={YOUR_ACCESS_TOKEN}`

Your Access Token of the Mapbox-style to add a visual look:

`REACT_APP_MAPBOX_ACCESS_TOKEN_STYLE={YOUR_ACCESS_TOKEN}`

*You can acquire access tokens for Mapbox [here](https://docs.mapbox.com/help/getting-started/access-tokens/).*


## Run Locally (CLIENT)

Clone the project

```bash
  git clone https://github.com/osoc21/Crowdy.git
```

Go to the project directory

```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run start
```


## API Reference

#### GraphQL Link

```http
  POST localhost:4000/graphql
```

The port depends on the environement the app is using.


## Deployment (SERVER)

To deploy this project run

```bash
  npm run start:prod
```

  
## Environment Variables (SERVER)

To run this project, you will need to add the following environment variables to your .env file

### Local env
`NODE_ENV=development`
`APP_PORT=4000`
`PORT=4000`

### Database
`TYPEORM_TYPE=postgres`
`TYPEORM_URL=postgres://postgres:password@127.0.0.1:5432/database_name`
`TYPEORM_USERNAME=postgres`
`TYPEORM_PASSWORD=password`
`TYPEORM_NAME=database_name`
`TYPEORM_PORT=5432`
`TYPEORM_HOST=127.0.0.1`
`TYPEORM_SSL = true`
`TYPEORM_LOGGING=false`
`TYPEORM_SYNCRONIZE=true`
`TYPEORM_AUTO_LOAD_ENTITIES=true`
`TYPEORM_DRIVER_EXTRA={ssl :{rejectUnauthorized: false}}`

### Json web token
`JWT_SECRET=very_secret_string`
`EXPIRES_IN=time(like 1h)`

It's better if you create in the root directory `.development.env` and `.production.env` and place the environment variables respectively.



  


    
## Run Locally (SERVER)

Clone the project

```bash
  git clone https://github.com/osoc21/Crowdy.git
```

Go to the project directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
  
## Tech Stack

**Client:** React, React Router, React QR Reader, React Map GL

**Server:** NestJS, Express, GraphQL, TypeORM

