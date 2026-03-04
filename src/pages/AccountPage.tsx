import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon,
  PackageIcon,
  MapPinIcon,
  LogOutIcon,
  SettingsIcon,
  HeartIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  ShoppingCartIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  XIcon,
  ShieldIcon,
  BellIcon,
  RefreshCwIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { SEOHead } from '../components/SEOHead';
import { toast } from '../components/Toast';
import { PRODUCTS } from '../data/store';
type Tab = 'orders' | 'addresses' | 'settings' | 'wishlist';
// Mock Data
const MOCK_ORDERS = [
{
  id: 'IST-2025-001',
  date: '15 Gen 2025',
  status: 'delivered',
  total: 110.0,
  items: [
  {
    product: PRODUCTS[0],
    quantity: 2,
    price: 42.0
  },
  {
    product: PRODUCTS[7],
    quantity: 1,
    price: 26.0
  }],

  tracking: 'BRT123456789'
},
{
  id: 'IST-2025-002',
  date: '28 Gen 2025',
  status: 'shipped',
  total: 48.5,
  items: [
  {
    product: PRODUCTS[3],
    quantity: 1,
    price: 48.5
  }],

  tracking: 'DHL987654321'
},
{
  id: 'IST-2025-003',
  date: '01 Feb 2025',
  status: 'processing',
  total: 156.0,
  items: [
  {
    product: PRODUCTS[2],
    quantity: 3,
    price: 52.0
  }]

}];

const MOCK_ADDRESSES = [
{
  id: '1',
  isDefault: true,
  firstName: 'Mario',
  lastName: 'Rossi',
  address: 'Via Roma 123',
  city: 'Roma',
  postalCode: '00100',
  country: 'Italia',
  phone: '+39 333 1234567'
},
{
  id: '2',
  isDefault: false,
  firstName: 'Mario',
  lastName: 'Rossi',
  address: 'Viale Milano 45 (Ufficio)',
  city: 'Milano',
  postalCode: '20100',
  country: 'Italia',
  phone: '+39 333 1234567'
}];

