import { Router } from 'express';
import { addRecord, editRecord, getRecords, removeRecord } from '../controllers/recordController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { recordQuerySchema, recordSchema } from '../validators/recordValidators.js';

const router = Router();

router.get('/', authMiddleware, roleMiddleware('Analyst', 'Admin'), validateRequest(recordQuerySchema, 'query'), getRecords);
router.post('/', authMiddleware, roleMiddleware('Admin'), validateRequest(recordSchema), addRecord);
router.put('/:id', authMiddleware, roleMiddleware('Admin'), validateRequest(recordSchema), editRecord);
router.delete('/:id', authMiddleware, roleMiddleware('Admin'), removeRecord);

export default router;