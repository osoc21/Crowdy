import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Admin } from 'src/entities/admin/admin.entity';

export const createRefreshTokenAdmin = (admin: Admin) => {
  return sign(
    { adminId: admin.id, tokenVersion: admin.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    },
  );
};

export const sendRefreshTokenAdmin = (res: Response, token: any) => {
  res.cookie('jidAdmin', token, {
    sameSite: 'strict',
    httpOnly: true,
  });
};
