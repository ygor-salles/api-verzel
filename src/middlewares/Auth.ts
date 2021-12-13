import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { ApiError } from '../validators/Exceptions/ApiError';

require('dotenv').config();

interface IPayload {
  sub: string;
}

export function Auth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new ApiError(401);
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;
    request.userId = sub;

    return next();
  } catch (error) {
    throw new ApiError(401);
  }
}
