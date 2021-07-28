<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# CROWDY - SERVER

We build a user-friendly web-app "crowdedness meter" to help students meet safely in Ghent hotspots. Our ultimate goal is to offer students the opportunity to reclaim the ownership of their reputation, by demonstrating that it is possible to have a social life while respecting government measures. For students, by students.

## Author

- [Eben Ezeer Inganji] (https://www.linkedin.com/in/eben-ezeer-inganji-aa3665127/) (https://gitlab.com/ezer.in) (https://github.com/ezering)

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

## Deployment (SERVER)

To deploy this project run

```bash
  npm run start:prod
```

## API Reference

#### GraphQL Link

```http
  POST localhost:4000/graphql
```

The port depends on the environement the app is using.

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
`TYPEORM_PASSWORD=passoword`
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

## Tech Stack

**Server:** NestJS, Express, GraphQL, TypeORM

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
