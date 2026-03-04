import React, { useState } from 'react';
import { SaveIcon, ServerIcon, ShieldIcon, CheckCircleIcon } from 'lucide-react';
import { DEFAULT_WP_SETTINGS } from '../../data/adminStore';
import type { WPSettings } from '../../types/admin';
export function SettingsPanel() {
  const [settings, setSettings] = useState<WPSettings>(DEFAULT_WP_SETTINGS);
  const [isSaved, setIsSaved] = useState(false);
  const handleChange = (field: keyof WPSettings, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value
    }));
    setIsSaved(false);
  };
  const handleSave = () => {
    // Mock save
    setTimeout(() => setIsSaved(true), 500);
  };
  return (
    <>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-1">
              Impostazioni API
            </h2>
            <p className="font-mono text-xs text-gray-500">
              Configura la connessione con WooCommerce REST API
            </p>
          </div>
          <button
            onClick={handleSave}
            className="font-sans font-semibold text-sm px-4 h-10 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            {isSaved ? <CheckCircleIcon size={16} /> : <SaveIcon size={16} />}
            {isSaved ? 'Salvato' : 'Salva Impostazioni'}
          </button>
        </div>

        <div
          className="bg-white border border-gray-200 rounded p-6"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <ServerIcon className="text-gray-400" size={24} />
            <div>
              <h3 className="font-sans font-semibold text-gray-900">
                Endpoint Configuration
              </h3>
              <p className="font-mono text-xs text-gray-500">
                URL base dell'installazione WordPress
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                WordPress API URL
              </label>
              <input
                type="url"
                value={settings.apiUrl}
                onChange={(e) => handleChange('apiUrl', e.target.value)}
                className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-gray-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                placeholder="https://tuosito.com/wp-json" />

              <p className="font-mono text-xs text-gray-400 mt-1">
                Deve terminare con /wp-json
              </p>
            </div>

            <div>
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                WooCommerce API Version
              </label>
              <select
                value={settings.version}
                onChange={(e) => handleChange('version', e.target.value)}
                className="w-full sm:w-64 font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 bg-white focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                <option value="wc/v3">v3 (Raccomandata)</option>
                <option value="wc/v2">v2 (Legacy)</option>
                <option value="wc/v1">v1 (Deprecata)</option>
              </select>
            </div>
          </div>
        </div>

        <div
          className="bg-white border border-gray-200 rounded p-6"
          style={{
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}>

          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <ShieldIcon className="text-gray-400" size={24} />
            <div>
              <h3 className="font-sans font-semibold text-gray-900">
                Autenticazione (OAuth 1.0a)
              </h3>
              <p className="font-mono text-xs text-gray-500">
                Credenziali generate da WooCommerce &gt; Impostazioni &gt;
                Avanzate &gt; REST API
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                Consumer Key (ck_*)
              </label>
              <input
                type="text"
                value={settings.consumerKey}
                onChange={(e) => handleChange('consumerKey', e.target.value)}
                className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                placeholder="ck_..." />

            </div>

            <div>
              <label className="font-mono text-xs font-medium text-gray-700 block mb-1">
                Consumer Secret (cs_*)
              </label>
              <input
                type="password"
                value={settings.consumerSecret}
                onChange={(e) => handleChange('consumerSecret', e.target.value)}
                className="w-full font-mono text-sm border border-gray-300 rounded px-3 h-10 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                placeholder="cs_..." />

            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.verifySsl}
                  onChange={(e) => handleChange('verifySsl', e.target.checked)}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-sm text-gray-700">
                  Verifica certificato SSL (Raccomandato)
                </span>
              </label>
              <p className="font-mono text-xs text-gray-400 mt-1 ml-6">
                Disabilita solo per ambienti di sviluppo locale senza HTTPS
                valido.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-dashed border-gray-300 rounded p-6 text-center">
          <button className="font-sans font-semibold text-sm px-4 h-10 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
            Testa Connessione API
          </button>
          <p className="font-mono text-xs text-gray-500 mt-3">
            Verifica che le credenziali siano valide e che il server risponda
            correttamente.
          </p>
        </div>
      </div>
    </>);

}