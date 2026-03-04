import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toast } from './Toast';
import { BackToTop } from './BackToTop';
import { CookieConsent } from './CookieConsent';
import { MobileBottomNav } from './MobileBottomNav';
import { OfflineBanner } from './OfflineBanner';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  useKeyboardShortcuts();
  return (
    <div
      className="min-h-screen w-full flex flex-col pb-16 lg:pb-0"
      style={{
        backgroundColor: 'var(--color-bg)'
      }}>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

        Vai al contenuto principale
      </a>
      <OfflineBanner />
      <Header />
      <div id="main-content" className="flex-1">
        {children}
      </div>
      <Footer />
      <MobileBottomNav />
      <Toast />
      <BackToTop />
      <CookieConsent />
    </div>);

}