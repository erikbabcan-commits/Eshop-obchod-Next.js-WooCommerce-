import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  XIcon,
  ShoppingCartIcon,
  TrashIcon,
  PackageIcon,
  ChevronRightIcon,
  TruckIcon } from
'lucide-react';
import { useCart } from '../context/CartContext';
const FREE_SHIPPING_THRESHOLD = 100;
export function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    totalItems,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity
  } = useCart();
  if (!isDrawerOpen) return null;
  const handleCheckout = () => {
    closeDrawer();
    navigate('/checkout');
  };
  const handleViewCart = () => {
    closeDrawer();
    navigate('/cart');
  };
  // Calculate savings
  const totalOriginalPrice = items.reduce((sum, item) => {
    const price = item.product.originalPrice || item.product.price;
    return sum + price * item.quantity;
  }, 0);
  const savings = totalOriginalPrice - totalPrice;
  const progressToFreeShipping = Math.min(
    totalPrice / FREE_SHIPPING_THRESHOLD * 100,
    100
  );
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0);
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-primary-dark/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeDrawer}
        aria-hidden="true" />


      {/* Drawer panel */}
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-drawer animate-slide-in-right pb-safe"
        role="dialog"
        aria-modal="true"
        aria-label="Carrello">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white relative overflow-hidden cubes-overlay-light">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 bg-primary/5 rounded-full flex items-center justify-center">
              <ShoppingCartIcon
                size={16}
                className="text-primary"
                aria-hidden="true" />

            </div>
            <span className="font-sans text-lg font-bold text-primary">
              Il tuo Carrello
            </span>
            {totalItems > 0 &&
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-accent text-white rounded-full">
                {totalItems}
              </span>
            }
          </div>
          <button
            onClick={closeDrawer}
            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-full transition-colors relative z-10"
            aria-label="Chiudi carrello">

            <XIcon size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 &&
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <TruckIcon
              size={14}
              className={
              amountToFreeShipping === 0 ? 'text-success' : 'text-gray-500'
              } />

              <span className="font-sans text-sm font-medium text-gray-700">
                {amountToFreeShipping === 0 ?
              <span className="text-success">
                    Hai sbloccato la spedizione gratuita!
                  </span> :

              `Mancano €${amountToFreeShipping.toFixed(2)} per la spedizione gratuita`
              }
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${amountToFreeShipping === 0 ? 'bg-success' : 'bg-primary'}`}
              style={{
                width: `${progressToFreeShipping}%`
              }} />

            </div>
          </div>
        }

        {/* Items */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {items.length === 0 ?
          <div className="flex flex-col items-center justify-center h-full py-16 px-6 animate-fade-up">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ShoppingCartIcon
                size={32}
                className="text-gray-300"
                aria-hidden="true" />

              </div>
              <h3 className="font-sans text-lg font-bold text-primary mb-2 text-center">
                Il carrello è vuoto
              </h3>
              <p className="font-sans text-sm text-gray-500 mb-8 text-center max-w-[250px]">
                Non hai ancora aggiunto nessun prodotto al tuo carrello.
              </p>
              <button
              onClick={closeDrawer}
              className="font-sans font-semibold text-sm px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition-colors shadow-md hover:shadow-lg">

                Inizia lo Shopping
              </button>
            </div> :

          <ul className="divide-y divide-gray-100" role="list">
              {items.map((item, index) =>
            <li
              key={item.product.id}
              className="px-6 py-5 animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`
              }}>

                  <div className="flex gap-4">
                    <div className="w-20 h-20 border border-gray-100 rounded-md flex items-center justify-center flex-shrink-0 bg-gray-50 overflow-hidden">
                      {item.product.imageUrl ?
                  <img
                    src={item.product.imageUrl}
                    alt=""
                    className="w-full h-full object-cover mix-blend-multiply" /> :


                  <span className="font-mono text-[10px] text-gray-300">
                          IMG
                        </span>
                  }
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <p className="font-sans text-sm font-bold text-primary leading-snug line-clamp-2">
                          {item.product.name}
                        </p>
                        <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1 text-gray-300 hover:text-error transition-colors -mt-1 -mr-1"
                      aria-label={`Rimuovi ${item.product.name}`}>

                          <TrashIcon size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-mono text-[11px] text-gray-500 mb-auto">
                        {item.product.brand}
                      </span>

                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                          <button
                        onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors"
                        aria-label="Diminuisci quantità">

                            −
                          </button>
                          <span className="px-3 py-1.5 font-mono text-xs font-medium text-primary border-x border-gray-100 min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                        onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors"
                        aria-label="Aumenta quantità">

                            +
                          </button>
                        </div>

                        <div className="flex flex-col items-end">
                          {item.product.originalPrice &&
                      <span className="font-mono text-[10px] text-gray-500 line-through mb-0.5">
                              €
                              {(
                        item.product.originalPrice * item.quantity).
                        toFixed(2)}
                            </span>
                      }
                          <span className="font-mono text-sm font-bold text-primary">
                            €{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
            )}
            </ul>
          }
        </div>

        {/* Footer */}
        {items.length > 0 &&
        <div className="border-t border-gray-100 bg-white px-6 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-10">
            {savings > 0 &&
          <div className="flex items-center justify-between mb-3 px-3 py-2 bg-success-light rounded-md text-success border border-success/20">
                <span className="font-sans text-sm font-medium">Risparmi</span>
                <span className="font-mono text-sm font-bold">
                  -€{savings.toFixed(2)}
                </span>
              </div>
          }

            <div className="flex items-center justify-between mb-5">
              <span className="font-sans text-base font-medium text-gray-600">
                Totale{' '}
                <span className="text-sm font-normal text-gray-400">
                  ({totalItems} articoli)
                </span>
              </span>
              <span className="font-mono text-2xl font-bold text-primary">
                €{totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 font-sans font-bold text-base py-3.5 bg-accent text-white rounded-md hover:bg-accent-hover transition-colors shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">

                Procedi al Checkout
                <ChevronRightIcon size={18} />
              </button>
              <button
              onClick={handleViewCart}
              className="w-full font-sans font-medium text-sm py-3 border border-gray-200 text-gray-700 rounded-md hover:border-gray-300 hover:bg-gray-50 transition-colors">

                Visualizza Carrello
              </button>
            </div>

            <p className="font-sans text-[11px] text-gray-500 mt-4 text-center">
              Spedizione e tasse calcolate al checkout. Pagamenti sicuri al
              100%.
            </p>
          </div>
        }
      </aside>
    </>);

}