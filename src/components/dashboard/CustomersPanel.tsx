import React, { useState } from 'react';
import { SearchIcon, MailIcon, ExternalLinkIcon } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/adminStore';
export function CustomersPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
    return (
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

  });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Clienti
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Gestisci i clienti registrati su WooCommerce
          </p>
        </div>
        <button className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 flex items-center justify-center">
          Aggiungi Cliente
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
            placeholder="Cerca per nome o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full font-sans text-sm border border-gray-300 rounded pl-9 pr-4 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

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
                  Nome
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Email
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Ruolo
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Ordini
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-right">
                  Spesa Totale
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-center">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ?
              filteredCustomers.map((customer) =>
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors">

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-mono text-xs font-bold">
                          {customer.firstName[0]}
                          {customer.lastName[0]}
                        </div>
                        <div>
                          <span className="font-sans text-sm font-medium text-gray-900 block">
                            {customer.firstName} {customer.lastName}
                          </span>
                          <span className="font-mono text-xs text-gray-400">
                            ID: {customer.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-sans text-sm text-gray-700 block">
                        {customer.email}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                    className={`inline-flex font-mono text-xs px-2 py-1 rounded-full border uppercase tracking-wider ${customer.role === 'administrator' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>

                        {customer.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm text-gray-900">
                        {customer.ordersCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-gray-900">
                        €{customer.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      title="Invia email">

                          <MailIcon size={16} />
                        </button>
                        <button
                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      title="Vedi in WordPress">

                          <ExternalLinkIcon size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
              ) :

              <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    <p className="font-sans text-sm text-gray-500">
                      Nessun cliente trovato.
                    </p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}