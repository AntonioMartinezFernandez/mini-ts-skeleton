import { Request, Response, NextFunction } from 'express';
import { JWT } from '../../utils/jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = extractToken(req.headers.authorization);
  let tokenData: Record<string, unknown> | null = null;

  if (token) {
    const jwt = new JWT();
    tokenData = jwt.decrypt(token);
  }

  if (tokenData && tokenData.error) {
    res.status(401).send(tokenData);
  }

  if (tokenData && tokenData.payload) {
    req.body.user = {
      data: tokenData.payload,
    };
    next();
  }
}

function extractToken(authHeader: string | undefined): string | null {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    return token;
  } else {
    return null;
  }
}
