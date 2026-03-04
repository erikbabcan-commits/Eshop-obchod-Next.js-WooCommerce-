import React from 'react';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  ExternalLinkIcon } from
'lucide-react';
import { MOCK_PLUGINS } from '../../data/adminStore';
export function PluginsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Plugin WordPress
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Stato dei plugin installati sull'istanza WordPress
          </p>
        </div>
        <button className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
          <RefreshCwIcon size={16} />
          Controlla Aggiornamenti
        </button>
      </div>

      <div
        className="bg-white border border-gray-200 rounded overflow-hidden"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-1/4">
                  Plugin
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-1/2">
                  Descrizione
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Stato
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Versione
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_PLUGINS.map((plugin) =>
              <tr
                key={plugin.id}
                className={`hover:bg-gray-50 transition-colors ${plugin.status === 'inactive' ? 'opacity-60' : ''}`}>

                  <td className="px-4 py-3 align-top">
                    <span className="font-sans text-sm font-semibold text-gray-900 block mb-1">
                      {plugin.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                      href={plugin.pluginUri}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-blue-600 hover:underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                        Dettagli <ExternalLinkIcon size={12} />
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <p className="font-sans text-sm text-gray-600 mb-1">
                      {plugin.description}
                    </p>
                    <span className="font-mono text-xs text-gray-400">
                      Di{' '}
                      <a
                      href={plugin.authorUri}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                        {plugin.author}
                      </a>
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {plugin.status === 'active' ?
                  <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-full border bg-green-50 text-green-700 border-green-200 uppercase tracking-wider">
                        <CheckCircleIcon size={12} /> Attivo
                      </span> :

                  <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 rounded-full border bg-gray-100 text-gray-600 border-gray-300 uppercase tracking-wider">
                        Inattivo
                      </span>
                  }
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span className="font-mono text-sm text-gray-900 block mb-1">
                      {plugin.version}
                    </span>
                    {plugin.updateAvailable &&
                  <div className="flex items-center gap-1 text-orange-600 font-mono text-xs bg-orange-50 px-2 py-1 rounded border border-orange-200">
                        <AlertCircleIcon size={12} />
                        Aggiorna a {plugin.newVersion}
                      </div>
                  }
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}