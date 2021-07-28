# CROWDY - SERVER

We build a user-friendly web-app "crowdedness meter" to help students meet safely in Ghent hotspots. Our ultimate goal is to offer students the opportunity to reclaim the ownership of their reputation, by demonstrating that it is possible to have a social life while respecting government measures. For students, by students.

## Author

- [Eben Ezeer Inganji] (https://www.linkedin.com/in/eben-ezeer-inganji-aa3665127/) (https://gitlab.com/ezer.in) (https://github.com/ezering)

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
`TYPEORM_PASSWORD=285419++`
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

**Server:** NestJS, Express, GraphQL, TypeORM
