import config from 'config';
import { logger } from './logger/logger';
import { apiServer } from './apiServer';
import './metrics/appMetrics'; // Initializes default metrics
import { metricsServer } from './metricsServer';

// launch Api server
const port = config.get<number>('api.port');
apiServer.listen(port, () => {
  logger.info('Api server started', { port });
});

// launch Metrics server on a dedicated port
const metricsPort = config.get<number>('monitoring.metrics.port');
metricsServer.listen(metricsPort, () => {
  logger.info('Metrics server started', { port: metricsPort });
});
