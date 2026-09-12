import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/rbacMiddleware.js';
import {
  getAllEmployees,
  getOneEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', authenticate, requireRole('admin', 'manager'), getAllEmployees);

router.get('/:id', authenticate, requireRole('admin', 'manager'), getOneEmployee);

router.post('/', authenticate, requireRole('admin', 'manager'), addEmployee);

router.put('/:id', authenticate, requireRole('admin', 'manager'), editEmployee);

router.delete('/:id', authenticate, requireRole('admin', 'manager'), removeEmployee);

export default router;
