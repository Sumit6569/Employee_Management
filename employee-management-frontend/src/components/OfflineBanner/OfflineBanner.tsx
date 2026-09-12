import { useState, useEffect } from 'react';

/**
 * PWA Offline status banner that alerts the user when network connectivity is lost
 * while the static application shell continues operating offline via Service Worker.
 */
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState<boolean>(() => !navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOffline(false);
    }

    function handleOffline() {
      setIsOffline(true);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div
      role="alert"
      className="sticky top-0 z-50 flex items-center justify-between bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300"
    >
      <div className="flex items-center gap-2">
        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636a9 9 0 010 12.728m-3.536-3.536a4 4 0 010-5.656m-7.072 0a4 4 0 010 5.656m-3.536-3.536a9 9 0 010-12.728M12 12h.01"
          />
        </svg>
        <span>
          <strong>Offline Mode:</strong> Network disconnected. Cached application shell is
          operating. API operations require internet connection.
        </span>
      </div>
      <span className="rounded bg-amber-600/60 px-2 py-0.5 text-xs">PWA Active</span>
    </div>
  );
}

export default OfflineBanner;
