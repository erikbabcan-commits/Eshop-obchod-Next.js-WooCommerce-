import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPinIcon,
  PackageIcon,
  ArrowRightIcon,
  BuildingIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEOHead } from '../components/SEOHead';
import { BRANDS, PRODUCTS } from '../data/store';
export function BrandsPage() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'name' | 'country' | 'products'>('name');
  const sortedBrands = [...BRANDS].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'country') return a.country.localeCompare(b.country);
    if (sortBy === 'products') {
      const aCount = PRODUCTS.filter((p) => p.brandSlug === a.slug).length;
      const bCount = PRODUCTS.filter((p) => p.brandSlug === b.slug).length;
      return bCount - aCount;
    }
    return 0;
  });
  const totalProducts = PRODUCTS.length;
  return (
    <Layout>
      <SEOHead
        title="Marchi"
        description="Tutti i marchi e produttori di farmaci per la performance disponibili su ISTEROIDI."
        canonical="/brands" />

      <main
        className="min-h-screen w-full cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'marchi'
            }]
            } />


          <div className="mb-6">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1 tracking-tight">
                  Marchi
                </h1>
                <p className="font-sans text-base text-gray-500">
                  Produttori farmaceutici certificati — qualità verificata lotto
                  per lotto
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="font-mono text-xs text-gray-400 block">
                  produttori
                </span>
                <span className="font-mono text-2xl font-medium text-gray-700">
                  {BRANDS.length}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-xs px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded">
                /marchi
              </span>
              <span className="font-mono text-xs text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-400">
                schema.org/Brand
              </span>
              <span className="font-mono text-xs text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-400">
                {totalProducts} prodotti totali
              </span>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="bg-white border border-gray-200 rounded mb-6 px-6 py-4"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span className="font-mono text-2xl font-medium text-gray-900 block">
                  {BRANDS.length}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  marchi attivi
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl font-medium text-gray-900 block">
                  {totalProducts}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  prodotti totali
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl font-medium text-gray-900 block">
                  {[...new Set(BRANDS.map((b) => b.country))].length}
                </span>
                <span className="font-mono text-xs text-gray-400">
                  paesi di origine
                </span>
              </div>
              <div>
                <span className="font-mono text-2xl font-medium text-gray-900 block">
                  GMP
                </span>
                <span className="font-mono text-xs text-gray-400">
                  standard qualità
                </span>
              </div>
            </div>
          </div>

          {/* Sort bar */}
          <div className="flex items-center justify-between gap-4 mb-4 py-2.5 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <BuildingIcon
                size={13}
                className="text-gray-400"
                aria-hidden="true" />

              <span className="font-mono text-xs text-gray-500">
                {BRANDS.length} produttori
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-gray-400">ordina:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="font-mono text-xs border border-gray-300 rounded px-2 py-1 text-gray-600 bg-white focus:outline-none focus:border-gray-500"
                aria-label="Ordina marchi">

                <option value="name">Nome A–Z</option>
                <option value="country">Paese</option>
                <option value="products">N° prodotti</option>
              </select>
            </div>
          </div>

          {/* Brands grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {sortedBrands.map((brand) => {
              const actualCount = PRODUCTS.filter(
                (p) => p.brandSlug === brand.slug
              ).length;
              return (
                <button
                  key={brand.slug}
                  onClick={() => navigate(`/brand/${brand.slug}`)}
                  className="bg-white border border-gray-200 rounded p-5 text-left hover:border-gray-400 transition-colors group"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                  }}
                  aria-label={`Vedi prodotti ${brand.name}`}>

                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 flex-shrink-0">
                      <span className="font-mono text-sm font-medium text-gray-400">
                        {brand.countryCode}
                      </span>
                    </div>
                    <span className="font-mono text-xs px-1.5 py-0.5 border border-dashed border-gray-200 text-gray-300 rounded">
                      {brand.founded ?? '—'}
                    </span>
                  </div>

                  <h2 className="font-sans text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-gray-700 transition-colors">
                    {brand.name}
                  </h2>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {brand.description}
                  </p>

                  <div className="flex items-center gap-3 mb-3 pt-2.5 border-t border-dashed border-gray-100">
                    <div className="flex items-center gap-1">
                      <MapPinIcon
                        size={10}
                        className="text-gray-300"
                        aria-hidden="true" />

                      <span className="font-mono text-xs text-gray-400">
                        {brand.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PackageIcon
                        size={10}
                        className="text-gray-300"
                        aria-hidden="true" />

                      <span className="font-mono text-xs text-gray-400">
                        {actualCount} prodotti
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-300">
                      /{brand.slug}
                    </span>
                    <span className="font-mono text-xs text-gray-500 group-hover:text-gray-800 transition-colors flex items-center gap-1">
                      Vedi prodotti
                      <ArrowRightIcon size={11} aria-hidden="true" />
                    </span>
                  </div>
                </button>);

            })}
          </div>

          {/* Country breakdown */}
          <section
            className="bg-white border border-gray-200 rounded mb-8"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
            aria-label="Distribuzione geografica marchi">

            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t flex items-center justify-between">
              <span className="font-mono text-xs text-gray-500 font-medium">
                distribuzione geografica — paesi di origine
              </span>
              <span className="font-mono text-xs text-gray-300">
                schema.org/Brand · countryOfOrigin
              </span>
            </div>
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                {
                  country: 'Moldova',
                  code: 'MD',
                  brands: ['Balkan Pharmaceuticals']
                },
                {
                  country: 'Austria',
                  code: 'AT',
                  brands: ['Magnus Pharmaceuticals']
                },
                {
                  country: 'Svezia',
                  code: 'SE',
                  brands: ['Hilma Biocare']
                },
                {
                  country: 'Bulgaria',
                  code: 'BG',
                  brands: ['Sopharma']
                },
                {
                  country: 'Germania',
                  code: 'DE',
                  brands: ['Lawless Labs']
                },
                {
                  country: 'Cina',
                  code: 'CN',
                  brands: ['Ansomone']
                },
                {
                  country: 'Regno Unito',
                  code: 'GB',
                  brands: ['AstraZeneca']
                },
                {
                  country: 'USA',
                  code: 'US',
                  brands: ['Peptide Sciences']
                }].
                map((entry) =>
                <div
                  key={entry.code}
                  className="flex items-center gap-2.5 py-1.5">

                    <div className="w-8 h-6 border border-dashed border-gray-200 rounded flex items-center justify-center flex-shrink-0 bg-gray-50">
                      <span className="font-mono text-xs text-gray-400">
                        {entry.code}
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-xs font-medium text-gray-700 block">
                        {entry.country}
                      </span>
                      <span className="font-mono text-xs text-gray-400">
                        {entry.brands.length} marchio
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SEO content */}
          <section
            className="bg-white border border-gray-200 rounded mb-8"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
            aria-label="Contenuto SEO marchi">

            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t flex items-center justify-between">
              <span className="font-mono text-xs text-gray-500 font-medium">
                SEO content — marchi body text
              </span>
              <span className="font-mono text-xs text-gray-300">
                H1 → H2 → H3 hierarchy
              </span>
            </div>
            <div className="px-6 py-5 max-w-3xl">
              <h2 className="font-sans text-xl font-bold text-gray-900 mb-3">
                Produttori Farmaceutici Certificati
              </h2>
              <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">
                ISTEROIDI collabora esclusivamente con produttori farmaceutici
                certificati che rispettano i più rigidi standard GMP (Good
                Manufacturing Practice) europei e internazionali.
              </p>
              <h3 className="font-sans text-base font-semibold text-gray-800 mb-2">
                Come Verifichiamo la Qualità
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Ogni lotto di prodotti viene testato da laboratori terzi
                indipendenti per verificare la concentrazione del principio
                attivo, la sterilità e l'assenza di contaminanti.
              </p>
            </div>
          </section>
        </div>
      </main>
    </Layout>);

}