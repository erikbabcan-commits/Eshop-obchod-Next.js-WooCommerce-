import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  Fragment,
  Component } from
'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  TagIcon,
  CopyIcon,
  CheckIcon,
  BellIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { JsonLdPanel } from '../components/JsonLdPanel';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { PRODUCTS, CATEGORIES, getProductBySlug } from '../data/store';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import type { JsonLdProduct, Product } from '../types';
const MAX_QUANTITY = 10;
const DELIVERY_COUNTRIES = [
{
  code: 'IT',
  label: 'Italia',
  days: '2-3 giorni lavorativi',
  shipping: 4.9
},
{
  code: 'DE',
  label: 'Germania',
  days: '4-7 giorni lavorativi',
  shipping: 9.9
},
{
  code: 'FR',
  label: 'Francia',
  days: '4-7 giorni lavorativi',
  shipping: 9.9
},
{
  code: 'ES',
  label: 'Spagna',
  days: '4-7 giorni lavorativi',
  shipping: 9.9
},
{
  code: 'AT',
  label: 'Austria',
  days: '4-7 giorni lavorativi',
  shipping: 9.9
},
{
  code: 'CH',
  label: 'Svizzera',
  days: '5-10 giorni lavorativi',
  shipping: 14.9
}];

function buildJsonLd(product: Product): JsonLdProduct {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    brand: {
      '@type': 'Organization',
      name: product.brand
    },
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: `https://schema.org/${product.availability}`,
      url: `https://isteroidi.it/prodotti/${product.slug}`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: String(product.reviewCount)
    }
  };
}
export function ProductPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const { addItem, openDrawer } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist
  } = useWishlist();
  const { products: recentlyViewedProducts, addProduct: addToRecentlyViewed } =
  useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    'descrizione' | 'scheda' | 'recensioni'>(
    'descrizione');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [deliveryCountry, setDeliveryCountry] = useState('IT');
  const [showCopied, setShowCopied] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const addToCartRef = useRef<HTMLButtonElement>(null);
  const product = getProductBySlug(slug ?? '');
  // Add to recently viewed on mount
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.slug);
    }
  }, [product?.slug, addToRecentlyViewed]);
  // Intersection observer for sticky mobile bar
  useEffect(() => {
    if (!addToCartRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      {
        threshold: 0
      }
    );
    observer.observe(addToCartRef.current);
    return () => observer.disconnect();
  }, [product]);
  if (!product) {
    return (
      <Layout>
        <div className="max-w-screen-xl mx-auto px-6 py-16 text-center">
          <p className="font-sans text-gray-500 mb-4">
            Prodotto non trovato: {slug}
          </p>
          <button
            onClick={() => navigate('/')}
            className="font-mono text-xs px-4 py-2 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors">

            ← Torna alla Home
          </button>
        </div>
      </Layout>);

  }
  const category = CATEGORIES.find((c) => c.slug === product.category);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  const bundleProducts = PRODUCTS.filter(
    (p) =>
    p.category === product.category &&
    p.id !== product.id &&
    p.availability === 'InStock'
  ).slice(0, 2);
  const jsonLd = buildJsonLd(product);
  const discount = product.originalPrice ?
  Math.round(
    (product.originalPrice - product.price) / product.originalPrice * 100
  ) :
  null;
  const inWishlist = isInWishlist(product.id);
  const isInStock = product.availability === 'InStock';
  // Recently viewed excluding current product
  const recentlyViewed = recentlyViewedProducts.
  filter((p) => p.slug !== product.slug).
  slice(0, 8);
  // Delivery info
  const selectedDelivery =
  DELIVERY_COUNTRIES.find((c) => c.code === deliveryCountry) ??
  DELIVERY_COUNTRIES[0];
  const freeShipping = product.price * quantity >= 100;
  // Bundle calculation
  const bundleTotal =
  product.price + bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = bundleTotal * 0.05;
  const bundleFinalPrice = bundleTotal - bundleDiscount;
  // Image gallery (mock 4 images)
  const images = [product.imageUrl || null, null, null, null];
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy URL:', e);
    }
  };
  const handleShareWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Guarda questo prodotto: ${product.name}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };
  const handleShareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}`, '_blank');
  };
  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotifySubmitted(true);
    }
  };
  const handleAddBundle = () => {
    addItem(product, 1);
    bundleProducts.forEach((p) => addItem(p, 1));
    openDrawer();
  };
  return (
    <Layout>
      <SEOHead
        title={product.name}
        description={product.shortDescription}
        canonical={`/product/${slug}`}
        ogType="product" />

      <main
        className="min-h-screen w-full pb-20 lg:pb-0 cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'categorie'
            },
            {
              label: category?.slug ?? product.category,
              onClick: () => navigate(`/category/${product.category}`)
            },
            {
              label: product.slug
            }]
            } />


          {/* Main product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left: Image Gallery */}
            <div className="lg:col-span-4">
              {/* Main image */}
              <div
                className="bg-white border border-gray-200 rounded h-96 flex items-center justify-center overflow-hidden relative cursor-zoom-in"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}>

                {images[selectedImageIndex] ?
                <img
                  src={images[selectedImageIndex]!}
                  alt={product.imageAlt}
                  className={`w-full h-full object-cover mix-blend-multiply transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`} /> :


                <div className="text-center">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center mx-auto mb-3">
                      <span className="font-mono text-xs text-gray-300">
                        IMG
                      </span>
                    </div>
                    <span className="font-mono text-xs text-gray-300 block max-w-48 text-center leading-relaxed">
                      {product.imageAlt}
                    </span>
                  </div>
                }
                {discount &&
                <span className="absolute top-3 left-3 font-mono text-xs px-2 py-1 bg-gray-800 text-white rounded">
                    -{discount}%
                  </span>
                }
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-2">
                {images.map((img, i) =>
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`flex-1 h-16 border rounded flex items-center justify-center overflow-hidden transition-colors ${i === selectedImageIndex ? 'border-gray-800 bg-gray-50' : 'border-dashed border-gray-300 hover:border-gray-400'}`}>

                    {img ?
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover mix-blend-multiply" /> :


                  <span className="font-mono text-xs text-gray-300">
                        {i + 1}
                      </span>
                  }
                  </button>
                )}
              </div>
            </div>

            {/* Center: Product info */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-xs text-gray-400">
                  {product.brand}
                </span>
                <span className="font-mono text-xs text-gray-300">·</span>
                <span className="font-mono text-xs px-1.5 py-0.5 border border-dashed border-gray-300 text-gray-400 rounded">
                  {product.category}
                </span>
                {product.availability === 'InStock' &&
                <span className="font-mono text-xs px-1.5 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 rounded">
                    ✓ In Stock
                  </span>
                }
                {product.availability === 'OutOfStock' &&
                <span className="font-mono text-xs px-1.5 py-0.5 bg-red-50 border border-red-200 text-red-600 rounded">
                    Esaurito
                  </span>
                }
                {product.availability === 'PreOrder' &&
                <span className="font-mono text-xs px-1.5 py-0.5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded">
                    Pre-ordine
                  </span>
                }
              </div>

              <h1 className="font-sans text-2xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) =>
                  <StarIcon
                    key={star}
                    size={14}
                    className={
                    star <= Math.round(product.rating) ?
                    'text-gray-700 fill-gray-700' :
                    'text-gray-300'
                    } />

                  )}
                </div>
                <span className="font-mono text-xs text-gray-500">
                  {product.rating} · {product.reviewCount} recensioni
                </span>
                <span className="font-mono text-xs text-gray-300">·</span>
                <span className="font-mono text-xs text-gray-400">
                  SKU: {product.sku}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-200">
                <span className="font-mono text-3xl font-medium text-gray-900">
                  €{product.price.toFixed(2)}
                </span>
                {product.originalPrice &&
                <>
                    <span className="font-mono text-base text-gray-400 line-through">
                      €{product.originalPrice.toFixed(2)}
                    </span>
                    <span className="font-mono text-sm px-2 py-0.5 bg-gray-800 text-white rounded">
                      -{discount}%
                    </span>
                  </>
                }
              </div>

              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                {product.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {product.tags.map((tag) =>
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 border border-dashed border-gray-300 text-gray-400 rounded">

                    <TagIcon size={9} className="inline mr-0.5" />
                    {tag}
                  </span>
                )}
              </div>

              {/* Add to cart section */}
              {isInStock ?
              <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-2 font-mono text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">

                      −
                    </button>
                    <span className="px-4 py-2 font-mono text-sm text-gray-800 border-x border-gray-300 min-w-12 text-center">
                      {quantity}
                    </span>
                    <button
                    onClick={() =>
                    setQuantity(Math.min(MAX_QUANTITY, quantity + 1))
                    }
                    disabled={quantity >= MAX_QUANTITY}
                    className="px-3 py-2 font-mono text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50">

                      +
                    </button>
                  </div>

                  <button
                  ref={addToCartRef}
                  onClick={() => {
                    addItem(product, quantity);
                    openDrawer();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 font-sans font-semibold text-sm px-6 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                    <ShoppingCartIcon size={16} />
                    Aggiungi al Carrello
                  </button>

                  <button
                  onClick={() =>
                  inWishlist ?
                  removeFromWishlist(product.id) :
                  addToWishlist(product)
                  }
                  className={`p-2.5 border rounded transition-colors ${inWishlist ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500'}`}>

                    <HeartIcon
                    size={16}
                    className={inWishlist ? 'fill-current' : ''} />

                  </button>
                </div> /* Out of stock notification */ :

              <div className="mb-4 p-4 border border-dashed border-gray-300 rounded bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <BellIcon size={16} className="text-gray-500" />
                    <span className="font-sans text-sm font-medium text-gray-700">
                      Avvisami quando disponibile
                    </span>
                  </div>
                  {notifySubmitted ?
                <div className="flex items-center gap-2 text-gray-600">
                      <CheckIcon size={16} className="text-gray-600" />
                      <span className="font-mono text-xs">
                        Ti avviseremo quando il prodotto sarà disponibile!
                      </span>
                    </div> :

                <form onSubmit={handleNotifySubmit} className="flex gap-2">
                      <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="La tua email"
                    required
                    className="flex-1 font-mono text-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-500" />

                      <button
                    type="submit"
                    className="font-mono text-xs px-4 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                        Avvisami
                      </button>
                    </form>
                }
                </div>
              }

              {/* Share buttons */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-gray-400">
                  Condividi:
                </span>
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center gap-1.5 font-mono text-xs px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 hover:border-gray-500 transition-colors">

                  {showCopied ?
                  <CheckIcon size={12} /> :

                  <CopyIcon size={12} />
                  }
                  {showCopied ? 'Copiato!' : 'Copia URL'}
                </button>
                <button
                  onClick={handleShareWhatsApp}
                  className="font-mono text-xs px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 hover:border-gray-500 transition-colors">

                  WhatsApp
                </button>
                <button
                  onClick={handleShareTelegram}
                  className="font-mono text-xs px-2.5 py-1.5 border border-gray-300 rounded text-gray-600 hover:border-gray-500 transition-colors">

                  Telegram
                </button>
              </div>

              {/* Delivery estimate */}
              <div
                className="p-4 border border-gray-200 rounded bg-white mb-4"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                <div className="flex items-center gap-2 mb-3">
                  <TruckIcon size={14} className="text-gray-500" />
                  <span className="font-mono text-xs font-medium text-gray-700">
                    Stima consegna
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <select
                    value={deliveryCountry}
                    onChange={(e) => setDeliveryCountry(e.target.value)}
                    className="font-mono text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-gray-500">

                    {DELIVERY_COUNTRIES.map((c) =>
                    <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    )}
                  </select>
                  <span className="font-mono text-xs text-gray-600">
                    {selectedDelivery.days}
                  </span>
                </div>
                <div className="font-mono text-xs text-gray-500">
                  Spedizione:{' '}
                  {freeShipping ?
                  <span className="text-gray-800 font-medium">Gratuita</span> :

                  `€${selectedDelivery.shipping.toFixed(2)}`
                  }
                  {!freeShipping &&
                  <span className="text-gray-400 ml-1">
                      (gratis sopra €100)
                    </span>
                  }
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-dashed border-gray-200">
                <div className="flex items-center gap-1.5">
                  <TruckIcon size={13} className="text-gray-400" />
                  <span className="font-mono text-xs text-gray-400">
                    Spedizione 24h
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheckIcon size={13} className="text-gray-400" />
                  <span className="font-mono text-xs text-gray-400">
                    Pagamento sicuro
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCwIcon size={13} className="text-gray-400" />
                  <span className="font-mono text-xs text-gray-400">
                    Reso 30 giorni
                  </span>
                </div>
              </div>
            </div>

            {/* Right: JSON-LD panel */}
            <div className="lg:col-span-3">
              <JsonLdPanel data={jsonLd} />
              <div
                className="mt-3 bg-white border border-gray-200 rounded p-3"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                <span className="font-mono text-xs text-gray-400 block mb-2">
                  canonical url
                </span>
                <span className="font-mono text-xs text-gray-600 break-all block mb-3">
                  https://isteroidi.it/prodotti/{product.slug}
                </span>
                <span className="font-mono text-xs text-gray-400 block mb-1.5">
                  hreflang alternates
                </span>
                <div className="flex flex-wrap gap-1">
                  {['it', 'en', 'de', 'fr', 'es'].map((lang) =>
                  <span
                    key={lang}
                    className="font-mono text-xs px-1.5 py-0.5 border border-gray-200 text-gray-400 rounded">

                      {lang}
                    </span>
                  )}
                  <span className="font-mono text-xs text-gray-300">+9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle section */}
          {bundleProducts.length === 2 && isInStock &&
          <section
            className="bg-white border border-gray-200 rounded mb-8 p-5"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

              <h2 className="font-sans text-lg font-semibold text-gray-900 mb-4">
                Spesso Acquistati Insieme
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 border border-gray-200 rounded flex items-center justify-center overflow-hidden bg-gray-50">
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
                  <span className="font-sans text-sm text-gray-700 max-w-32 line-clamp-2">
                    {product.name}
                  </span>
                </div>
                {bundleProducts.map((bp, i) =>
              <Fragment key={bp.id}>
                    <PlusIcon size={16} className="text-gray-400" />
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 border border-gray-200 rounded flex items-center justify-center overflow-hidden bg-gray-50">
                        {bp.imageUrl ?
                    <img
                      src={bp.imageUrl}
                      alt=""
                      className="w-full h-full object-cover mix-blend-multiply" /> :


                    <span className="font-mono text-xs text-gray-300">
                            IMG
                          </span>
                    }
                      </div>
                      <span className="font-sans text-sm text-gray-700 max-w-32 line-clamp-2">
                        {bp.name}
                      </span>
                    </div>
                  </Fragment>
              )}
                <div className="ml-auto flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono text-xs text-gray-400 line-through block">
                      €{bundleTotal.toFixed(2)}
                    </span>
                    <span className="font-mono text-xl font-medium text-gray-900">
                      €{bundleFinalPrice.toFixed(2)}
                    </span>
                    <span className="font-mono text-xs text-gray-500 block">
                      Risparmi €{bundleDiscount.toFixed(2)} (5%)
                    </span>
                  </div>
                  <button
                  onClick={handleAddBundle}
                  className="font-sans font-semibold text-sm px-5 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                    Aggiungi Bundle
                  </button>
                </div>
              </div>
            </section>
          }

          {/* Tabs */}
          <div
            className="bg-white border border-gray-200 rounded mb-8"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="flex border-b border-gray-200">
              {(['descrizione', 'scheda', 'recensioni'] as const).map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-mono text-xs px-5 py-3 border-b-2 transition-colors ${activeTab === tab ? 'border-gray-800 text-gray-800 font-medium' : 'border-transparent text-gray-400 hover:text-gray-600'}`}>

                  {tab === 'descrizione' && 'Descrizione'}
                  {tab === 'scheda' && 'Scheda Tecnica'}
                  {tab === 'recensioni' &&
                `Recensioni (${product.reviewCount})`}
                </button>
              )}
            </div>
            <div className="p-6">
              {activeTab === 'descrizione' &&
              <div className="max-w-3xl">
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              }
              {activeTab === 'scheda' &&
              <div className="max-w-2xl">
                  <table className="w-full text-sm">
                    <tbody>
                      {[
                    {
                      label: 'Nome prodotto',
                      value: product.name
                    },
                    {
                      label: 'Brand / Produttore',
                      value: product.brand
                    },
                    {
                      label: 'Categoria',
                      value: category?.label ?? product.category
                    },
                    {
                      label: 'SKU',
                      value: product.sku
                    },
                    {
                      label: 'Disponibilità',
                      value:
                      product.availability === 'InStock' ?
                      'Disponibile' :
                      product.availability === 'OutOfStock' ?
                      'Esaurito' :
                      'Pre-ordine'
                    },
                    {
                      label: 'Prezzo',
                      value: `€${product.price.toFixed(2)}`
                    },
                    {
                      label: 'Valutazione media',
                      value: `${product.rating}/5 (${product.reviewCount} recensioni)`
                    }].
                    map((row) =>
                    <tr
                      key={row.label}
                      className="border-b border-gray-100 last:border-0">

                          <td className="py-2.5 pr-4 font-mono text-xs text-gray-400 w-48">
                            {row.label}
                          </td>
                          <td className="py-2.5 font-sans text-sm text-gray-700">
                            {row.value}
                          </td>
                        </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              }
              {activeTab === 'recensioni' &&
              <div className="max-w-2xl">
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="text-center">
                      <span className="font-mono text-5xl font-medium text-gray-900 block">
                        {product.rating}
                      </span>
                      <div className="flex items-center gap-0.5 justify-center my-1">
                        {[1, 2, 3, 4, 5].map((star) =>
                      <StarIcon
                        key={star}
                        size={14}
                        className={
                        star <= Math.round(product.rating) ?
                        'text-gray-700 fill-gray-700' :
                        'text-gray-300'
                        } />

                      )}
                      </div>
                      <span className="font-mono text-xs text-gray-400">
                        {product.reviewCount} recensioni
                      </span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((stars) =>
                    <div key={stars} className="flex items-center gap-2">
                          <span className="font-mono text-xs text-gray-400 w-4">
                            {stars}
                          </span>
                          <div className="flex-1 h-2 bg-gray-100 rounded overflow-hidden">
                            <div
                          className="h-full bg-gray-400 rounded"
                          style={{
                            width: `${stars === 5 ? 72 : stars === 4 ? 18 : stars === 3 ? 7 : 2}%`
                          }} />

                          </div>
                          <span className="font-mono text-xs text-gray-300 w-8 text-right">
                            {stars === 5 ?
                        '72%' :
                        stars === 4 ?
                        '18%' :
                        stars === 3 ?
                        '7%' :
                        stars === 2 ?
                        '2%' :
                        '1%'}
                          </span>
                        </div>
                    )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                  {
                    author: 'Marco R.',
                    rating: 5,
                    date: '2025-11-12',
                    text: 'Prodotto originale, spedizione veloce. Risultati ottimi dopo 8 settimane di ciclo.'
                  },
                  {
                    author: 'Luca M.',
                    rating: 5,
                    date: '2025-10-28',
                    text: 'Qualità eccellente, come sempre da questo fornitore. Consigliato.'
                  },
                  {
                    author: 'Andrea P.',
                    rating: 4,
                    date: '2025-10-05',
                    text: "Buon prodotto, spedizione un po' lenta ma packaging discreto."
                  }].
                  map((review, i) =>
                  <div
                    key={i}
                    className="border border-gray-100 rounded p-4">

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-sm font-medium text-gray-700">
                              {review.author}
                            </span>
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) =>
                          <StarIcon
                            key={s}
                            size={11}
                            className={
                            s <= review.rating ?
                            'text-gray-700 fill-gray-700' :
                            'text-gray-300'
                            } />

                          )}
                            </div>
                          </div>
                          <span className="font-mono text-xs text-gray-400">
                            {review.date}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-gray-600">
                          {review.text}
                        </p>
                      </div>
                  )}
                  </div>
                </div>
              }
            </div>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 &&
          <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-sans text-lg font-semibold text-gray-900">
                  Prodotti Correlati
                </h2>
                <button
                onClick={() => navigate(`/category/${product.category}`)}
                className="font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors">

                  Vedi tutti in {category?.label} →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map((p) =>
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => navigate(`/product/${p.slug}`)} />

              )}
              </div>
            </section>
          }

          {/* Recently viewed */}
          {recentlyViewed.length > 0 &&
          <section>
              <h2 className="font-sans text-lg font-semibold text-gray-900 mb-4">
                Prodotti Visti di Recente
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                {recentlyViewed.map((p) =>
              <div key={p.id} className="flex-shrink-0 w-64">
                    <ProductCard
                  product={p}
                  onClick={() => navigate(`/product/${p.slug}`)} />

                  </div>
              )}
              </div>
            </section>
          }
        </div>

        {/* Sticky mobile add-to-cart bar */}
        {isInStock &&
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 lg:hidden transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
          style={{
            boxShadow: '0 -4px 12px rgba(0,0,0,0.1)'
          }}>

            <div className="flex items-center gap-3 max-w-screen-xl mx-auto">
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="font-mono text-base font-medium text-gray-900">
                  €{product.price.toFixed(2)}
                </p>
              </div>
              <button
              onClick={() => {
                addItem(product, 1);
                openDrawer();
              }}
              className="flex items-center gap-2 font-sans font-semibold text-sm px-5 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                <ShoppingCartIcon size={16} />
                Aggiungi
              </button>
            </div>
          </div>
        }
      </main>
    </Layout>);

}