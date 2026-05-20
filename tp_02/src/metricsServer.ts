import express from 'express';
import { metricsRouter } from './controllers/metrics';

export const metricsServer = express();
metricsServer.use(metricsRouter);
