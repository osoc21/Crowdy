import { registerAs } from '@nestjs/config';
export default registerAs('userAuth', () => ({
  env: process.env.APP_ENV,
  jwtSecret: process.env.JWT_SECRET,
  expiresIn: process.env.EXPIRES_IN,
  /* For emails */
  jwtSecretEmail: process.env.JWT_SECRET_AUTH_EMAILS,
  expiresInEmail: process.env.EXPIRES_IN_AUTH_EMAILS,
}));
