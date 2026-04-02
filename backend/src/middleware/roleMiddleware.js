import { AppError } from '../utils/AppError.js';

export const roleMiddleware = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Authentication required', 401));
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(new AppError('Forbidden: insufficient role', 403));
  }

  next();
};