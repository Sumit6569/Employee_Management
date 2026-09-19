import { useEffect, useRef } from 'react';
import httpClient from '../../services/httpClient.ts';
import useNotificationStore from '../../stores/notificationStore.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import type { SSEEvent } from '../../types/sse.ts';

/**
 * Custom React hook establishing a resilient Server-Sent Events (SSE) connection
 * authenticated via the Keycloak single-use ticket pattern.
 * Automatically handles reconnection with exponential backoff and cleanup on unmount.
 */
export function useSSENotifications(): void {
  const { auth } = useAuth();
  const showNotification = useNotificationStore((state) => state.showNotification);
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef<number>(0);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    if (!auth.isAuthenticated) {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      return;
    }

    async function connectSSE(): Promise<void> {
      // Clear any pending reconnect timer
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }

      // Prevent duplicate active connections
      if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
        return;
      }

      try {
        // Request a short-lived single-use ticket using standard Bearer token header
        const ticketRes = await httpClient.post<{
          success: boolean;
          data: { ticket: string };
        }>('/events/ticket', {});

        if (!isMountedRef.current) return;

        const ticket = ticketRes.data?.data?.ticket;
        if (!ticket) {
          throw new Error('Failed to obtain SSE authentication ticket');
        }

        const backendBaseUrl = httpClient.defaults.baseURL || 'http://localhost:8000';
        const sseUrl = `${backendBaseUrl}/events?ticket=${encodeURIComponent(ticket)}`;

        const eventSource = new EventSource(sseUrl);
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
          reconnectAttemptsRef.current = 0; // Reset backoff on successful connection
        };

        const eventTypes: Array<SSEEvent['type']> = [
          'employee-created',
          'employee-updated',
          'report-generated',
          'system-notification',
        ];

        eventTypes.forEach((eventType) => {
          eventSource.addEventListener(eventType, (event: MessageEvent) => {
            try {
              const payload: SSEEvent = JSON.parse(event.data);
              showNotification(payload.message, 'success');
            } catch (err) {
              console.error(`Failed to parse SSE event payload for ${eventType}:`, err);
            }
          });
        });

        eventSource.onerror = () => {
          if (!isMountedRef.current) return;

          // Close broken connection
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }

          // Exponential backoff: 2s, 4s, 8s, 16s, max 30s
          const attempts = reconnectAttemptsRef.current;
          const delay = Math.min(2000 * Math.pow(2, attempts), 30000);
          reconnectAttemptsRef.current += 1;

          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current && auth.isAuthenticated) {
              void connectSSE();
            }
          }, delay);
        };
      } catch {
        if (!isMountedRef.current) return;

        // If ticket exchange failed, schedule retry with backoff
        const attempts = reconnectAttemptsRef.current;
        const delay = Math.min(2000 * Math.pow(2, attempts), 30000);
        reconnectAttemptsRef.current += 1;

        reconnectTimeoutRef.current = setTimeout(() => {
          if (isMountedRef.current && auth.isAuthenticated) {
            void connectSSE();
          }
        }, delay);
      }
    }

    void connectSSE();

    return () => {
      isMountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [auth.isAuthenticated, showNotification]);
}

