import { AppError } from '../utils/AppError.js';

export const validateRequest = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });

  if (error) {
    return next(new AppError(error.details.map((detail) => detail.message).join(', '), 400));
  }

  req[property] = value;
  next();
};