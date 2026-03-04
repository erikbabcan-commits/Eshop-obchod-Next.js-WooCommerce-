import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FilterIcon,
  GridIcon,
  ListIcon,
  MapPinIcon,
  CalendarIcon,
  PackageIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { BRANDS, getProductsByBrand } from '../data/store';
import type { BrandSlug } from '../types';
type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';
export function BrandPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const brandSlug = slug as BrandSlug;
  const brand = BRANDS.find((b) => b.slug === brandSlug);
  const allProducts = getProductsByBrand(brandSlug);
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
  if (!brand) {
    return (
      <Layout>
        <div className="max-w-screen-xl mx-auto px-6 py-16 text-center">
          <p className="font-sans text-gray-500 mb-4">
            Marchio non trovato: {slug}
          </p>
          <button
            onClick={() => navigate('/brands')}
            className="font-mono text-xs px-4 py-2 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors">

            ← Tutti i Marchi
          </button>
        </div>
      </Layout>);

  }
  return (
    <Layout>
      {brand &&
      <SEOHead
        title={brand.name}
        description={brand.description}
        canonical={`/brand/${slug}`} />

      }
      <main
        className="min-h-screen w-full"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4">
          <Breadcrumb
            items={[
            {
              label: 'marchi',
              onClick: () => navigate('/brands')
            },
            {
              label: brand.slug
            }]
            } />


          {/* Brand header */}
          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-white flex-shrink-0">
                    <span className="font-mono text-xs text-gray-300">
                      {brand.countryCode}
                    </span>
                  </div>
                  <h1 className="font-sans text-3xl font-bold text-gray-900 tracking-tight">
                    {brand.name}
                  </h1>
                </div>
                <p className="font-sans text-base text-gray-500 mb-2">
                  {brand.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <MapPinIcon
                      size={12}
                      className="text-gray-400"
                      aria-hidden="true" />

                    <span className="font-mono text-xs text-gray-500">
                      {brand.country}
                    </span>
                  </div>
                  {brand.founded &&
                  <div className="flex items-center gap-1.5">
                      <CalendarIcon
                      size={12}
                      className="text-gray-400"
                      aria-hidden="true" />

                      <span className="font-mono text-xs text-gray-500">
                        Fondata nel {brand.founded}
                      </span>
                    </div>
                  }
                  <div className="flex items-center gap-1.5">
                    <PackageIcon
                      size={12}
                      className="text-gray-400"
                      aria-hidden="true" />

                    <span className="font-mono text-xs text-gray-500">
                      {brand.productCount} prodotti
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="font-mono text-xs text-gray-400 block">
                  prodotti
                </span>
                <span className="font-mono text-2xl font-medium text-gray-700">
                  {brand.productCount}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-xs px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded">
                /{brand.slug}
              </span>
              <span className="font-mono text-xs text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-400">
                schema.org/Brand
              </span>
              <span className="font-mono text-xs text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-400">
                {allProducts.length} prodotti trovati
              </span>
            </div>
          </div>

          {/* Brand description panel */}
          <section
            className="bg-white border border-gray-200 rounded mb-6 overflow-hidden"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
            aria-label={`Descrizione ${brand.name}`}>

            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <span className="font-mono text-xs text-gray-500 font-medium">
                descrizione brand — SEO content
              </span>
              <span className="font-mono text-xs text-gray-300">
                {brand.richText.length} chars
              </span>
            </div>
            <div className="px-6 py-5 max-w-3xl">
              {brand.richText.
              split('\n\n').
              filter(Boolean).
              map((para, i) => {
                const isBold = para.startsWith('**') && para.includes('**');
                if (isBold) {
                  return (
                    <p
                      key={i}
                      className="font-sans text-sm font-semibold text-gray-800 mb-3 leading-relaxed">

                        {para.replace(/\*\*/g, '')}
                      </p>);

                }
                return (
                  <p
                    key={i}
                    className="font-sans text-sm text-gray-600 mb-3 leading-relaxed">

                      {para}
                    </p>);

              })}
            </div>
          </section>

          {/* Filters + sort bar */}
          <div className="flex items-center justify-between gap-4 mb-4 py-2.5 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:border-gray-500 hover:text-gray-800 transition-colors">
                <FilterIcon size={12} aria-hidden="true" />
                Filtri
              </button>
              <span className="font-mono text-xs px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded">
                brand: {brand.slug}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs text-gray-400">ordina:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="font-mono text-xs border border-gray-300 rounded px-2 py-1 text-gray-600 bg-white focus:outline-none focus:border-gray-500"
                  aria-label="Ordina prodotti">

                  <option value="relevance">Rilevanza</option>
                  <option value="price-asc">Prezzo: crescente</option>
                  <option value="price-desc">Prezzo: decrescente</option>
                  <option value="rating">Valutazione</option>
                </select>
              </div>

              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-700'}`}
                  aria-label="Vista griglia"
                  aria-pressed={viewMode === 'grid'}>

                  <GridIcon size={14} aria-hidden="true" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-700'}`}
                  aria-label="Vista lista"
                  aria-pressed={viewMode === 'list'}>

                  <ListIcon size={14} aria-hidden="true" />
                </button>
              </div>

              <span className="font-mono text-xs text-gray-400">
                {sortedProducts.length} risultati
              </span>
            </div>
          </div>

          {/* Product grid */}
          {sortedProducts.length > 0 ?
          <div
            className={
            viewMode === 'grid' ?
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' :
            'flex flex-col gap-3'
            }>

              {sortedProducts.map((product) =>
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.slug}`)} />

            )}
            </div> :

          <div className="border border-dashed border-gray-300 rounded py-16 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center mb-4">
                <span className="font-mono text-xs text-gray-300">0</span>
              </div>
              <p className="font-sans text-sm text-gray-500 mb-1">
                Nessun prodotto trovato
              </p>
              <p className="font-mono text-xs text-gray-400">
                brand: {brandSlug}
              </p>
            </div>
          }
        </div>
      </main>
    </Layout>);

}