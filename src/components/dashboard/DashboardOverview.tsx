import React from 'react';
import {
  TrendingUpIcon,
  ShoppingCartIcon,
  UsersIcon,
  PackageIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  CheckCircleIcon } from
'lucide-react';
import { MOCK_ORDERS, MOCK_CUSTOMERS } from '../../data/adminStore';
import { PRODUCTS } from '../../data/store';
export function DashboardOverview() {
  // Calculate some mock stats
  const totalSales = MOCK_ORDERS.filter(
    (o) => o.status === 'completed' || o.status === 'processing'
  ).reduce((sum, order) => sum + order.total, 0);
  const ordersCount = MOCK_ORDERS.length;
  const customersCount = MOCK_CUSTOMERS.filter(
    (c) => c.role === 'customer'
  ).length;
  const productsCount = PRODUCTS.length;
  const stats = [
  {
    label: 'Vendite Totali',
    value: `€${totalSales.toFixed(2)}`,
    trend: '+12.5%',
    trendUp: true,
    icon: TrendingUpIcon
  },
  {
    label: 'Ordini',
    value: ordersCount.toString(),
    trend: '+5.2%',
    trendUp: true,
    icon: ShoppingCartIcon
  },
  {
    label: 'Clienti',
    value: customersCount.toString(),
    trend: '+18.1%',
    trendUp: true,
    icon: UsersIcon
  },
  {
    label: 'Prodotti Attivi',
    value: productsCount.toString(),
    trend: '-2.4%',
    trendUp: false,
    icon: PackageIcon
  }];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Dashboard Overview
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Riepilogo delle performance dello store
          </p>
        </div>
        <div className="font-mono text-xs px-3 py-1 bg-green-100 text-green-800 rounded border border-green-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          API Connessa
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) =>
        <div
          key={i}
          className="bg-white border border-gray-200 rounded p-5"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-600">
                <stat.icon size={20} aria-hidden="true" />
              </div>
              <div
              className={`flex items-center gap-1 font-mono text-xs font-medium px-2 py-1 rounded ${stat.trendUp ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>

                {stat.trendUp ?
              <ArrowUpRightIcon size={12} /> :

              <ArrowDownRightIcon size={12} />
              }
                {stat.trend}
              </div>
            </div>
            <div>
              <span className="font-sans text-3xl font-bold text-gray-900 block mb-1">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div
          className="bg-white border border-gray-200 rounded"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-sans font-semibold text-gray-900">
              Ultimi Ordini
            </h3>
            <button className="font-mono text-xs text-gray-500 hover:text-gray-900 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">
              Vedi tutti →
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {MOCK_ORDERS.slice(0, 5).map((order) =>
            <div
              key={order.id}
              className="px-5 py-3 flex items-center justify-between">

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-medium text-gray-900">
                      #{order.number}
                    </span>
                    <span
                    className={`font-mono text-xs px-2 py-1 rounded-full border ${order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : order.status === 'processing' ? 'bg-blue-50 text-blue-700 border-blue-200' : order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>

                      {order.status}
                    </span>
                  </div>
                  <span className="font-sans text-sm text-gray-600">
                    {order.billing.firstName} {order.billing.lastName}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-medium text-gray-900 block">
                    €{order.total.toFixed(2)}
                  </span>
                  <span className="font-mono text-xs text-gray-400">
                    {new Date(order.dateCreated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* System Status */}
        <div
          className="bg-white border border-gray-200 rounded"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="font-sans font-semibold text-gray-900">
              Stato Sistema (WooCommerce REST API)
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between p-3 border border-dashed border-gray-200 rounded bg-gray-50">
              <span className="font-mono text-xs text-gray-600">
                Endpoint API
              </span>
              <span className="font-mono text-xs text-gray-900">
                https://api.isteroidi.it/wp-json
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border border-dashed border-gray-200 rounded bg-gray-50">
              <span className="font-mono text-xs text-gray-600">
                Versione API
              </span>
              <span className="font-mono text-xs text-gray-900">wc/v3</span>
            </div>
            <div className="flex items-center justify-between p-3 border border-dashed border-gray-200 rounded bg-gray-50">
              <span className="font-mono text-xs text-gray-600">
                Autenticazione
              </span>
              <span className="font-mono text-xs text-green-600 flex items-center gap-1">
                <CheckCircleIcon size={12} /> OAuth 1.0a
              </span>
            </div>
            <div className="flex items-center justify-between p-3 border border-dashed border-gray-200 rounded bg-gray-50">
              <span className="font-mono text-xs text-gray-600">
                Ultima Sincronizzazione
              </span>
              <span className="font-mono text-xs text-gray-900">
                Oggi, 14:32
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}