import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/rbacMiddleware.js';
import { getReportsHandler } from '../controllers/reportController.js';

const router = Router();

router.get('/', authenticate, requireRole('admin', 'manager'), getReportsHandler);

export default router;
