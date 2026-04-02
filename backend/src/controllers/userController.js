import { getUserById, listUsers, updateUserById } from '../services/userService.js';

export const me = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.json({ status: 'success', data: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await listUsers();
    res.json({ status: 'success', data: users.map((user) => user.toSafeObject()) });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.json({ status: 'success', data: user.toSafeObject() });
  } catch (error) {
    next(error);
  }
};