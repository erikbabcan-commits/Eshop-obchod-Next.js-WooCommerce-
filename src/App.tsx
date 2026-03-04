import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { BrandsPage } from './pages/BrandsPage';
import { BrandPage } from './pages/BrandPage';
import { SearchPage } from './pages/SearchPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
const IS_PRODUCTION =
typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';
// Lazy-load dashboard — keeps infrastructureStore, adminStore, and all
// dashboard panels out of the main bundle. Only loaded when an admin
// navigates to /dashboard.
const LazyDashboardPage = lazy(() =>
import('./pages/DashboardPage').then((m) => ({
  default: m.DashboardPage
}))
);
// Lazy-load test runner (dev only)
const LazyTestRunnerPage = lazy(() =>
import('./pages/TestRunnerPage').then((m) => ({
  default: m.TestRunnerPage
}))
);
function SuspenseFallback() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: 'var(--color-bg)'
      }}>

      <div className="text-center">
        <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
          <span className="font-mono text-xs text-gray-400">···</span>
        </div>
        <p className="font-mono text-xs text-gray-400">Caricamento...</p>
      </div>
    </div>);

}
export function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Suspense fallback={<SuspenseFallback />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:slug" element={<CategoryPage />} />
                    <Route path="/product/:slug" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/brands" element={<BrandsPage />} />
                    <Route path="/brand/:slug" element={<BrandPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPasswordPage />} />

                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/privacy" element={<PrivacyPolicyPage />} />
                    <Route
                      path="/cookie-policy"
                      element={<CookiePolicyPage />} />

                    <Route path="/termini" element={<TermsPage />} />
                    <Route path="/disclaimer" element={<DisclaimerPage />} />
                    <Route
                      path="/order-confirmation"
                      element={<OrderConfirmationPage />} />

                    {!IS_PRODUCTION &&
                    <Route path="/tests" element={<LazyTestRunnerPage />} />
                    }
                    <Route
                      path="/dashboard/*"
                      element={<LazyDashboardPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </Suspense>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>);

}