import Joi from 'joi';

export const recordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().trim().min(2).max(100).required(),
  date: Joi.date().required(),
  notes: Joi.string().allow('').max(500).optional()
});

export const recordQuerySchema = Joi.object({
  type: Joi.string().valid('income', 'expense').optional(),
  category: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  sort: Joi.string().valid('latest', 'oldest', 'amountAsc', 'amountDesc').optional()
});