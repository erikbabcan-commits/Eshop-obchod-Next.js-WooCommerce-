import React, { useState } from 'react';
import {
  DatabaseIcon,
  FlameIcon,
  GlobeIcon,
  CodeIcon,
  CheckCircleIcon,
  SaveIcon,
  RefreshCwIcon } from
'lucide-react';
import {
  DEFAULT_SUPABASE,
  DEFAULT_FIREBASE,
  DEFAULT_WORDPRESS,
  DEFAULT_CUSTOM_API } from
'../../data/infrastructureStore';
import type {
  BackendProvider,
  SupabaseConfig,
  FirebaseConfig,
  WordPressConfig,
  CustomApiConfig } from
'../../types/infrastructure';
export function InfrastructurePanel() {
  const [activeBackend, setActiveBackend] =
  useState<BackendProvider>('supabase');
  const [supabase, setSupabase] = useState<SupabaseConfig>(DEFAULT_SUPABASE);
  const [firebase, setFirebase] = useState<FirebaseConfig>(DEFAULT_FIREBASE);
  const [wordpress, setWordpress] = useState<WordPressConfig>(DEFAULT_WORDPRESS);
  const [customApi, setCustomApi] =
  useState<CustomApiConfig>(DEFAULT_CUSTOM_API);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleTest = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 1500);
  };
  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
            Infrastruttura Backend
          </h2>
          <p className="font-mono text-xs text-gray-500">
            Seleziona e configura il provider backend principale per
            l'applicazione
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleTest}
            disabled={isTesting}
            className="font-sans font-semibold text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            {isTesting ?
            <RefreshCwIcon size={16} className="animate-spin" /> :

            <RefreshCwIcon size={16} />
            }
            Testa Connessione
          </button>
          <button
            onClick={handleSave}
            className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            {isSaved ? <CheckCircleIcon size={16} /> : <SaveIcon size={16} />}
            {isSaved ? 'Salvato' : 'Salva Configurazione'}
          </button>
        </div>
      </div>

      {/* Provider Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveBackend('supabase')}
          className={`p-4 rounded border text-left transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeBackend === 'supabase' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-200 bg-white hover:border-gray-300'}`}>

          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center ${activeBackend === 'supabase' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>

              <DatabaseIcon size={20} />
            </div>
            <span className="font-mono text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
              Connesso
            </span>
          </div>
          <h3 className="font-sans font-bold text-gray-900 mb-1">Supabase</h3>
          <p className="font-mono text-xs text-gray-500 line-clamp-2">
            PostgreSQL, Auth, Storage e Realtime subscriptions
          </p>
        </button>

        <button
          onClick={() => setActiveBackend('firebase')}
          className={`p-4 rounded border text-left transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeBackend === 'firebase' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-200 bg-white hover:border-gray-300'}`}>

          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center ${activeBackend === 'firebase' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}>

              <FlameIcon size={20} />
            </div>
            <span className="font-mono text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
              Disconnesso
            </span>
          </div>
          <h3 className="font-sans font-bold text-gray-900 mb-1">Firebase</h3>
          <p className="font-mono text-xs text-gray-500 line-clamp-2">
            Firestore, Auth, Storage e Cloud Functions
          </p>
        </button>

        <button
          onClick={() => setActiveBackend('wordpress')}
          className={`p-4 rounded border text-left transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeBackend === 'wordpress' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-200 bg-white hover:border-gray-300'}`}>

          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center ${activeBackend === 'wordpress' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>

              <GlobeIcon size={20} />
            </div>
            <span className="font-mono text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 border border-green-200">
              Connesso
            </span>
          </div>
          <h3 className="font-sans font-bold text-gray-900 mb-1">WordPress</h3>
          <p className="font-mono text-xs text-gray-500 line-clamp-2">
            WooCommerce REST API come backend headless
          </p>
        </button>

        <button
          onClick={() => setActiveBackend('custom')}
          className={`p-4 rounded border text-left transition-all focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${activeBackend === 'custom' ? 'border-gray-800 bg-gray-100 ring-1 ring-gray-800' : 'border-gray-200 bg-white hover:border-gray-300'}`}>

          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center ${activeBackend === 'custom' ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>

              <CodeIcon size={20} />
            </div>
            <span className="font-mono text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
              Non configurato
            </span>
          </div>
          <h3 className="font-sans font-bold text-gray-900 mb-1">Custom API</h3>
          <p className="font-mono text-xs text-gray-500 line-clamp-2">
            REST API personalizzata o microservizi
          </p>
        </button>
      </div>

      {/* Configuration Forms */}
      <div
        className="bg-white border border-gray-200 rounded p-6"
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
        }}>

        {activeBackend === 'supabase' &&
        <div className="space-y-6">
            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3">
              Configurazione Supabase
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Project URL
                  </label>
                  <input
                  type="url"
                  value={supabase.projectUrl}
                  onChange={(e) =>
                  setSupabase({
                    ...supabase,
                    projectUrl: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Anon Key
                  </label>
                  <input
                  type="text"
                  value={supabase.anonKey}
                  onChange={(e) =>
                  setSupabase({
                    ...supabase,
                    anonKey: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Service Role Key (Secret)
                  </label>
                  <input
                  type="password"
                  value={supabase.serviceRoleKey}
                  onChange={(e) =>
                  setSupabase({
                    ...supabase,
                    serviceRoleKey: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    DB Connection String
                  </label>
                  <input
                  type="password"
                  value={supabase.dbConnectionString}
                  onChange={(e) =>
                  setSupabase({
                    ...supabase,
                    dbConnectionString: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    JWT Secret
                  </label>
                  <input
                  type="password"
                  value={supabase.jwtSecret}
                  onChange={(e) =>
                  setSupabase({
                    ...supabase,
                    jwtSecret: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div className="flex gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={supabase.realtimeEnabled}
                    onChange={(e) =>
                    setSupabase({
                      ...supabase,
                      realtimeEnabled: e.target.checked
                    })
                    }
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    <span className="font-sans text-sm text-gray-700">
                      Realtime
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={supabase.storageEnabled}
                    onChange={(e) =>
                    setSupabase({
                      ...supabase,
                      storageEnabled: e.target.checked
                    })
                    }
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    <span className="font-sans text-sm text-gray-700">
                      Storage
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        }

        {activeBackend === 'firebase' &&
        <div className="space-y-6">
            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3">
              Configurazione Firebase
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Project ID
                  </label>
                  <input
                  type="text"
                  value={firebase.projectId}
                  onChange={(e) =>
                  setFirebase({
                    ...firebase,
                    projectId: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    API Key
                  </label>
                  <input
                  type="password"
                  value={firebase.apiKey}
                  onChange={(e) =>
                  setFirebase({
                    ...firebase,
                    apiKey: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Auth Domain
                  </label>
                  <input
                  type="text"
                  value={firebase.authDomain}
                  onChange={(e) =>
                  setFirebase({
                    ...firebase,
                    authDomain: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Service Account JSON
                  </label>
                  <textarea
                  value={firebase.serviceAccountJson}
                  onChange={(e) =>
                  setFirebase({
                    ...firebase,
                    serviceAccountJson: e.target.value
                  })
                  }
                  className="w-full font-mono text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500 h-32 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  placeholder="{ ... }" />

                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={firebase.useEmulators}
                    onChange={(e) =>
                    setFirebase({
                      ...firebase,
                      useEmulators: e.target.checked
                    })
                    }
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    <span className="font-sans text-sm text-gray-700">
                      Usa Emulatori Locali
                    </span>
                  </label>
                  {firebase.useEmulators &&
                <input
                  type="text"
                  value={firebase.emulatorHost}
                  onChange={(e) =>
                  setFirebase({
                    ...firebase,
                    emulatorHost: e.target.value
                  })
                  }
                  className="flex-1 font-mono text-sm border border-gray-300 rounded px-3 h-8 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  placeholder="localhost" />

                }
                </div>
              </div>
            </div>
          </div>
        }

        {activeBackend === 'wordpress' &&
        <div className="space-y-6">
            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3">
              Configurazione WordPress / WooCommerce
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Site URL
                  </label>
                  <input
                  type="url"
                  value={wordpress.siteUrl}
                  onChange={(e) =>
                  setWordpress({
                    ...wordpress,
                    siteUrl: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    API URL
                  </label>
                  <input
                  type="url"
                  value={wordpress.apiUrl}
                  onChange={(e) =>
                  setWordpress({
                    ...wordpress,
                    apiUrl: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    API Version
                  </label>
                  <select
                  value={wordpress.apiVersion}
                  onChange={(e) =>
                  setWordpress({
                    ...wordpress,
                    apiVersion: e.target.value as
                    'wc/v3' |
                    'wc/v2' |
                    'wc/v1'
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                    <option value="wc/v3">wc/v3 (Raccomandata)</option>
                    <option value="wc/v2">wc/v2</option>
                    <option value="wc/v1">wc/v1</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Consumer Key
                  </label>
                  <input
                  type="text"
                  value={wordpress.consumerKey}
                  onChange={(e) =>
                  setWordpress({
                    ...wordpress,
                    consumerKey: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Consumer Secret
                  </label>
                  <input
                  type="password"
                  value={wordpress.consumerSecret}
                  onChange={(e) =>
                  setWordpress({
                    ...wordpress,
                    consumerSecret: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                    type="checkbox"
                    checked={wordpress.verifySsl}
                    onChange={(e) =>
                    setWordpress({
                      ...wordpress,
                      verifySsl: e.target.checked
                    })
                    }
                    className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    <span className="font-sans text-sm text-gray-700">
                      Verifica SSL
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        }

        {activeBackend === 'custom' &&
        <div className="space-y-6">
            <h3 className="font-sans font-semibold text-gray-900 border-b border-gray-100 pb-3">
              Configurazione Custom REST API
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Base URL
                  </label>
                  <input
                  type="url"
                  value={customApi.baseUrl}
                  onChange={(e) =>
                  setCustomApi({
                    ...customApi,
                    baseUrl: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Auth Type
                  </label>
                  <select
                  value={customApi.authType}
                  onChange={(e) =>
                  setCustomApi({
                    ...customApi,
                    authType: e.target.value as
                    'bearer' |
                    'api-key' |
                    'basic' |
                    'none'
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                    <option value="bearer">Bearer Token</option>
                    <option value="api-key">API Key (Header)</option>
                    <option value="basic">Basic Auth</option>
                    <option value="none">Nessuna (Pubblica)</option>
                  </select>
                </div>

                {customApi.authType === 'bearer' &&
              <div>
                    <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                      Bearer Token
                    </label>
                    <input
                  type="password"
                  value={customApi.authToken}
                  onChange={(e) =>
                  setCustomApi({
                    ...customApi,
                    authToken: e.target.value
                  })
                  }
                  className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                  </div>
              }

                {customApi.authType === 'api-key' &&
              <div className="flex gap-2">
                    <div className="w-1/3">
                      <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                        Header Name
                      </label>
                      <input
                    type="text"
                    value={customApi.apiKeyHeader}
                    onChange={(e) =>
                    setCustomApi({
                      ...customApi,
                      apiKeyHeader: e.target.value
                    })
                    }
                    className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    </div>
                    <div className="flex-1">
                      <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                        API Key Value
                      </label>
                      <input
                    type="password"
                    value={customApi.apiKeyValue}
                    onChange={(e) =>
                    setCustomApi({
                      ...customApi,
                      apiKeyValue: e.target.value
                    })
                    }
                    className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                    </div>
                  </div>
              }
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                      Timeout (ms)
                    </label>
                    <input
                    type="number"
                    value={customApi.timeout}
                    onChange={(e) =>
                    setCustomApi({
                      ...customApi,
                      timeout: parseInt(e.target.value)
                    })
                    }
                    className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                  </div>
                  <div className="flex-1">
                    <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                      Retry Attempts
                    </label>
                    <input
                    type="number"
                    value={customApi.retryAttempts}
                    onChange={(e) =>
                    setCustomApi({
                      ...customApi,
                      retryAttempts: parseInt(e.target.value)
                    })
                    }
                    className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                  </div>
                </div>
                <div>
                  <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                    Custom Headers
                  </label>
                  <div className="space-y-2">
                    {customApi.customHeaders.map((header, idx) =>
                  <div key={idx} className="flex gap-2">
                        <input
                      type="text"
                      value={header.key}
                      readOnly
                      className="w-1/3 font-mono text-xs border border-gray-300 rounded px-2 h-8 bg-gray-50" />

                        <input
                      type="text"
                      value={header.value}
                      readOnly
                      className="flex-1 font-mono text-xs border border-gray-300 rounded px-2 h-8 bg-gray-50" />

                      </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>);

}