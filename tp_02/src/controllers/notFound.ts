import { Request, RequestHandler, Response } from 'express';
import { logger } from '../logger/logger';

export const notFound: RequestHandler = (req: Request, res: Response) => {
  const { originalUrl, path, params } = req;
  logger.error('Route not found', { originalUrl, path, params });
  return res.status(404).json({ message: 'not found', originalUrl, path, params });
};
