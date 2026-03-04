import React, { useEffect, useState } from 'react';
import { ChevronUpIcon } from 'lucide-react';
export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 400);
    }
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  if (!isVisible) return null;
  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-40 w-9 h-9 border border-gray-300 rounded bg-white text-gray-500 hover:border-gray-500 hover:text-gray-800 transition-colors flex items-center justify-center"
      style={{
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        animation: 'toast-in 0.2s ease-out'
      }}
      aria-label="Torna in cima alla pagina">

      <ChevronUpIcon size={16} aria-hidden="true" />
    </button>);

}