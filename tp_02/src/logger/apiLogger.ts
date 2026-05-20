import morgan from 'morgan';
import { logger } from './logger';

const statusCodePattern = /"[^"]*"\s+(\d{3})\s+/;

const write = (message: string): void => {
  const match = statusCodePattern.exec(message);
  const status = match ? parseInt(match[1], 10) : 0;
  const logMethod = status >= 400 ? 'error' : 'info';
  logger[logMethod](message.trim());
};

export const apiLogger = morgan('common', {
  stream: { write },
});
