import Prometheus from 'prom-client';
import config from 'config';

// The following sets the default metrics for the application
// as well as adding the application name for all exposed metrics.
const appName = config.get<string>('app.name');
Prometheus.register.setDefaultLabels({
  app: appName,
});

Prometheus.collectDefaultMetrics();
