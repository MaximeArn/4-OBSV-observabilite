import { Request, RequestHandler, Response } from 'express';

export const ok: RequestHandler = (_: Request, res: Response) => {
  const result = { message: 'ok' };
  return res.status(200).json(result);
};
