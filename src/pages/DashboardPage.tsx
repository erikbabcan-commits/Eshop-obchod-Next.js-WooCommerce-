import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardOverview } from '../components/dashboard/DashboardOverview';
import { OrdersPanel } from '../components/dashboard/OrdersPanel';
import { CustomersPanel } from '../components/dashboard/CustomersPanel';
import { ProductsPanel } from '../components/dashboard/ProductsPanel';
import { PluginsPanel } from '../components/dashboard/PluginsPanel';
import { SettingsPanel } from '../components/dashboard/SettingsPanel';
import { InfrastructurePanel } from '../components/dashboard/InfrastructurePanel';
import { DatabasePanel } from '../components/dashboard/DatabasePanel';
import { DeploymentPanel } from '../components/dashboard/DeploymentPanel';
import { EnvironmentPanel } from '../components/dashboard/EnvironmentPanel';
import { HealthPanel } from '../components/dashboard/HealthPanel';
import { AuthGuard } from '../components/dashboard/AuthGuard';
import { CubeLogo } from '../components/CubeLogo';
export function DashboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SEOHead title="Admin Dashboard" noIndex />

        {/* Top navbar for dashboard */}
        <header className="h-16 bg-gray-900 text-white flex items-center px-4 md:px-6 lg:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <CubeLogo size={24} className="text-accent" />
            <span className="font-sans font-bold text-lg tracking-tight">
              ISTEROIDI
            </span>
            <span className="font-mono text-xs text-gray-400 border-l border-gray-700 pl-3">
              WP Admin Dashboard
            </span>
          </div>
          <div className="ml-auto flex items-center gap-4 relative z-10">
            <button className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-full">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-mono text-xs font-bold">
                AD
              </div>
              <span className="font-sans text-sm font-medium hidden sm:block">
                Admin
              </span>
            </button>
          </div>
        </header>

        <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
          <DashboardSidebar />

          <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/orders" element={<OrdersPanel />} />
              <Route path="/customers" element={<CustomersPanel />} />
              <Route path="/products" element={<ProductsPanel />} />
              <Route path="/plugins" element={<PluginsPanel />} />
              <Route path="/settings" element={<SettingsPanel />} />

              {/* Super Admin Routes */}
              <Route path="/infrastructure" element={<InfrastructurePanel />} />
              <Route path="/database" element={<DatabasePanel />} />
              <Route path="/deployment" element={<DeploymentPanel />} />
              <Route path="/environment" element={<EnvironmentPanel />} />
              <Route path="/health" element={<HealthPanel />} />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </AuthGuard>);

}