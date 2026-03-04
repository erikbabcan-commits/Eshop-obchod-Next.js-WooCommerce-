import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, TrashIcon, ShoppingCartIcon } from 'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
export function WishlistPage() {
  const navigate = useNavigate();
  const { items, totalItems, clearWishlist } = useWishlist();
  return (
    <Layout>
      <SEOHead title="Preferiti" canonical="/wishlist" noIndex />
      <main
        className="min-h-screen w-full cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'preferiti'
            }]
            } />


          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
                  I miei Preferiti
                </h1>
                <p className="font-mono text-xs text-gray-400">
                  /wishlist · {totalItems}{' '}
                  {totalItems === 1 ? 'prodotto' : 'prodotti'}
                </p>
              </div>
              {totalItems > 0 &&
              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 border border-gray-300 text-gray-500 rounded hover:border-red-300 hover:text-red-500 transition-colors">

                  <TrashIcon size={12} aria-hidden="true" />
                  Svuota lista
                </button>
              }
            </div>
          </div>

          {items.length === 0 ?
          <div className="bg-white border border-dashed border-gray-300 rounded py-20 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                <CubeLogo size={32} className="text-gray-300" />
              </div>
              <p className="font-sans text-base text-gray-500 mb-1">
                La lista dei preferiti è vuota
              </p>
              <p className="font-mono text-xs text-gray-400 mb-6">
                Aggiungi prodotti cliccando il cuore ♡
              </p>
              <button
              onClick={() => navigate('/category/anabolizzanti')}
              className="font-sans font-semibold text-sm px-5 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                Esplora il Catalogo
              </button>
            </div> :

          <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {items.map((product) =>
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.slug}`)} />

              )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center">
                <button
                onClick={() => navigate('/category/anabolizzanti')}
                className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors">

                  ← Continua lo shopping
                </button>
              </div>
            </>
          }
        </div>
      </main>
    </Layout>);

}