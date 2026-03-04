import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FilterIcon,
  GridIcon,
  ListIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XIcon,
  InfoIcon,
  StarIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { CATEGORIES, PRODUCTS, BRANDS } from '../data/store';
import {
  useUrlFilters,
  type SortOption,
  type AvailabilityFilter } from
'../hooks/useUrlFilters';
import type { CategorySlug, Product } from '../types';
const SORT_OPTIONS: {
  value: SortOption;
  label: string;
}[] = [
{
  value: 'relevance',
  label: 'Rilevanza'
},
{
  value: 'price-asc',
  label: 'Prezzo: crescente'
},
{
  value: 'price-desc',
  label: 'Prezzo: decrescente'
},
{
  value: 'rating',
  label: 'Valutazione'
},
{
  value: 'bestsellers',
  label: 'Più venduti'
}];

const AVAILABILITY_OPTIONS: {
  value: AvailabilityFilter;
  label: string;
}[] = [
{
  value: 'InStock',
  label: 'Disponibile'
},
{
  value: 'OutOfStock',
  label: 'Esaurito'
},
{
  value: 'PreOrder',
  label: 'Pre-ordine'
}];

const RATING_OPTIONS = [
{
  value: 4,
  label: '4+ stelle'
},
{
  value: 3,
  label: '3+ stelle'
},
{
  value: 2,
  label: '2+ stelle'
},
{
  value: null,
  label: 'Tutte'
}];

