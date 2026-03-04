import React, { useState } from 'react';
import {
  DatabaseIcon,
  PlayIcon,
  DownloadIcon,
  SaveIcon,
  CheckCircleIcon } from
'lucide-react';
import { DEFAULT_DATABASE } from '../../data/infrastructureStore';
import type {
  DatabaseConfig,
  DatabaseProvider } from
'../../types/infrastructure';
export function DatabasePanel() {
  const [db, setDb] = useState<DatabaseConfig>(DEFAULT_DATABASE);
  const [isSaved, setIsSaved] = useState(false);
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  const generateConnectionString = () => {
    if (db.provider === 'sqlite') return `sqlite://${db.name}.db`;
    if (db.provider.includes('firebase') || db.provider === 'firestore')
    return 'Managed by Firebase Config';
    const auth = db.password ? `${db.username}:${db.password}` : db.username;
    const portStr = db.port ? `:${db.port}` : '';
    const protocol =
    db.provider === 'postgresql' || db.provider === 'supabase-pg' ?
    'postgresql' :
    'mysql';
    return `${protocol}://${auth}@${db.host}${portStr}/${db.name}${db.sslEnabled ? '?sslmode=require' : ''}`;
  };
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Configurazione Database
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Gestisci la connessione al database primario e le migrazioni
          </p>
        </div>
        <button
          onClick={handleSave}
          className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

          {isSaved ? <CheckCircleIcon size={16} /> : <SaveIcon size={16} />}
          {isSaved ? 'Salvato' : 'Salva Configurazione'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Provider & Connection */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className="bg-white border border-gray-200 rounded p-6"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Provider Database
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(
              [
              'postgresql',
              'mysql',
              'sqlite',
              'firebase-rtdb',
              'firestore',
              'supabase-pg'] as
              DatabaseProvider[]).
              map((provider) =>
              <label
                key={provider}
                className={`flex items-center gap-2 p-3 border rounded cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ${db.provider === provider ? 'border-gray-900 bg-gray-50 ring-1 ring-gray-900' : 'border-gray-200 hover:border-gray-300'}`}>

                  <input
                  type="radio"
                  name="db_provider"
                  checked={db.provider === provider}
                  onChange={() =>
                  setDb({
                    ...db,
                    provider
                  })
                  }
                  className="text-gray-900 focus:ring-gray-900" />

                  <span className="font-mono text-xs font-medium uppercase">
                    {provider}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded p-6"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Credenziali di Connessione
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Host
                </label>
                <input
                  type="text"
                  value={db.host}
                  onChange={(e) =>
                  setDb({
                    ...db,
                    host: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Porta
                </label>
                <input
                  type="number"
                  value={db.port}
                  onChange={(e) =>
                  setDb({
                    ...db,
                    port: parseInt(e.target.value)
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Nome Database
                </label>
                <input
                  type="text"
                  value={db.name}
                  onChange={(e) =>
                  setDb({
                    ...db,
                    name: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div>
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={db.username}
                  onChange={(e) =>
                  setDb({
                    ...db,
                    username: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
              <div className="md:col-span-2">
                <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={db.password}
                  onChange={(e) =>
                  setDb({
                    ...db,
                    password: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded">
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                Connection String (Auto-generata)
              </label>
              <code className="block w-full font-mono text-xs text-gray-800 break-all">
                {generateConnectionString()}
              </code>
            </div>
          </div>
        </div>

        {/* Right Column - Settings & Actions */}
        <div className="space-y-6">
          <div
            className="bg-white border border-gray-200 rounded p-6"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Impostazioni Avanzate
            </h3>

            <div className="space-y-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={db.sslEnabled}
                  onChange={(e) =>
                  setDb({
                    ...db,
                    sslEnabled: e.target.checked
                  })
                  }
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-sm text-gray-700">
                  Abilita SSL/TLS
                </span>
              </label>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Pool Min
                  </label>
                  <input
                    type="number"
                    value={db.poolMin}
                    onChange={(e) =>
                    setDb({
                      ...db,
                      poolMin: parseInt(e.target.value)
                    })
                    }
                    className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div className="flex-1">
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Pool Max
                  </label>
                  <input
                    type="number"
                    value={db.poolMax}
                    onChange={(e) =>
                    setDb({
                      ...db,
                      poolMax: parseInt(e.target.value)
                    })
                    }
                    className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={db.migrationsEnabled}
                    onChange={(e) =>
                    setDb({
                      ...db,
                      migrationsEnabled: e.target.checked
                    })
                    }
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                  <span className="font-sans text-sm text-gray-700">
                    Esegui migrazioni al deploy
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={db.seedOnDeploy}
                    onChange={(e) =>
                    setDb({
                      ...db,
                      seedOnDeploy: e.target.checked
                    })
                    }
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                  <span className="font-sans text-sm text-gray-700">
                    Seed dati iniziali al deploy
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div
            className="bg-white border border-gray-200 rounded p-6"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
              Azioni Rapide
            </h3>
            <div className="space-y-2">
              <button className="w-full font-sans text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                <DatabaseIcon size={16} />
                Testa Connessione DB
              </button>
              <button className="w-full font-sans text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                <PlayIcon size={16} />
                Esegui Migrazioni Ora
              </button>
              <button className="w-full font-sans text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
                <DownloadIcon size={16} />
                Backup Ora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}