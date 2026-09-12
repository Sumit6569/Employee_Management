import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * GET /auth/me
 * Returns authenticated user profile claims from verified JWT.
 */
router.get('/me', authenticate, (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user?.sub,
      username: req.user?.username,
      email: req.user?.email,
      roles: req.user?.roles || [],
    },
  });
});

export default router;
