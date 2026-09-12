import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/rbacMiddleware.js';
import {
  handleSSEConnection,
  createTicketHandler,
  broadcastSystemNotificationHandler,
} from '../controllers/sseController.js';

const router = Router();

// Middleware to support either ticket-based authentication OR standard Bearer token header
function authenticateSSE(req: Request, res: Response, next: NextFunction): void {
  if (req.query.ticket) {
    // Ticket provided; handleSSEConnection will consume and validate it
    return next();
  }
  // Otherwise verify Bearer token in headers
  authenticate(req, res, next);
}

// GET /events - Establish SSE connection stream
router.get('/', authenticateSSE, handleSSEConnection);

// POST /events/ticket - Generate short-lived (30s) single-use ticket for browser EventSource
router.post('/ticket', authenticate, createTicketHandler);

// POST /events/broadcast - Admin broadcast of system notifications
router.post('/broadcast', authenticate, requireRole('admin'), broadcastSystemNotificationHandler);

export default router;
