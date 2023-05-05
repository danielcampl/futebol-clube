import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/ApiError';

// NEW ERROR
const Errors = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default Errors;
