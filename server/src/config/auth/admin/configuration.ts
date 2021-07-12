import { registerAs } from '@nestjs/config';

export default registerAs('userAdminConf', () => ({
  name_1: process.env.NAME_1,
  prenom_1: process.env.PRENOM_1,
  email_1: process.env.EMAIL_1,
  password: process.env.PASSWORD,
  role: process.env.ROLE,

  name_2: process.env.NAME_2,
  prenom_2: process.env.PRENOM_2,
  email_2: process.env.EMAIL_2,
}));
