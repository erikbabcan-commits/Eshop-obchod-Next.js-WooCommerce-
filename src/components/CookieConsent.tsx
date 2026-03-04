import React, { useEffect, useState } from 'react';
import { CookieIcon, XIcon } from 'lucide-react';
export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('isteroidi_cookie_consent');
    if (!consent) {
      // Small delay so it doesn't pop up instantly on load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  const handleAcceptAll = () => {
    localStorage.setItem('isteroidi_cookie_consent', 'all');
    setIsVisible(false);
  };
  const handleAcceptEssential = () => {
    localStorage.setItem('isteroidi_cookie_consent', 'essential');
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 p-4 sm:p-6 cubes-overlay-light overflow-hidden"
      style={{
        boxShadow: '0 -4px 16px rgba(0,0,0,0.05)',
        animation: 'toast-in 0.4s ease-out'
      }}>

      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="mt-1 bg-gray-100 p-2 rounded-full flex-shrink-0">
            <CookieIcon
              size={20}
              className="text-gray-600"
              aria-hidden="true" />

          </div>
          <div>
            <h3 className="font-sans font-bold text-gray-900 text-sm mb-1">
              Informativa sui Cookie
            </h3>
            <p className="font-sans text-sm text-gray-600 leading-relaxed">
              Utilizziamo i cookie per migliorare la tua esperienza di
              navigazione, offrirti contenuti personalizzati e analizzare il
              nostro traffico. Cliccando su "Accetta tutti", acconsenti al
              nostro utilizzo dei cookie.{' '}
              <a href="#" className="underline hover:text-gray-900">
                Leggi la Cookie Policy
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-shrink-0">
          <button
            onClick={handleAcceptEssential}
            className="w-full sm:w-auto font-mono text-xs px-4 py-2.5 border border-gray-300 text-gray-600 rounded hover:border-gray-500 hover:text-gray-800 transition-colors whitespace-nowrap">

            Solo essenziali
          </button>
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto font-sans font-semibold text-sm px-6 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors whitespace-nowrap">

            Accetta tutti
          </button>
          <button
            onClick={handleAcceptEssential}
            className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-700"
            aria-label="Chiudi">

            <XIcon size={16} />
          </button>
        </div>
      </div>
    </div>);

}