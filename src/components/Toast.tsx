import React, { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  XIcon,
  ShoppingCartIcon,
  HeartIcon,
  AlertCircleIcon,
  InfoIcon } from
'lucide-react';
// Simple global event emitter for toasts since we can't easily change the context right now
type ToastType = 'success' | 'error' | 'info' | 'cart' | 'wishlist';
interface ToastEvent {
  type: ToastType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
class ToastEmitter {
  private listeners: ((event: ToastEvent) => void)[] = [];
  subscribe(listener: (event: ToastEvent) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  emit(event: ToastEvent) {
    this.listeners.forEach((l) => l(event));
  }
}
export const toastEmitter = new ToastEmitter();
// Helper functions to trigger toasts from anywhere
export const toast = {
  success: (title: string, message?: string) =>
  toastEmitter.emit({
    type: 'success',
    title,
    message
  }),
  error: (title: string, message?: string) =>
  toastEmitter.emit({
    type: 'error',
    title,
    message
  }),
  info: (title: string, message?: string) =>
  toastEmitter.emit({
    type: 'info',
    title,
    message
  }),
  cart: (productName: string, price: number, onViewCart: () => void) =>
  toastEmitter.emit({
    type: 'cart',
    title: 'Aggiunto al carrello ✓',
    message: productName,
    action: {
      label: 'Vedi carrello',
      onClick: onViewCart
    }
  }),
  wishlist: (productName: string, isAdded: boolean) =>
  toastEmitter.emit({
    type: 'wishlist',
    title: isAdded ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti',
    message: productName
  })
};
export function Toast() {
  const [toasts, setToasts] = useState<
    (ToastEvent & {
      id: number;
    })[]>(
    []);
  useEffect(() => {
    const unsubscribe = toastEmitter.subscribe((event) => {
      const id = Date.now();
      setToasts((prev) => [
      ...prev,
      {
        ...event,
        id
      }]
      );
      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    });
    return unsubscribe;
  }, []);
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full sm:w-auto px-4 sm:px-0 pointer-events-none">
      {toasts.map((t) =>
      <div
        key={t.id}
        className="bg-white border border-gray-200 rounded p-3.5 flex items-start gap-3 pointer-events-auto"
        style={{
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          animation: 'toast-in 0.25s ease-out'
        }}
        role="status"
        aria-live="polite">

          <div
          className={`w-8 h-8 border rounded flex items-center justify-center flex-shrink-0 ${t.type === 'error' ? 'border-red-200 bg-red-50 text-red-500' : t.type === 'success' || t.type === 'cart' ? 'border-gray-200 bg-gray-50 text-gray-600' : t.type === 'wishlist' ? 'border-pink-200 bg-pink-50 text-pink-500' : 'border-blue-200 bg-blue-50 text-blue-500'}`}>

            {t.type === 'error' && <AlertCircleIcon size={16} />}
            {(t.type === 'success' || t.type === 'cart') &&
          <CheckCircleIcon size={16} />
          }
            {t.type === 'wishlist' &&
          <HeartIcon size={16} className="fill-current" />
          }
            {t.type === 'info' && <InfoIcon size={16} />}
          </div>

          <div className="flex-1 min-w-0">
            <p
            className={`font-mono text-xs mb-0.5 ${t.type === 'error' ? 'text-red-500' : 'text-gray-500'}`}>

              {t.title}
            </p>
            {t.message &&
          <p className="font-sans text-sm font-medium text-gray-800 truncate leading-snug">
                {t.message}
              </p>
          }
            {t.action &&
          <div className="flex items-center gap-3 mt-2">
                <button
              onClick={() => {
                t.action!.onClick();
                removeToast(t.id);
              }}
              className="font-mono text-xs text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">

                  {t.type === 'cart' && <ShoppingCartIcon size={11} />}
                  {t.action.label}
                </button>
              </div>
          }
          </div>

          <button
          onClick={() => removeToast(t.id)}
          className="p-1 text-gray-300 hover:text-gray-600 transition-colors flex-shrink-0"
          aria-label="Chiudi notifica">

            <XIcon size={14} />
          </button>
        </div>
      )}
    </div>);

}