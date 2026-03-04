import React, { useEffect, useState } from 'react';
import { WifiOffIcon } from 'lucide-react';
export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  if (!isOffline) return null;
  return (
    <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-center gap-2 sticky top-0 z-50">
      <WifiOffIcon size={14} />
      <span className="font-mono text-xs">
        Sei offline. Alcune funzionalità potrebbero non essere disponibili.
      </span>
    </div>);

}