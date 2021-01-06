import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import config = require('config');
import jwt = require('jsonwebtoken');

export const DecodedToken = createParamDecorator((ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  if (req.method === 'OPTIONS') {
    throw new HttpException('OPTIONS', HttpStatus.OK);
  }
  const token: string = req.headers.authorization.split(' ')[1];
  if (!token) {
    throw new HttpException('Нет авторизации', HttpStatus.UNAUTHORIZED);
  }
  return jwt.verify(token, config.get('jwtSecret'));
});
