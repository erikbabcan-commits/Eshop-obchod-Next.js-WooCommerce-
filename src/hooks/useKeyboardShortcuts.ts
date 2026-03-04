import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useKeyboardShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (
      document.activeElement?.tagName === 'INPUT' ||
      document.activeElement?.tagName === 'TEXTAREA' ||
      document.activeElement?.tagName === 'SELECT')
      {
        // Allow Escape to blur inputs
        if (e.key === 'Escape') {
          ;(document.activeElement as HTMLElement).blur();
        }
        return;
      }

      // '/' to focus search or go to search page
      if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="search"]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        } else {
          navigate('/search');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);
}