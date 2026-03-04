import React, { useState } from 'react';
import {
  KeyIcon,
  EyeIcon,
  EyeOffIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  UploadIcon,
  CopyIcon } from
'lucide-react';
import { MOCK_ENV_VARIABLES } from '../../data/infrastructureStore';
import type { EnvVariable, EnvironmentType } from '../../types/infrastructure';
export function EnvironmentPanel() {
  const [activeTab, setActiveTab] = useState<EnvironmentType>('production');
  const [variables, setVariables] = useState<EnvVariable[]>(MOCK_ENV_VARIABLES);
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
  const filteredVars = variables.filter((v) => v.environment === activeTab);
  const toggleSecret = (id: string) => {
    const next = new Set(visibleSecrets);
    if (next.has(id)) next.delete(id);else
    next.add(id);
    setVisibleSecrets(next);
  };
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'api':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'database':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'auth':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'storage':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'email':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'analytics':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Variabili d'Ambiente
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Gestisci i secrets e le configurazioni per ogni ambiente
          </p>
        </div>
        <div className="flex gap-3">
          <button className="font-sans font-semibold text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <DownloadIcon size={16} />
            Esporta .env
          </button>
          <button className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            <UploadIcon size={16} />
            Importa .env
          </button>
        </div>
      </div>

      <div
        className="bg-white border border-gray-200 rounded overflow-hidden"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {(['production', 'staging', 'development'] as EnvironmentType[]).map(
            (env) =>
            <button
              key={env}
              onClick={() => setActiveTab(env)}
              className={`px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeTab === env ? 'bg-white text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>

                {env}
              </button>

          )}
          <div className="ml-auto px-4 py-2 flex items-center">
            <button className="font-mono text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">
              <CopyIcon size={12} /> Copia da Development
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-1/4">
                  Chiave
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 w-1/3">
                  Valore
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3">
                  Categoria
                </th>
                <th className="font-mono text-xs font-semibold text-gray-600 px-4 py-3 text-right">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVars.map((v) =>
              <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm font-bold text-gray-900 block">
                      {v.key}
                    </span>
                    <span className="font-sans text-xs text-gray-500">
                      {v.description}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                      type={
                      v.isSecret && !visibleSecrets.has(v.id) ?
                      'password' :
                      'text'
                      }
                      value={v.value}
                      readOnly
                      className="w-full font-mono text-xs border border-transparent bg-transparent focus:border-gray-300 focus:bg-white rounded px-2 py-1 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                      {v.isSecret &&
                    <button
                      onClick={() => toggleSecret(v.id)}
                      className="text-gray-400 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                          {visibleSecrets.has(v.id) ?
                      <EyeOffIcon size={14} /> :

                      <EyeIcon size={14} />
                      }
                        </button>
                    }
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                    className={`inline-flex font-mono text-xs px-2 py-1 rounded-full border uppercase tracking-wider ${getCategoryColor(v.category)}`}>

                      {v.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    title="Elimina">

                      <TrashIcon size={16} />
                    </button>
                  </td>
                </tr>
              )}

              {/* Add New Row */}
              <tr className="bg-gray-50">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    placeholder="NUOVA_CHIAVE"
                    className="w-full font-mono text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </td>
                <td className="px-4 py-3">
                  <input
                    type="text"
                    placeholder="valore..."
                    className="w-full font-mono text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </td>
                <td className="px-4 py-3">
                  <select className="w-full font-mono text-xs border border-gray-300 rounded px-2 py-2 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                    <option value="other">other</option>
                    <option value="api">api</option>
                    <option value="database">database</option>
                    <option value="auth">auth</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="font-sans font-medium text-xs px-3 h-8 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center justify-center gap-1 ml-auto focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                    <PlusIcon size={14} /> Aggiungi
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}