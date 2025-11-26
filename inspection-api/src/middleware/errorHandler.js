import { logger } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message || 'Unknown error');

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    // Only expose stack in non-production
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};
