import { Request, RequestHandler, Response } from 'express';
import Prometheus from 'prom-client';
import responseTime from 'response-time';

const apiRequestCount = new Prometheus.Counter({
  name: 'api_request_count',
  help: 'Request count per api endpoint',
  labelNames: ['method', 'statusCode', 'endpoint'],
});

const apiRequestDuration = new Prometheus.Histogram({
  name: 'api_request_duration_ms',
  help: 'Request processing duration in ms per api endpoint',
  labelNames: ['method', 'statusCode', 'endpoint'],
  buckets: [5, 10, 25, 50, 100, 250, 500, 1000],
});

const apiResponseLength = new Prometheus.Histogram({
  name: 'api_response_length_bytes',
  help: 'Response content length in bytes per api endpoint',
  labelNames: ['method', 'statusCode', 'endpoint'],
  buckets: [100, 500, 1000, 5000, 10000, 50000],
});

export const apiMetricsMiddleware: RequestHandler = responseTime(
  (req: Request, res: Response, time: number) => {
    const { method, originalUrl } = req;
    const endpoint = normalizePathname(originalUrl);
    const { statusCode } = res;
    const labels = { method, statusCode, endpoint };

    apiRequestCount.inc(labels);
    apiRequestDuration.observe(labels, time);

    const contentLength = parseInt(res.getHeader('content-length') as string, 10);
    if (!isNaN(contentLength)) {
      apiResponseLength.observe(labels, contentLength);
    }
  }
);

export const normalizePathname = (originalUrl: string): string => {
  const url = new URL(originalUrl, 'http://basename');
  const withouthExtraSlash = url.pathname
    .split('/')
    .filter((segment) => segment.length > 0)
    .join('/');
  return `/${withouthExtraSlash}`;
};
