import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { sseService } from '../services/sseService.js';
import { UnauthorizedError, BadRequestError } from '../utils/errors.js';

/**
 * GET /events
 * Establishes an SSE stream. Authenticates via single-use ticket or existing Bearer header.
 */
export async function handleSSEConnection(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // If ticket provided in query parameter, consume it
    const ticketParam = typeof req.query.ticket === 'string' ? req.query.ticket : undefined;
    if (ticketParam) {
      const ticketUser = sseService.consumeTicket(ticketParam);
      if (ticketUser) {
        req.user = ticketUser;
      }
    }

    // Require valid authentication
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required for SSE connection'));
    }

    // Set standard SSE response headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders();

    const clientId = crypto.randomUUID();
    sseService.addClient(clientId, res, req.user);

    // Safe cleanup on client disconnect
    req.on('close', () => {
      sseService.removeClient(clientId);
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /events/ticket
 * Issues a single-use, 30-second ticket for establishing an SSE connection securely.
 */
export function createTicketHandler(req: Request, res: Response, next: NextFunction): void {
  try {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    const ticket = sseService.createTicket(req.user);
    res.status(200).json({
      success: true,
      data: {
        ticket,
        expiresInSeconds: 30,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /events/broadcast
 * Allows administrators to trigger a system-wide notification broadcast.
 */
export function broadcastSystemNotificationHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const { message, data } = req.body;
    if (!message || typeof message !== 'string') {
      return next(new BadRequestError('Notification message is required'));
    }

    sseService.broadcast({
      type: 'system-notification',
      message,
      data,
    });

    res.status(200).json({
      success: true,
      message: 'System notification broadcasted successfully',
      data: {
        recipientsCount: sseService.getConnectedCount(),
      },
    });
  } catch (error) {
    next(error);
  }
}
