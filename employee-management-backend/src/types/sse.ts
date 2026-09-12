import { Response } from 'express';
import { AuthenticatedUser } from './auth.js';

export type SSEEventType =
  | 'employee-created'
  | 'employee-updated'
  | 'report-generated'
  | 'system-notification'
  | 'connected'
  | 'heartbeat';

export interface SSEEvent<T = unknown> {
  type: SSEEventType;
  message: string;
  data?: T;
  timestamp: string;
}

export interface ConnectedClient {
  id: string;
  res: Response;
  user: AuthenticatedUser;
  connectedAt: Date;
}
