// src/middleware/errorHandler.js
import { ValidationError } from 'sequelize';

export const errorHandler = (err, req, res, next) => {
  console.error('ERROR STACK:', err);

  // Sequelize validation / unique / not-null errors
  if (err instanceof ValidationError) {
    console.error('SEQUELIZE VALIDATION ERRORS:', err.errors);

    return res.status(400).json({
      success: false,
      message: err.message,
      errors: err.errors.map(e => ({
        message: e.message,
        path: e.path,
        value: e.value,
        type: e.type
      }))
    });
  }

  // Sequelize database errors (NOT NULL, constraint, etc.) often expose `err.original`
  if (err.original) {
    console.error('DB ORIGINAL ERROR:', err.original);
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};
