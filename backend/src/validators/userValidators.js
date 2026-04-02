import Joi from 'joi';

export const updateUserSchema = Joi.object({
  role: Joi.string().valid('Viewer', 'Analyst', 'Admin').required(),
  status: Joi.string().valid('active', 'inactive').required()
});