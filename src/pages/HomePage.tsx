import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  BuildingIcon,
  PackageIcon,
  GlobeIcon,
  ShieldCheckIcon,
  MailIcon,
  CheckIcon,
  StarIcon,
  ClockIcon,
  ChevronRightIcon,
  ChevronLeftIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { CATEGORIES, PRODUCTS, BRANDS } from '../data/store';
import type { Product } from '../types';
const FEATURED_PRODUCT_IDS = ['p001', 'p003', 'p005', 'p006'];
const FLASH_SALE_IDS = ['p002', 'p004', 'p007', 'p008'];
export function HomePage() {
  const navigate = useNavigate();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const featuredProducts = FEATURED_PRODUCT_IDS.map((id) =>
  PRODUCTS.find((p) => p.id === id)
  ).filter(Boolean) as Product[];
  const flashSaleProducts = FLASH_SALE_IDS.map((id) =>
  PRODUCTS.find((p) => p.id === id)
  ).filter(Boolean) as Product[];
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
    }
  };
  return (
    <Layout>
      <SEOHead
        title="Home"
        description="ISTEROIDI — Il miglior negozio online di farmaci per la performance. Steroidi anabolizzanti, ormoni, peptidi e integratori per atleti e bodybuilder. Qualità farmaceutica certificata."
        canonical="/" />

      <main className="min-h-screen w-full bg-surface-bg">
        {/* Hero Section */}
        <section className="relative bg-primary overflow-hidden cubes-overlay">
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[2]">
            <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-accent/20 blur-[120px] mix-blend-screen animate-pulse-soft"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen"></div>
          </div>

          <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16 lg:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 animate-fade-up">
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-success animate-pulse"></span>
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    Qualità Farmaceutica 100%
                  </span>
                </div>

                <h1 className="font-sans text-[40px] lg:text-[64px] font-black text-white leading-tight mb-6 tracking-tight">
                  Eleva la tua <br />
                  <span className="text-gradient-accent">Performance</span>
                </h1>

                <p className="font-sans text-lg lg:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                  Il punto di riferimento in Europa per steroidi anabolizzanti,
                  ormoni e peptidi. Prodotti originali certificati per atleti e
                  bodybuilder professionisti.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => navigate('/category/anabolizzanti')}
                    className="w-full sm:w-auto h-12 font-sans font-bold text-base px-8 bg-accent text-white rounded-lg hover:bg-accent-hover transition-all shadow-lg hover:shadow-accent/30 hover:-translate-y-1 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary">

                    Esplora il Catalogo <ArrowRightIcon size={20} />
                  </button>
                  <button
                    onClick={() => navigate('/category/pct')}
                    className="w-full sm:w-auto h-12 font-sans font-bold text-base px-8 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary">

                    Terapia Post Ciclo (PCT)
                  </button>
                </div>

                <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8">
                  <div>
                    <span className="font-mono text-[32px] font-black text-white block mb-1 leading-tight">
                      +{PRODUCTS.length}
                    </span>
                    <span className="font-sans text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Prodotti Premium
                    </span>
                  </div>
                  <div className="w-px h-12 bg-white/10"></div>
                  <div>
                    <span className="font-mono text-[32px] font-black text-white block mb-1 leading-tight">
                      24h
                    </span>
                    <span className="font-sans text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Spedizione Discreta
                    </span>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden sm:block"></div>
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((i) =>
                      <StarIcon
                        key={i}
                        size={16}
                        className="text-warning fill-warning" />

                      )}
                    </div>
                    <span className="font-sans text-xs font-medium text-gray-300 uppercase tracking-wider">
                      4.9/5 da 10k+ clienti
                    </span>
                  </div>
                </div>
              </div>

              {/* Hero Image/Graphic */}
              <div
                className="lg:col-span-5 hidden lg:block relative animate-fade-in"
                style={{
                  animationDelay: '200ms'
                }}>

                <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 backdrop-blur-md p-8 flex flex-col items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[url('https://cdn.magicpatterns.com/uploads/43mKgsHJDRTz1x3XDaKX5y/image.png')] bg-[length:200px_auto] bg-repeat opacity-25 mix-blend-overlay rounded-2xl"></div>
                  <ShieldCheckIcon
                    size={120}
                    className="text-accent/80 mb-6 drop-shadow-[0_0_30px_rgba(233,69,96,0.5)]"
                    strokeWidth={1} />

                  <h3 className="font-sans text-2xl font-bold text-white mb-2 text-center">
                    Autenticità Garantita
                  </h3>
                  <p className="font-sans text-sm text-gray-300 text-center">
                    Tutti i nostri prodotti possono essere verificati sul sito
                    ufficiale del produttore tramite codice univoco.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="bg-white border-b border-gray-100 shadow-sm relative z-20 cubes-overlay-light">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                  <ShieldCheckIcon size={20} />
                </div>
                <div>
                  <span className="font-sans text-sm font-bold text-primary block">
                    Qualità Farmaceutica
                  </span>
                  <span className="font-sans text-xs text-gray-500">
                    Prodotti 100% originali
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                  <PackageIcon size={20} />
                </div>
                <div>
                  <span className="font-sans text-sm font-bold text-primary block">
                    Spedizione Discreta
                  </span>
                  <span className="font-sans text-xs text-gray-500">
                    Imballaggio anonimo sicuro
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                  <GlobeIcon size={20} />
                </div>
                <div>
                  <span className="font-sans text-sm font-bold text-primary block">
                    Consegna in Europa
                  </span>
                  <span className="font-sans text-xs text-gray-500">
                    Spedizioni tracciate 24/48h
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                  <BuildingIcon size={20} />
                </div>
                <div>
                  <span className="font-sans text-sm font-bold text-primary block">
                    Marchi Certificati
                  </span>
                  <span className="font-sans text-xs text-gray-500">
                    Balkan, Magnus, Hilma
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16 space-y-16">
          {/* Flash Sale Section */}
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
                    Offerte a Tempo
                  </span>
                </div>
                <h2 className="font-sans text-3xl font-black text-primary">
                  Flash Sale
                </h2>
              </div>

              <div className="flex items-center gap-4 bg-white px-4 h-10 rounded-lg shadow-sm border border-gray-100">
                <ClockIcon size={18} className="text-accent" />
                <div className="flex items-center gap-1 font-mono text-lg font-bold text-primary">
                  <span className="bg-gray-100 px-2 py-1 rounded">12</span>:
                  <span className="bg-gray-100 px-2 py-1 rounded">45</span>:
                  <span className="bg-gray-100 px-2 py-1 rounded text-accent">
                    30
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) =>
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.slug}`)} />

              )}
            </div>
          </section>

          {/* Categories Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-sans text-3xl font-black text-primary">
                Esplora per Categoria
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CATEGORIES.slice(0, 8).map((cat, idx) =>
              <button
                key={cat.slug}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="relative overflow-hidden bg-white rounded-xl p-6 text-left group shadow-sm hover:shadow-card-hover transition-all duration-300 border border-gray-100 min-h-[160px] flex flex-col justify-between cubes-overlay-light focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>

                  <div className="relative z-10">
                    <h3 className="font-sans text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {cat.label}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between mt-4">
                    <span className="font-mono text-xs font-bold text-gray-500">
                      {cat.productCount} prodotti
                    </span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors text-gray-500">
                      <ArrowRightIcon size={14} />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </section>

          {/* Featured Products */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-sans text-3xl font-black text-primary mb-2">
                  I Più Venduti
                </h2>
                <p className="font-sans text-gray-500">
                  I prodotti preferiti dai nostri clienti
                </p>
              </div>
              <button
                onClick={() => navigate('/category/anabolizzanti')}
                className="hidden sm:flex items-center gap-2 font-sans font-bold text-sm text-primary hover:text-accent transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                Vedi tutti <ArrowRightIcon size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) =>
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.slug}`)} />

              )}
            </div>

            <button
              onClick={() => navigate('/category/anabolizzanti')}
              className="sm:hidden w-full mt-6 h-12 flex items-center justify-center gap-2 font-sans font-bold text-sm bg-white border border-gray-200 rounded-lg text-primary hover:text-accent transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

              Vedi tutti i bestseller <ArrowRightIcon size={16} />
            </button>
          </section>

          {/* Brands Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-sans text-3xl font-black text-primary">
                Marchi Premium
              </h2>
              <button
                onClick={() => navigate('/brands')}
                className="font-sans font-bold text-sm text-primary hover:text-accent transition-colors flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                Tutti i marchi <ArrowRightIcon size={16} />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x snap-mandatory sm:grid sm:grid-cols-4 lg:grid-cols-8 sm:overflow-visible sm:pb-0 sm:snap-none">
              {BRANDS.map((brand) =>
              <button
                key={brand.slug}
                onClick={() => navigate(`/brand/${brand.slug}`)}
                className="flex-shrink-0 w-24 sm:w-auto bg-white border border-gray-100 rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group aspect-square snap-start focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                    <span className="font-mono text-sm font-bold text-gray-500 group-hover:text-accent">
                      {brand.countryCode}
                    </span>
                  </div>
                  <span className="font-sans text-xs font-bold text-primary text-center group-hover:text-accent transition-colors line-clamp-2">
                    {brand.name}
                  </span>
                </button>
              )}
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-primary rounded-2xl p-8 lg:p-12 relative overflow-hidden cubes-overlay">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] z-[2]"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/3">
                <h2 className="font-sans text-3xl lg:text-4xl font-black text-white mb-4">
                  Cosa dicono i nostri atleti
                </h2>
                <p className="font-sans text-gray-300 mb-8">
                  Oltre 10.000 clienti soddisfatti in tutta Europa si affidano a
                  noi per i loro protocolli.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) =>
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-600 border-2 border-primary flex items-center justify-center text-white font-bold text-xs">

                        U{i}
                      </div>
                    )}
                  </div>
                  <div className="text-white font-sans text-sm">
                    <span className="font-bold">4.9/5</span> rating medio
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                    <StarIcon
                      key={i}
                      size={14}
                      className="text-warning fill-warning" />

                    )}
                  </div>
                  <p className="font-sans text-gray-200 text-sm leading-relaxed mb-4">
                    "Prodotti originali verificati sul sito Balkan. Spedizione
                    arrivata in 48h con imballaggio perfetto e discreto. Il
                    miglior shop in Italia senza dubbio."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs">
                      M
                    </div>
                    <div>
                      <p className="font-sans font-bold text-white text-xs">
                        Marco T.
                      </p>
                      <p className="font-sans text-gray-300 text-xs">
                        Acquisto verificato
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((i) =>
                    <StarIcon
                      key={i}
                      size={14}
                      className="text-warning fill-warning" />

                    )}
                  </div>
                  <p className="font-sans text-gray-200 text-sm leading-relaxed mb-4">
                    "Assistenza clienti eccezionale. Mi hanno aiutato a
                    strutturare la PCT correttamente. I prodotti Magnus sono top
                    quality."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <div>
                      <p className="font-sans font-bold text-white text-xs">
                        Alessandro R.
                      </p>
                      <p className="font-sans text-gray-300 text-xs">
                        Acquisto verificato
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter section */}
          <section className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
            <div className="absolute inset-0 bg-[url('https://cdn.magicpatterns.com/uploads/43mKgsHJDRTz1x3XDaKX5y/image.png')] bg-[length:300px_auto] bg-repeat opacity-8 mix-blend-multiply"></div>

            <div className="relative z-10 px-6 py-16 lg:py-20 flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6 text-accent">
                <MailIcon size={28} />
              </div>
              <h2 className="font-sans text-3xl lg:text-4xl font-black text-primary mb-4">
                Unisciti alla Community
              </h2>
              <p className="font-sans text-gray-600 text-lg mb-8 max-w-xl">
                Iscriviti alla newsletter per ricevere il 10% di sconto sul tuo
                primo ordine, offerte esclusive e guide sui protocolli.
              </p>

              {newsletterSubmitted ?
              <div className="flex items-center justify-center gap-3 py-4 px-6 bg-success/10 border border-success/20 rounded-xl text-success font-sans font-bold">
                  <CheckIcon size={20} />
                  Iscrizione confermata! Controlla la tua email.
                </div> :

              <form
                onSubmit={handleNewsletterSubmit}
                className="w-full max-w-md relative flex items-center">

                  <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Il tuo indirizzo email..."
                  required
                  className="w-full font-sans text-base border-2 border-white rounded-full pl-6 pr-36 h-12 bg-white/80 backdrop-blur-sm text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                  <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 h-10 font-sans font-bold text-sm px-6 bg-primary text-white rounded-full hover:bg-accent transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                    Iscriviti
                  </button>
                </form>
              }
              <p className="font-sans text-xs text-gray-500 mt-4">
                Nessuno spam. Cancellati in qualsiasi momento.
              </p>
            </div>
          </section>
        </div>
      </main>
    </Layout>);

}