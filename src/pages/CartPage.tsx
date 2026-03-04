import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrashIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
  PackageIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
export function CartPage() {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart
  } = useCart();
  const shipping = totalPrice >= 150 ? 0 : 9.9;
  const grandTotal = totalPrice + shipping;
  return (
    <Layout>
      <SEOHead title="Carrello" canonical="/cart" noIndex />
      <main
        className="min-h-screen w-full cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'carrello'
            }]
            } />


          <div className="mb-6">
            <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
              Carrello
            </h1>
            <p className="font-mono text-xs text-gray-400">
              /cart · {totalItems} {totalItems === 1 ? 'articolo' : 'articoli'}
            </p>
          </div>

          {items.length === 0 ?
          <div className="bg-white border border-dashed border-gray-300 rounded py-20 flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-5">
                <CubeLogo size={32} className="text-gray-300" />
              </div>
              <p className="font-sans text-base text-gray-500 mb-1">
                Il carrello è vuoto
              </p>
              <p className="font-mono text-xs text-gray-400 mb-6">
                Aggiungi prodotti per iniziare
              </p>
              <button
              onClick={() => navigate('/category/anabolizzanti')}
              className="font-sans font-semibold text-sm px-5 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                Esplora il Catalogo
              </button>
            </div> :

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Items table */}
              <div className="lg:col-span-8">
                <div
                className="bg-white border border-gray-200 rounded overflow-hidden"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="grid grid-cols-12 gap-4 px-4 py-2.5 border-b border-gray-200 bg-gray-50">
                    <div className="col-span-6">
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                        Prodotto
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                        Prezzo
                      </span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                        Qtà
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-wide">
                        Totale
                      </span>
                    </div>
                  </div>

                  <ul className="divide-y divide-gray-100" role="list">
                    {items.map((item) =>
                  <li
                    key={item.product.id}
                    className="grid grid-cols-12 gap-4 px-4 py-4 items-center">

                        <div className="col-span-6 flex items-start gap-3">
                          <div className="w-14 h-14 border border-dashed border-gray-300 rounded flex items-center justify-center flex-shrink-0 bg-gray-50">
                            <span className="font-mono text-xs text-gray-300">
                              IMG
                            </span>
                          </div>
                          <div className="min-w-0">
                            <span className="font-mono text-xs text-gray-400 block">
                              {item.product.brand}
                            </span>
                            <p className="font-sans text-sm font-semibold text-gray-900 leading-snug mb-1">
                              {item.product.name}
                            </p>
                            <span className="font-mono text-xs text-gray-300">
                              SKU: {item.product.sku}
                            </span>
                            <div className="mt-1.5">
                              <button
                            onClick={() => removeItem(item.product.id)}
                            className="font-mono text-xs text-gray-300 hover:text-red-400 transition-colors flex items-center gap-1"
                            aria-label={`Rimuovi ${item.product.name}`}>

                                <TrashIcon size={11} aria-hidden="true" />
                                Rimuovi
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2 text-center">
                          <span className="font-mono text-sm text-gray-700">
                            €{item.product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                          onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1
                          )
                          }
                          className="px-2 py-1.5 font-mono text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Diminuisci">

                              −
                            </button>
                            <span className="px-2.5 py-1.5 font-mono text-xs text-gray-800 border-x border-gray-300 min-w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                          onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1
                          )
                          }
                          className="px-2 py-1.5 font-mono text-xs text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Aumenta">

                              +
                            </button>
                          </div>
                        </div>

                        <div className="col-span-2 text-right">
                          <span className="font-mono text-sm font-medium text-gray-900">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </li>
                  )}
                  </ul>

                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <button
                    onClick={clearCart}
                    className="font-mono text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5">

                      <TrashIcon size={12} aria-hidden="true" />
                      Svuota carrello
                    </button>
                    <button
                    onClick={() => navigate('/category/anabolizzanti')}
                    className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors">

                      ← Continua lo shopping
                    </button>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-4">
                <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t">
                    <span className="font-mono text-xs font-medium text-gray-600">
                      Riepilogo Ordine
                    </span>
                  </div>

                  <div className="px-4 py-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">
                        Subtotale ({totalItems} articoli)
                      </span>
                      <span className="font-mono text-xs text-gray-700">
                        €{totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-gray-500">
                        Spedizione
                      </span>
                      {shipping === 0 ?
                    <span className="font-mono text-xs text-gray-600">
                          Gratuita
                        </span> :

                    <span className="font-mono text-xs text-gray-700">
                          €{shipping.toFixed(2)}
                        </span>
                    }
                    </div>

                    {shipping > 0 &&
                  <div className="border border-dashed border-gray-200 rounded p-2.5">
                        <p className="font-mono text-xs text-gray-400">
                          Aggiungi €{(150 - totalPrice).toFixed(2)} per la
                          spedizione gratuita
                        </p>
                        <div className="mt-1.5 h-1.5 bg-gray-100 rounded overflow-hidden">
                          <div
                        className="h-full bg-gray-400 rounded transition-all"
                        style={{
                          width: `${Math.min(totalPrice / 150 * 100, 100)}%`
                        }} />

                        </div>
                      </div>
                  }

                    <div className="pt-2.5 border-t border-gray-200 flex items-center justify-between">
                      <span className="font-sans text-sm font-semibold text-gray-900">
                        Totale
                      </span>
                      <span className="font-mono text-base font-medium text-gray-900">
                        €{grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                    onClick={() => navigate('/checkout')}
                    className="w-full flex items-center justify-center gap-2 font-sans font-semibold text-sm py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors mb-2">

                      Procedi al Checkout
                      <ArrowRightIcon size={14} aria-hidden="true" />
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-3">
                      {['VISA', 'MC', 'AMEX', 'BTC'].map((method) =>
                    <span
                      key={method}
                      className="font-mono text-xs px-1.5 py-0.5 border border-dashed border-gray-300 text-gray-400 rounded">

                          {method}
                        </span>
                    )}
                    </div>
                  </div>
                </div>

                <div
                className="mt-3 bg-white border border-gray-200 rounded p-4"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <span className="font-mono text-xs text-gray-400 block mb-2">
                    Codice sconto
                  </span>
                  <div className="flex gap-2">
                    <input
                    type="text"
                    placeholder="CODICE"
                    className="flex-1 font-mono text-xs border border-gray-300 rounded px-3 py-1.5 text-gray-700 placeholder-gray-300 focus:outline-none focus:border-gray-500 bg-white"
                    aria-label="Codice sconto" />

                    <button className="font-mono text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded hover:border-gray-500 hover:text-gray-800 transition-colors">
                      Applica
                    </button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </Layout>);

}