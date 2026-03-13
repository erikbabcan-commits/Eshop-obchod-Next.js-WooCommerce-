import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  UsersIcon,
  PackageIcon,
  PuzzleIcon,
  SettingsIcon,
  LogOutIcon,
  ServerIcon,
  DatabaseIcon,
  RocketIcon,
  KeyIcon,
  ActivityIcon,
  ScrollTextIcon } from
'lucide-react';
export function DashboardSidebar() {
  const storeNavItems = [
  {
    to: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboardIcon,
    end: true
  },
  {
    to: '/dashboard/orders',
    label: 'Ordini',
    icon: ShoppingCartIcon
  },
  {
    to: '/dashboard/customers',
    label: 'Clienti',
    icon: UsersIcon
  },
  {
    to: '/dashboard/products',
    label: 'Prodotti',
    icon: PackageIcon
  },
  {
    to: '/dashboard/plugins',
    label: 'Plugin',
    icon: PuzzleIcon
  },
  {
    to: '/dashboard/settings',
    label: 'Impostazioni API',
    icon: SettingsIcon
  },
  {
    to: '/dashboard/logs',
    label: 'Logs & Audit Trail',
    icon: ScrollTextIcon
  }];

  const adminNavItems = [
  {
    to: '/dashboard/infrastructure',
    label: 'Infrastruttura',
    icon: ServerIcon
  },
  {
    to: '/dashboard/database',
    label: 'Database',
    icon: DatabaseIcon
  },
  {
    to: '/dashboard/deployment',
    label: 'Deployment',
    icon: RocketIcon
  },
  {
    to: '/dashboard/environment',
    label: 'Variabili Ambiente',
    icon: KeyIcon
  },
  {
    to: '/dashboard/health',
    label: 'Stato Sistema',
    icon: ActivityIcon
  }];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <span className="font-mono text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">
          Admin Panel
        </span>
        <span className="font-sans text-sm text-gray-800 font-medium">
          WooCommerce REST API
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 block">
            Gestione Store
          </span>
          <div className="space-y-1">
            {storeNavItems.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded font-sans text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${isActive ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
              }>

                <item.icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            )}
          </div>
        </div>

        <div>
          <span className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-2 block">
            Super Admin
          </span>
          <div className="space-y-1">
            {adminNavItems.map((item) =>
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded font-sans text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${isActive ? 'bg-gray-900 text-white font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
              }>

                <item.icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded font-sans text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors w-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

          <LogOutIcon size={18} aria-hidden="true" />
          Torna allo Store
        </NavLink>
      </div>
    </aside>);

}