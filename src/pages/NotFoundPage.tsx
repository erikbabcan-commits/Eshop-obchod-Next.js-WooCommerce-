import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SearchIcon, HomeIcon, TagIcon, ShoppingBagIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
export function NotFoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Layout>
      <SEOHead title="Pagina non trovata" noIndex />
      <main className="flex-1 flex items-center justify-center px-4 py-16 cubes-overlay-light">
        <div className="w-full max-w-lg relative z-10">
          <div
            className="bg-white border border-dashed border-gray-300 rounded p-10 text-center"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="flex justify-center mb-4">
              <CubeLogo size={56} className="text-gray-200" />
            </div>
            <div
              className="text-8xl font-bold mb-2 select-none font-mono text-gray-200"
              style={{
                letterSpacing: '-0.05em'
              }}
              aria-hidden="true">

              404
            </div>

            <h1 className="font-sans text-xl font-bold text-gray-900 mb-2">
              Pagina non trovata
            </h1>
            <p className="font-mono text-sm text-gray-500 mb-2">
              La pagina{' '}
              <span className="border border-dashed border-gray-300 px-1.5 py-0.5 text-xs bg-gray-50 text-gray-700 rounded">
                {location.pathname}
              </span>{' '}
              non esiste.
            </p>
            <p className="font-mono text-sm text-gray-400 mb-8">
              Potrebbe essere stata spostata, eliminata o l'indirizzo è errato.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 p-3 border border-dashed border-gray-300 rounded hover:bg-gray-50 transition-colors text-left">

                <HomeIcon
                  className="w-4 h-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true" />

                <div>
                  <p className="font-sans text-xs font-semibold text-gray-800">
                    Homepage
                  </p>
                  <p className="font-mono text-xs text-gray-400">
                    Torna all'inizio
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigate('/brands')}
                className="flex items-center gap-3 p-3 border border-dashed border-gray-300 rounded hover:bg-gray-50 transition-colors text-left">

                <TagIcon
                  className="w-4 h-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true" />

                <div>
                  <p className="font-sans text-xs font-semibold text-gray-800">
                    Marchi
                  </p>
                  <p className="font-mono text-xs text-gray-400">
                    Sfoglia tutti i marchi
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigate('/cart')}
                className="flex items-center gap-3 p-3 border border-dashed border-gray-300 rounded hover:bg-gray-50 transition-colors text-left">

                <ShoppingBagIcon
                  className="w-4 h-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true" />

                <div>
                  <p className="font-sans text-xs font-semibold text-gray-800">
                    Carrello
                  </p>
                  <p className="font-mono text-xs text-gray-400">
                    Visualizza il carrello
                  </p>
                </div>
              </button>

              <button
                onClick={() => navigate('/search')}
                className="flex items-center gap-3 p-3 border border-dashed border-gray-300 rounded hover:bg-gray-50 transition-colors text-left">

                <SearchIcon
                  className="w-4 h-4 flex-shrink-0 text-gray-400"
                  aria-hidden="true" />

                <div>
                  <p className="font-sans text-xs font-semibold text-gray-800">
                    Ricerca
                  </p>
                  <p className="font-mono text-xs text-gray-400">
                    Cerca prodotti
                  </p>
                </div>
              </button>
            </div>

            <p className="font-mono text-xs text-gray-300 border-t border-dashed border-gray-200 pt-4">
              HTTP 404 · Pagina non trovata
            </p>
          </div>
        </div>
      </main>
    </Layout>);

}