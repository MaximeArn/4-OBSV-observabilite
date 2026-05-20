import winston from 'winston';
import config from 'config';
import LokiTransport from 'winston-loki';

const level = config.get<string>('logLevel');

const consoleTransport = new winston.transports.Console({
  level,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.simple()
  ),
});

const lokiTransport = new LokiTransport({
  level,
  batching: false,
  format: winston.format.simple(),
  host: 'http://localhost:9999',
  onConnectionError: console.error,
});

export const logger = winston.createLogger({
  exitOnError: true,
  transports: [consoleTransport, lokiTransport],
});
