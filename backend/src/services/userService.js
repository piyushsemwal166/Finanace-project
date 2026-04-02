import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export const listUsers = async () => User.find().sort({ createdAt: -1 });

export const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUserById = async (id, payload) => {
  const user = await User.findById(id).select('+password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (payload.password) {
    user.password = await bcrypt.hash(payload.password, 12);
  }

  if (payload.name) user.name = payload.name;
  if (payload.role) user.role = payload.role;
  if (payload.status) user.status = payload.status;

  await user.save();
  return user;
};