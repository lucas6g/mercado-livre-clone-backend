import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../../shared/error/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('you most be login', 401);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const tokenDecodedInfo = verify(token, process.env.JWT_SECRET);

    const { sub } = tokenDecodedInfo as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('invalid jwt token', 401);
  }
}
