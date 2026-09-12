import crypto from 'crypto';
import { Response } from 'express';
import { ConnectedClient, SSEEvent } from '../types/sse.js';
import { AuthenticatedUser } from '../types/auth.js';

interface SSETicket {
  user: AuthenticatedUser;
  expiresAt: number;
}

class SSEService {
  private clients: Map<string, ConnectedClient> = new Map();
  private tickets: Map<string, SSETicket> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startHeartbeat();
    this.startTicketCleanup();
  }

  /**
   * Generates a secure, short-lived (30s) single-use ticket for establishing an SSE connection.
   */
  public createTicket(user: AuthenticatedUser): string {
    const ticket = crypto.randomUUID();
    const expiresAt = Date.now() + 30 * 1000; // 30 seconds TTL
    this.tickets.set(ticket, { user, expiresAt });
    return ticket;
  }

  /**
   * Validates and immediately burns a single-use ticket (preventing replay attacks).
   */
  public consumeTicket(ticket: string): AuthenticatedUser | null {
    const record = this.tickets.get(ticket);
    if (!record) {
      return null;
    }

    // Burn ticket immediately
    this.tickets.delete(ticket);

    if (Date.now() > record.expiresAt) {
      return null;
    }

    return record.user;
  }

  /**
   * Registers an active client connection and sends the initial connected greeting.
   */
  public addClient(id: string, res: Response, user: AuthenticatedUser): void {
    const client: ConnectedClient = {
      id,
      res,
      user,
      connectedAt: new Date(),
    };

    this.clients.set(id, client);

    // Initial handshake event
    this.sendToClient(client, {
      type: 'connected',
      message: 'Connected to real-time notification stream',
      data: { clientId: id, username: user.username },
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Safely removes a disconnected client and terminates the connection if open.
   */
  public removeClient(id: string): void {
    const client = this.clients.get(id);
    if (client) {
      this.clients.delete(id);
      try {
        if (!client.res.writableEnded) {
          client.res.end();
        }
      } catch (_err) {
        // Ignored
      }
    }
  }

  /**
   * Broadcasts an event to all currently connected clients.
   */
  public broadcast(eventData: Omit<SSEEvent, 'timestamp'>): void {
    const fullEvent: SSEEvent = {
      ...eventData,
      timestamp: new Date().toISOString(),
    };

    for (const client of this.clients.values()) {
      this.sendToClient(client, fullEvent);
    }
  }

  /**
   * Formats and writes an SSE event payload following the W3C EventSource specification.
   */
  private sendToClient(client: ConnectedClient, event: SSEEvent): void {
    try {
      if (client.res.writableEnded) {
        this.removeClient(client.id);
        return;
      }

      client.res.write(`event: ${event.type}\n`);
      client.res.write(`data: ${JSON.stringify(event)}\n\n`);
    } catch (_err) {
      this.removeClient(client.id);
    }
  }

  /**
   * Returns current count of connected clients.
   */
  public getConnectedCount(): number {
    return this.clients.size;
  }

  /**
   * Periodic heartbeat every 25 seconds to keep HTTP connections alive through proxies and NAT gateways.
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      for (const [id, client] of this.clients.entries()) {
        try {
          if (client.res.writableEnded) {
            this.removeClient(id);
          } else {
            client.res.write(': heartbeat\n\n');
          }
        } catch (_err) {
          this.removeClient(id);
        }
      }
    }, 25000);

    if (this.heartbeatInterval.unref) {
      this.heartbeatInterval.unref();
    }
  }

  /**
   * Cleans up expired tickets every 60 seconds.
   */
  private startTicketCleanup(): void {
    const interval = setInterval(() => {
      const now = Date.now();
      for (const [ticket, record] of this.tickets.entries()) {
        if (now > record.expiresAt) {
          this.tickets.delete(ticket);
        }
      }
    }, 60000);

    if (interval.unref) {
      interval.unref();
    }
  }
}

export const sseService = new SSEService();
