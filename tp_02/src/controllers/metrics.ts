import { Request, RequestHandler, Response, Router } from 'express';
import Prometheus from 'prom-client';

const metricsController: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const metrics = await Prometheus.register.metrics();
    res.contentType(Prometheus.register.contentType);

    return res.send(metrics);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const metricsRouter = Router();
metricsRouter.get('/metrics', metricsController);
