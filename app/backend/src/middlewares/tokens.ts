import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

// Now created token auth
export default function token(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    verify(authorization, jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