export function AccountPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const {
    items: wishlistItems,
    removeItem: removeFromWishlist,
    clearWishlist
  } = useWishlist();
  const { addItem, openDrawer } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [selectedOrder, setSelectedOrder] = useState<
    (typeof MOCK_ORDERS)[0] | null>(
    null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [emailPrefs, setEmailPrefs] = useState({
    promo: true,
    updates: true
  });
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  if (isLoading || !user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
            <span className="font-mono text-xs text-gray-500">
              Caricamento profilo...
            </span>
          </div>
        </div>
      </Layout>);

  }
  const handleLogout = () => {
    logout();
    toast.info('Disconnessione', 'Sei stato disconnesso con successo');
    navigate('/');
  };
  const handleReorder = (order: (typeof MOCK_ORDERS)[0]) => {
    order.items.forEach((item) => {
      addItem(item.product, item.quantity);
    });
    toast.success(
      'Prodotti aggiunti',
      "I prodotti dell'ordine sono stati aggiunti al carrello"
    );
    openDrawer();
  };
  const handleMoveToCart = (product: any) => {
    addItem(product, 1);
    removeFromWishlist(product.id);
    toast.success('Spostato nel carrello', product.name);
    openDrawer();
  };
  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => addItem(item, 1));
    clearWishlist();
    toast.success(
      'Wishlist svuotata',
      'Tutti i prodotti sono stati spostati nel carrello'
    );
    openDrawer();
  };
  const handleShareWishlist = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/wishlist/shared/123`
      );
      toast.success(
        'Link copiato!',
        'Il link della tua wishlist è stato copiato negli appunti'
      );
    } catch (e) {
      toast.error('Errore', 'Impossibile copiare il link');
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded">
            <CheckCircleIcon size={10} /> Consegnato
          </span>);

      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded">
            <TruckIcon size={10} /> Spedito
          </span>);

      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 font-mono text-xs px-2 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded">
            <ClockIcon size={10} /> In lavorazione
          </span>);

      default:
        return (
          <span className="font-mono text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
            {status}
          </span>);

    }
  };
  return (
    <Layout>
      <SEOHead title="Il mio Account" canonical="/account" noIndex />
      <main
        className="min-h-screen w-full cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'account'
            }]
            } />


          <div className="mb-8 mt-4 flex items-center justify-between">
            <div>
              <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
                Il mio Account
              </h1>
              <p className="font-mono text-xs text-gray-500">
                Benvenuto, {user.firstName} {user.lastName}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded hover:border-gray-500 hover:text-gray-900 transition-colors">

              <LogOutIcon size={14} />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1 space-y-4">
              <div
                className="bg-white border border-gray-200 rounded p-5"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-sans font-semibold text-gray-900 truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="font-mono text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded font-sans text-sm transition-colors ${activeTab === 'orders' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>

                    <div className="flex items-center gap-2">
                      <PackageIcon
                        size={16}
                        className={
                        activeTab === 'orders' ?
                        'text-gray-900' :
                        'text-gray-400'
                        } />

                      I miei Ordini
                    </div>
                    <ChevronRightIcon size={14} className="text-gray-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded font-sans text-sm transition-colors ${activeTab === 'addresses' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>

                    <div className="flex items-center gap-2">
                      <MapPinIcon
                        size={16}
                        className={
                        activeTab === 'addresses' ?
                        'text-gray-900' :
                        'text-gray-400'
                        } />

                      Indirizzi
                    </div>
                    <ChevronRightIcon size={14} className="text-gray-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded font-sans text-sm transition-colors ${activeTab === 'wishlist' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>

                    <div className="flex items-center gap-2">
                      <HeartIcon
                        size={16}
                        className={
                        activeTab === 'wishlist' ?
                        'text-gray-900' :
                        'text-gray-400'
                        } />

                      Wishlist
                    </div>
                    {wishlistItems.length > 0 &&
                    <span className="font-mono text-xs px-1.5 py-0.5 bg-gray-200 text-gray-700 rounded">
                        {wishlistItems.length}
                      </span>
                    }
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded font-sans text-sm transition-colors ${activeTab === 'settings' ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>

                    <div className="flex items-center gap-2">
                      <SettingsIcon
                        size={16}
                        className={
                        activeTab === 'settings' ?
                        'text-gray-900' :
                        'text-gray-400'
                        } />

                      Impostazioni
                    </div>
                    <ChevronRightIcon size={14} className="text-gray-400" />
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* TAB: ORDERS */}
              {activeTab === 'orders' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t">
                    <h2 className="font-sans font-semibold text-gray-800">
                      Storico Ordini
                    </h2>
                  </div>
                  <div className="p-0">
                    <ul className="divide-y divide-gray-100">
                      {MOCK_ORDERS.map((order) =>
                    <li
                      key={order.id}
                      className="p-5 hover:bg-gray-50 transition-colors">

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <span className="font-mono text-sm font-medium text-gray-900">
                                  {order.id}
                                </span>
                                {getStatusBadge(order.status)}
                              </div>
                              <span className="font-mono text-xs text-gray-500">
                                Effettuato il {order.date} ·{' '}
                                {order.items.length} articoli
                              </span>
                            </div>
                            <div className="text-left sm:text-right">
                              <span className="font-mono text-lg font-medium text-gray-900 block">
                                €{order.total.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <button
                          onClick={() => setSelectedOrder(order)}
                          className="font-mono text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors">

                              Dettagli ordine
                            </button>
                            <button
                          onClick={() => handleReorder(order)}
                          className="font-mono text-xs px-3 py-1.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors flex items-center gap-1.5">

                              <RefreshCwIcon size={12} />
                              Riordina
                            </button>
                          </div>
                        </li>
                    )}
                    </ul>
                  </div>
                </div>
              }

              {/* TAB: ADDRESSES */}
              {activeTab === 'addresses' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t flex justify-between items-center">
                    <h2 className="font-sans font-semibold text-gray-800">
                      Indirizzi Salvati
                    </h2>
                    <button className="font-mono text-xs px-3 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors flex items-center gap-1.5">
                      <PlusIcon size={12} />
                      Nuovo
                    </button>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_ADDRESSES.map((addr) =>
                    <div
                      key={addr.id}
                      className={`border rounded p-4 relative ${addr.isDefault ? 'border-gray-800 bg-gray-50/50' : 'border-gray-200'}`}>

                          {addr.isDefault &&
                      <span className="absolute top-3 right-3 font-mono text-xs px-1.5 py-0.5 bg-gray-800 text-white rounded">
                              Predefinito
                            </span>
                      }
                          <p className="font-sans font-semibold text-sm text-gray-900 mb-1">
                            {addr.firstName} {addr.lastName}
                          </p>
                          <p className="font-sans text-sm text-gray-600">
                            {addr.address}
                          </p>
                          <p className="font-sans text-sm text-gray-600">
                            {addr.postalCode} {addr.city}
                          </p>
                          <p className="font-sans text-sm text-gray-600 mb-1">
                            {addr.country}
                          </p>
                          <p className="font-mono text-xs text-gray-500 mb-4">
                            {addr.phone}
                          </p>
                          <div className="flex gap-3 pt-3 border-t border-dashed border-gray-200">
                            <button className="font-mono text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1">
                              <EditIcon size={12} /> Modifica
                            </button>
                            {!addr.isDefault &&
                        <button className="font-mono text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                                <TrashIcon size={12} /> Elimina
                              </button>
                        }
                          </div>
                        </div>
                    )}
                    </div>
                  </div>
                </div>
              }

              {/* TAB: SETTINGS */}
              {activeTab === 'settings' &&
              <div className="space-y-6">
                  <div
                  className="bg-white border border-gray-200 rounded"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}>

                    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t">
                      <h2 className="font-sans font-semibold text-gray-800">
                        Sicurezza
                      </h2>
                    </div>
                    <div className="p-5 space-y-6">
                      <div>
                        <h3 className="font-sans text-sm font-medium text-gray-900 mb-3">
                          Cambia Password
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                          <div>
                            <label className="font-mono text-xs text-gray-500 block mb-1">
                              Password attuale
                            </label>
                            <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full font-sans text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500" />

                          </div>
                          <div className="hidden sm:block"></div>
                          <div>
                            <label className="font-mono text-xs text-gray-500 block mb-1">
                              Nuova password
                            </label>
                            <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full font-sans text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500" />

                          </div>
                          <div>
                            <label className="font-mono text-xs text-gray-500 block mb-1">
                              Conferma password
                            </label>
                            <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full font-sans text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500" />

                          </div>
                        </div>
                        <button className="mt-3 font-mono text-xs px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors">
                          Aggiorna Password
                        </button>
                      </div>

                      <div className="pt-6 border-t border-dashed border-gray-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-sans text-sm font-medium text-gray-900 flex items-center gap-2">
                              <ShieldIcon size={16} className="text-gray-500" />
                              Autenticazione a Due Fattori (2FA)
                            </h3>
                            <p className="font-sans text-xs text-gray-500 mt-1 max-w-md">
                              Aggiungi un ulteriore livello di sicurezza al tuo
                              account richiedendo un codice dal tuo telefono
                              durante il login.
                            </p>
                          </div>
                          <button
                          onClick={() => {
                            setIs2FAEnabled(!is2FAEnabled);
                            toast.success(
                              'Impostazioni aggiornate',
                              is2FAEnabled ?
                              '2FA disabilitata' :
                              '2FA abilitata'
                            );
                          }}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${is2FAEnabled ? 'bg-gray-900' : 'bg-gray-300'}`}>

                            <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${is2FAEnabled ? 'translate-x-5' : 'translate-x-1'}`} />

                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                  className="bg-white border border-gray-200 rounded"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}>

                    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t">
                      <h2 className="font-sans font-semibold text-gray-800">
                        Preferenze Email
                      </h2>
                    </div>
                    <div className="p-5 space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                        type="checkbox"
                        checked={emailPrefs.promo}
                        onChange={(e) =>
                        setEmailPrefs((p) => ({
                          ...p,
                          promo: e.target.checked
                        }))
                        }
                        className="mt-1 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900" />

                        <div>
                          <span className="font-sans text-sm font-medium text-gray-900 block">
                            Offerte e Promozioni
                          </span>
                          <span className="font-sans text-xs text-gray-500">
                            Ricevi sconti esclusivi e novità sui prodotti.
                          </span>
                        </div>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                        type="checkbox"
                        checked={emailPrefs.updates}
                        onChange={(e) =>
                        setEmailPrefs((p) => ({
                          ...p,
                          updates: e.target.checked
                        }))
                        }
                        className="mt-1 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900" />

                        <div>
                          <span className="font-sans text-sm font-medium text-gray-900 block">
                            Aggiornamenti Ordini
                          </span>
                          <span className="font-sans text-xs text-gray-500">
                            Notifiche sullo stato di spedizione e consegna
                            (consigliato).
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              }

              {/* TAB: WISHLIST */}
              {activeTab === 'wishlist' &&
              <div
                className="bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                  <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 rounded-t flex justify-between items-center">
                    <h2 className="font-sans font-semibold text-gray-800">
                      La mia Wishlist
                    </h2>
                    {wishlistItems.length > 0 &&
                  <div className="flex gap-2">
                        <button
                      onClick={handleShareWishlist}
                      className="font-mono text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors">

                          Condividi
                        </button>
                        <button
                      onClick={handleMoveAllToCart}
                      className="font-mono text-xs px-3 py-1.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                          Sposta tutto nel carrello
                        </button>
                      </div>
                  }
                  </div>
                  <div className="p-5">
                    {wishlistItems.length === 0 ?
                  <div className="border border-dashed border-gray-300 rounded py-16 flex flex-col items-center justify-center text-center">
                        <HeartIcon size={32} className="text-gray-300 mb-4" />
                        <p className="font-sans text-sm text-gray-600 mb-1">
                          La tua wishlist è vuota
                        </p>
                        <p className="font-mono text-xs text-gray-400 mb-4">
                          Salva i prodotti che ti interessano per acquistarli in
                          seguito.
                        </p>
                        <button
                      onClick={() => navigate('/category/anabolizzanti')}
                      className="font-mono text-xs px-4 py-2 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors">

                          Esplora prodotti
                        </button>
                      </div> :

                  <ul className="divide-y divide-gray-100">
                        {wishlistItems.map((product) =>
                    <li
                      key={product.id}
                      className="py-4 flex items-center gap-4">

                            <div
                        className="w-16 h-16 border border-gray-200 rounded flex items-center justify-center flex-shrink-0 bg-gray-50 cursor-pointer"
                        onClick={() =>
                        navigate(`/product/${product.slug}`)
                        }>

                              {product.imageUrl ?
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="w-full h-full object-cover mix-blend-multiply" /> :


                        <span className="font-mono text-xs text-gray-300">
                                  IMG
                                </span>
                        }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                          className="font-sans text-sm font-medium text-gray-900 truncate cursor-pointer hover:underline"
                          onClick={() =>
                          navigate(`/product/${product.slug}`)
                          }>

                                {product.name}
                              </p>
                              <p className="font-mono text-xs text-gray-500">
                                {product.brand}
                              </p>
                              <p className="font-mono text-sm font-medium text-gray-900 mt-1">
                                €{product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <button
                          onClick={() => handleMoveToCart(product)}
                          className="font-mono text-xs px-3 py-1.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors flex items-center justify-center gap-1.5">

                                <ShoppingCartIcon size={12} />
                                <span className="hidden sm:inline">
                                  Aggiungi
                                </span>
                              </button>
                              <button
                          onClick={() => {
                            removeFromWishlist(product.id);
                            toast.info(
                              'Rimosso',
                              'Prodotto rimosso dalla wishlist'
                            );
                          }}
                          className="font-mono text-xs px-3 py-1.5 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors flex items-center justify-center">

                                <TrashIcon size={12} />
                              </button>
                            </div>
                          </li>
                    )}
                      </ul>
                  }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder &&
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedOrder(null)}>
          </div>
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div>
                  <h3 className="font-sans text-lg font-bold text-gray-900">
                    Ordine {selectedOrder.id}
                  </h3>
                  <p className="font-mono text-xs text-gray-500">
                    {selectedOrder.date}
                  </p>
                </div>
                <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors">

                  <XIcon size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Timeline */}
                <div className="mb-8">
                  <h4 className="font-sans text-sm font-semibold text-gray-900 mb-4">
                    Stato Spedizione
                  </h4>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <ul className="space-y-6 relative">
                      <li className="flex gap-4">
                        <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-600 ring-4 ring-white' : 'bg-gray-100 text-gray-400 ring-4 ring-white'}`}>

                          <CheckCircleIcon size={16} />
                        </div>
                        <div className="pt-1">
                          <p
                          className={`font-sans text-sm font-medium ${selectedOrder.status === 'delivered' ? 'text-gray-900' : 'text-gray-500'}`}>

                            Consegnato
                          </p>
                          {selectedOrder.status === 'delivered' &&
                        <p className="font-mono text-xs text-gray-500 mt-0.5">
                              Il pacco è stato consegnato al destinatario.
                            </p>
                        }
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${['shipped', 'delivered'].includes(selectedOrder.status) ? 'bg-blue-100 text-blue-600 ring-4 ring-white' : 'bg-gray-100 text-gray-400 ring-4 ring-white'}`}>

                          <TruckIcon size={16} />
                        </div>
                        <div className="pt-1">
                          <p
                          className={`font-sans text-sm font-medium ${['shipped', 'delivered'].includes(selectedOrder.status) ? 'text-gray-900' : 'text-gray-500'}`}>

                            Spedito
                          </p>
                          {['shipped', 'delivered'].includes(
                          selectedOrder.status
                        ) &&
                        <p className="font-mono text-xs text-gray-500 mt-0.5">
                              Tracking:{' '}
                              <span className="text-blue-600 underline cursor-pointer">
                                {selectedOrder.tracking}
                              </span>
                            </p>
                        }
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-white">
                          <PackageIcon size={16} />
                        </div>
                        <div className="pt-1">
                          <p className="font-sans text-sm font-medium text-gray-900">
                            Ordine Confermato
                          </p>
                          <p className="font-mono text-xs text-gray-500 mt-0.5">
                            L'ordine è stato ricevuto ed è in lavorazione.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-sans text-sm font-semibold text-gray-900 mb-3">
                    Articoli
                  </h4>
                  <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden">
                    {selectedOrder.items.map((item, i) =>
                  <li
                    key={i}
                    className="p-3 flex items-center gap-3 bg-white">

                        <div className="w-12 h-12 border border-gray-200 rounded flex items-center justify-center flex-shrink-0 bg-gray-50">
                          {item.product.imageUrl ?
                      <img
                        src={item.product.imageUrl}
                        alt=""
                        className="w-full h-full object-cover mix-blend-multiply" /> :


                      <span className="font-mono text-xs text-gray-300">
                              IMG
                            </span>
                      }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-sans text-sm font-medium text-gray-900 truncate">
                            {item.product.name}
                          </p>
                          <span className="font-mono text-xs text-gray-500">
                            Qtà: {item.quantity}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-medium text-gray-900">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                  )}
                    <li className="p-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                      <span className="font-sans text-sm font-medium text-gray-700">
                        Totale Ordine
                      </span>
                      <span className="font-mono text-lg font-bold text-gray-900">
                        €{selectedOrder.total.toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                <button
                onClick={() => setSelectedOrder(null)}
                className="font-mono text-xs px-4 py-2 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors">

                  Chiudi
                </button>
                <button
                onClick={() => {
                  handleReorder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="font-mono text-xs px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors flex items-center gap-1.5">

                  <RefreshCwIcon size={14} />
                  Riordina tutto
                </button>
              </div>
            </div>
          </div>
        }
      </main>
    </Layout>);

}