import { registerAs } from '@nestjs/config';

export default registerAs('typeOrm', () => ({
  env: process.env.APP_ENV,
  database: {
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_NAME,
    ssl: process.env.TYPEORM_SSL,
    // url: process.env.TYPEORM_URL,
    autoLoadEntities: Boolean(process.env.TYPEORM_AUTO_LOAD_ENTITIES),
    synchronize: Boolean(process.env.TYPEORM_SYNCRONIZE),
    logging: Boolean(process.env.TYPEORM_LOGGING),
    logger: 'file',
  },
}));
