import { Router } from 'express';
import { getUsers, me, updateUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { updateUserSchema } from '../validators/userValidators.js';

const router = Router();

router.get('/me', authMiddleware, me);
router.get('/', authMiddleware, roleMiddleware('Admin'), getUsers);
router.patch('/:id', authMiddleware, roleMiddleware('Admin'), validateRequest(updateUserSchema), updateUser);

export default router;