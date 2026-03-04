import React, { useState } from 'react';
import { SearchIcon, FilterIcon, EyeIcon, MoreVerticalIcon } from 'lucide-react';
import { MOCK_ORDERS } from '../../data/adminStore';
import type { OrderStatus } from '../../types/admin';
export function OrdersPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const filteredOrders = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
    order.number.includes(searchTerm) ||
    order.billing.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.billing.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
    statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'refunded':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Ordini
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Gestisci gli ordini sincronizzati da WooCommerce
          </p>
        </div>
        <button className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 flex items-center justify-center">
          Sincronizza Ora
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Cerca per numero ordine, nome o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-4 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

        </div>
        <div className="flex items-center gap-2">
          <FilterIcon size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) =>
            setStatusFilter(e.target.value as OrderStatus | 'all')
            }
            className="font-sans text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            <option value="all">Tutti gli stati</option>
            <option value="pending">In attesa (Pending)</option>
            <option value="processing">In lavorazione (Processing)</option>
            <option value="completed">Completato (Completed)</option>
            <option value="cancelled">Annullato (Cancelled)</option>
            <option value="refunded">Rimborsato (Refunded)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white border border-gray-200 rounded overflow-hidden"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Ordine
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Data
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Stato
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Fatturazione
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-right">
                  Totale
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-center">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ?
              filteredOrders.map((order) =>
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors">

                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-medium text-gray-900 block">
                        #{order.number}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        {order.items.length} articol
                        {order.items.length === 1 ? 'o' : 'i'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-gray-700 block">
                        {new Date(order.dateCreated).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        {new Date(order.dateCreated).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                    className={`inline-flex font-mono text-xs px-2 py-1 rounded-full border uppercase tracking-wider ${getStatusColor(order.status)}`}>

                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-gray-900 block font-medium">
                        {order.billing.firstName} {order.billing.lastName}
                      </span>
                      <span className="font-mono text-xs text-gray-500">
                        {order.billing.city}, {order.billing.country}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-gray-900 block">
                        €{order.total.toFixed(2)}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        via {order.paymentMethodTitle}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      title="Vedi dettagli">

                          <EyeIcon size={16} />
                        </button>
                        <button
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      title="Altre azioni">

                          <MoreVerticalIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
              ) :

              <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <p className="font-sans text-sm text-gray-500">
                      Nessun ordine trovato.
                    </p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-500">
            Mostrando {filteredOrders.length} ordini
          </span>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 h-8 border border-gray-300 rounded text-gray-400 font-mono text-xs bg-white cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

              Precedente
            </button>
            <button
              disabled
              className="px-3 h-8 border border-gray-300 rounded text-gray-400 font-mono text-xs bg-white cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

              Successivo
            </button>
          </div>
        </div>
      </div>
    </div>);

}