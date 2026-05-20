import express from 'express';
import { api } from './app';
import { apiMetricsMiddleware } from './metrics/apiMetrics';
import { apiLogger } from './logger/apiLogger';

export const apiServer = express();

apiServer.use(express.urlencoded({ extended: true }));
apiServer.use(express.text());
apiServer.use(express.json({ strict: true }));
apiServer.use(apiMetricsMiddleware); // Collects api usage metrics
apiServer.use(apiLogger); // Generates api request logs
apiServer.use(api);