const PRODUCTS_PER_PAGE = 12;
export function CategoryPage() {
  const { slug } = useParams<{
    slug: string;
  }>();
  const navigate = useNavigate();
  const {
    filters,
    currentPage,
    setFilter,
    removeFilter,
    clearFilters,
    setPage,
    toggleBrand,
    toggleAvailability
  } = useUrlFilters();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    availability: true,
    rating: true
  });
  const categorySlug = slug as CategorySlug;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  // Get all products in this category
  const categoryProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === categorySlug),
    [categorySlug]
  );
  // Get brands that have products in this category
  const availableBrands = useMemo(() => {
    const brandSlugs = new Set(
      categoryProducts.map((p) => p.brandSlug).filter(Boolean)
    );
    return BRANDS.filter((b) => brandSlugs.has(b.slug));
  }, [categoryProducts]);
  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];
    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter(
        (p) => p.brandSlug && filters.brands.includes(p.brandSlug)
      );
    }
    // Price filter
    if (filters.minPrice !== null) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }
    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter((p) =>
      filters.availability.includes(p.availability)
      );
    }
    // Rating filter
    if (filters.rating !== null) {
      result = result.filter((p) => p.rating >= filters.rating!);
    }
    // Sorting
    switch (filters.sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'bestsellers':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // relevance - keep original order
        break;
    }
    return result;
  }, [categoryProducts, filters]);
  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);
  // Active filters for chips
  const activeFilters = useMemo(() => {
    const chips: {
      key: string;
      label: string;
      onRemove: () => void;
    }[] = [];
    filters.brands.forEach((brandSlug) => {
      const brand = BRANDS.find((b) => b.slug === brandSlug);
      if (brand) {
        chips.push({
          key: `brand-${brandSlug}`,
          label: brand.name,
          onRemove: () => toggleBrand(brandSlug)
        });
      }
    });
    if (filters.minPrice !== null || filters.maxPrice !== null) {
      const label =
      filters.minPrice !== null && filters.maxPrice !== null ?
      `€${filters.minPrice} - €${filters.maxPrice}` :
      filters.minPrice !== null ?
      `Min €${filters.minPrice}` :
      `Max €${filters.maxPrice}`;
      chips.push({
        key: 'price',
        label,
        onRemove: () => {
          removeFilter('minPrice');
          removeFilter('maxPrice');
          setPriceMin('');
          setPriceMax('');
        }
      });
    }
    filters.availability.forEach((avail) => {
      const opt = AVAILABILITY_OPTIONS.find((o) => o.value === avail);
      if (opt) {
        chips.push({
          key: `avail-${avail}`,
          label: opt.label,
          onRemove: () => toggleAvailability(avail)
        });
      }
    });
    if (filters.rating !== null) {
      chips.push({
        key: 'rating',
        label: `${filters.rating}+ stelle`,
        onRemove: () => removeFilter('rating')
      });
    }
    return chips;
  }, [filters, toggleBrand, toggleAvailability, removeFilter]);
  const handleApplyPrice = () => {
    const min = priceMin ? parseFloat(priceMin) : null;
    const max = priceMax ? parseFloat(priceMax) : null;
    if (min !== null) setFilter('minPrice', min);else
    removeFilter('minPrice');
    if (max !== null) setFilter('maxPrice', max);else
    removeFilter('maxPrice');
  };
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  if (!category) {
    return (
      <Layout>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-16 text-center">
          <p className="font-sans text-gray-500">
            Categoria non trovata: {slug}
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 font-mono text-xs px-4 h-8 border border-gray-300 text-gray-600 rounded hover:border-gray-500 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

            ← Torna alla Home
          </button>
        </div>
      </Layout>);

  }
  const richTextParagraphs = category.richText.split('\n\n').filter(Boolean);
  const FilterSidebar = () =>
  <div className="space-y-4">
      {/* Price Range */}
      <div
      className="bg-white border border-gray-200 rounded"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}>

        <button
        onClick={() => toggleSection('price')}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

          <span className="font-mono text-xs font-medium text-gray-700">
            Prezzo
          </span>
          {expandedSections.price ?
        <ChevronUpIcon size={14} className="text-gray-400" /> :

        <ChevronDownIcon size={14} className="text-gray-400" />
        }
        </button>
        {expandedSections.price &&
      <div className="px-4 pb-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="w-full font-mono text-xs border border-gray-300 rounded px-3 h-8 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

              <span className="text-gray-400">—</span>
              <input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-full font-mono text-xs border border-gray-300 rounded px-3 h-8 focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

            </div>
            <button
          onClick={handleApplyPrice}
          className="w-full font-mono text-xs px-3 h-8 border border-gray-300 text-gray-600 rounded hover:border-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

              Applica
            </button>
          </div>
      }
      </div>

      {/* Brand */}
      <div
      className="bg-white border border-gray-200 rounded"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}>

        <button
        onClick={() => toggleSection('brand')}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

          <span className="font-mono text-xs font-medium text-gray-700">
            Marca
          </span>
          {expandedSections.brand ?
        <ChevronUpIcon size={14} className="text-gray-400" /> :

        <ChevronDownIcon size={14} className="text-gray-400" />
        }
        </button>
        {expandedSections.brand &&
      <div className="px-4 pb-4 space-y-2 max-h-48 overflow-y-auto">
            {availableBrands.map((brand) =>
        <label
          key={brand.slug}
          className="flex items-center gap-2 cursor-pointer group">

                <input
            type="checkbox"
            checked={filters.brands.includes(brand.slug)}
            onChange={() => toggleBrand(brand.slug)}
            className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-xs text-gray-600 group-hover:text-gray-900">
                  {brand.name}
                </span>
              </label>
        )}
          </div>
      }
      </div>

      {/* Availability */}
      <div
      className="bg-white border border-gray-200 rounded"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}>

        <button
        onClick={() => toggleSection('availability')}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

          <span className="font-mono text-xs font-medium text-gray-700">
            Disponibilità
          </span>
          {expandedSections.availability ?
        <ChevronUpIcon size={14} className="text-gray-400" /> :

        <ChevronDownIcon size={14} className="text-gray-400" />
        }
        </button>
        {expandedSections.availability &&
      <div className="px-4 pb-4 space-y-2">
            {AVAILABILITY_OPTIONS.map((opt) =>
        <label
          key={opt.value}
          className="flex items-center gap-2 cursor-pointer group">

                <input
            type="checkbox"
            checked={filters.availability.includes(opt.value)}
            onChange={() => toggleAvailability(opt.value)}
            className="w-4 h-4 rounded border-gray-300 text-gray-800 focus:ring-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-xs text-gray-600 group-hover:text-gray-900">
                  {opt.label}
                </span>
              </label>
        )}
          </div>
      }
      </div>

      {/* Rating */}
      <div
      className="bg-white border border-gray-200 rounded"
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}>

        <button
        onClick={() => toggleSection('rating')}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

          <span className="font-mono text-xs font-medium text-gray-700">
            Valutazione
          </span>
          {expandedSections.rating ?
        <ChevronUpIcon size={14} className="text-gray-400" /> :

        <ChevronDownIcon size={14} className="text-gray-400" />
        }
        </button>
        {expandedSections.rating &&
      <div className="px-4 pb-4 space-y-2">
            {RATING_OPTIONS.map((opt) =>
        <label
          key={opt.value ?? 'all'}
          className="flex items-center gap-2 cursor-pointer group">

                <input
            type="radio"
            name="rating"
            checked={filters.rating === opt.value}
            onChange={() =>
            opt.value !== null ?
            setFilter('rating', opt.value) :
            removeFilter('rating')
            }
            className="w-4 h-4 border-gray-300 text-gray-800 focus:ring-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" />

                <span className="font-sans text-xs text-gray-600 group-hover:text-gray-900 flex items-center gap-1">
                  {opt.value !== null &&
            <span className="flex items-center">
                      {[...Array(opt.value)].map((_, i) =>
              <StarIcon
                key={i}
                size={10}
                className="text-gray-600 fill-gray-600" />

              )}
                    </span>
            }
                  {opt.label}
                </span>
              </label>
        )}
          </div>
      }
      </div>

      {activeFilters.length > 0 &&
    <button
      onClick={clearFilters}
      className="w-full font-mono text-xs px-3 py-2 text-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

          Cancella tutti i filtri
        </button>
    }
    </div>;

  return (
    <Layout>
      <SEOHead
        title={category.label}
        description={category.description}
        canonical={`/category/${slug}`} />

      <main
        className="min-h-screen w-full cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'categorie'
            },
            {
              label: category.slug
            }]
            } />


          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
                  {category.label}
                </h1>
                <p className="font-sans text-base text-gray-500">
                  {category.description}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span className="font-mono text-xs text-gray-400 block">
                  prodotti
                </span>
                <span className="font-mono text-2xl font-medium text-gray-700">
                  {filteredProducts.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-xs px-2 py-1 border border-dashed border-gray-300 text-gray-400 rounded">
                /{category.slug}
              </span>
              <span className="font-mono text-xs text-gray-300">·</span>
              <span className="font-mono text-xs text-gray-400">
                schema.org/ItemList
              </span>
            </div>
          </div>

          {/* Rich text description */}
          <section
            className="bg-white border border-gray-200 rounded mb-6 overflow-hidden"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}>

            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <InfoIcon size={14} className="text-gray-400" />
                <span className="font-mono text-xs text-gray-500 font-medium">
                  descrizione categoria
                </span>
              </div>
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="flex items-center gap-1 font-mono text-xs text-gray-500 hover:text-gray-800 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                {descExpanded ? 'Comprimi' : 'Espandi'}
                <ChevronDownIcon
                  size={12}
                  className={`transition-transform ${descExpanded ? 'rotate-180' : ''}`} />

              </button>
            </div>
            <div
              className={`px-6 py-6 ${!descExpanded ? 'max-h-32 overflow-hidden relative' : ''}`}>

              {richTextParagraphs.
              slice(0, descExpanded ? undefined : 2).
              map((para, i) =>
              <p
                key={i}
                className={`font-sans text-sm leading-relaxed mb-3 ${para.startsWith('**') ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>

                    {para.replace(/\*\*/g, '')}
                  </p>
              )}
              {!descExpanded &&
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
              }
            </div>
          </section>

          {/* Main layout: sidebar + content */}
          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <FilterSidebar />
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Mobile filter button */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center gap-2 font-mono text-xs px-4 h-10 border border-gray-300 rounded text-gray-600 hover:border-gray-500 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                  <FilterIcon size={14} />
                  Filtri
                  {activeFilters.length > 0 &&
                  <span className="px-2 py-1 bg-gray-800 text-white rounded text-xs">
                      {activeFilters.length}
                    </span>
                  }
                </button>
              </div>

              {/* Sort/View bar */}
              <div
                className="flex items-center justify-between gap-4 mb-4 py-2 px-4 bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-gray-400">
                    {filteredProducts.length} risultati
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-gray-400 hidden sm:inline">
                      ordina:
                    </span>
                    <select
                      value={filters.sort}
                      onChange={(e) =>
                      setFilter('sort', e.target.value as SortOption)
                      }
                      className="font-mono text-xs border border-gray-300 rounded px-3 h-8 text-gray-600 bg-white focus:outline-none focus:border-gray-500 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                      {SORT_OPTIONS.map((opt) =>
                      <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => setFilter('view', 'grid')}
                      className={`p-2 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${filters.view === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-700'}`}
                      aria-label="Vista griglia">

                      <GridIcon size={14} />
                    </button>
                    <button
                      onClick={() => setFilter('view', 'list')}
                      className={`p-2 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${filters.view === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-700'}`}
                      aria-label="Vista lista">

                      <ListIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active filter chips */}
              {activeFilters.length > 0 &&
              <div className="flex flex-wrap gap-2 mb-4">
                  {activeFilters.map((chip) =>
                <span
                  key={chip.key}
                  className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1 bg-white border border-gray-300 rounded text-gray-600">

                      {chip.label}
                      <button
                    onClick={chip.onRemove}
                    className="text-gray-400 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full">

                        <XIcon size={12} />
                      </button>
                    </span>
                )}
                  <button
                  onClick={clearFilters}
                  className="font-mono text-xs text-gray-500 hover:text-gray-800 underline focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                    Cancella tutti
                  </button>
                </div>
              }

              {/* Product grid/list */}
              {paginatedProducts.length > 0 ?
              <div
                className={
                filters.view === 'grid' ?
                'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4' :
                'flex flex-col gap-3'
                }>

                  {paginatedProducts.map((product) =>
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
                    Prova a modificare i filtri
                  </p>
                </div>
              }

              {/* Pagination */}
              {totalPages > 1 &&
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-200">
                  <button
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="font-mono text-xs px-3 h-8 border border-gray-300 rounded text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                    ← Precedente
                  </button>
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`font-mono text-xs px-3 h-8 border rounded transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${pageNum === currentPage ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 text-gray-500 hover:border-gray-500'}`}>

                        {pageNum}
                      </button>);

                })}
                  {totalPages > 5 && currentPage < totalPages - 2 &&
                <span className="font-mono text-xs text-gray-400">...</span>
                }
                  <button
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="font-mono text-xs px-3 h-8 border border-gray-300 rounded text-gray-500 hover:border-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">

                    Successiva →
                  </button>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {mobileFiltersOpen &&
        <div className="fixed inset-0 z-50 lg:hidden">
            <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileFiltersOpen(false)} />

            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <span className="font-sans text-sm font-semibold text-gray-900">
                  Filtri
                </span>
                <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">

                  <XIcon size={20} />
                </button>
              </div>
              <div className="p-4">
                <FilterSidebar />
              </div>
            </div>
          </div>
        }
      </main>
    </Layout>);

}