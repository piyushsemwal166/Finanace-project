import { AppError } from '../utils/AppError.js';

const sendError = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message || 'Something went wrong'
  });
};

export const notFound = (req, res, next) => next(new AppError(`Not found: ${req.originalUrl}`, 404));

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }

  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate field value: ${JSON.stringify(err.keyValue)}`;
  }

  sendError(err, res);
};