import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import OfflineBanner from '../components/OfflineBanner/OfflineBanner.tsx';

describe('OfflineBanner Component (React Testing Library & Jest)', () => {
  beforeEach(() => {
    // Default to online state
    Object.defineProperty(navigator, 'onLine', {
      value: true,
      configurable: true,
    });
  });

  it('renders nothing when browser is online', () => {
    const { container } = render(<OfflineBanner />);
    expect(container.firstChild).toBeNull();
  });

  it('renders offline alert banner when offline event fires', () => {
    render(<OfflineBanner />);

    // Simulate going offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();
    expect(screen.getByText(/Offline Mode:/i)).toBeInTheDocument();
  });

  it('hides the offline alert when connection is restored (online event)', () => {
    render(<OfflineBanner />);

    // Go offline
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByRole('alert')).toBeInTheDocument();

    // Come back online
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});

