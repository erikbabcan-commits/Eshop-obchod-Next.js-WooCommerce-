import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  SearchIcon,
  FilterIcon,
  GridIcon,
  ListIcon,
  XIcon,
  ClockIcon,
  ArrowRightIcon } from
'lucide-react';
import { Layout } from '../components/Layout';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { SEOHead } from '../components/SEOHead';
import { CubeLogo } from '../components/CubeLogo';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/store';
import { useRecentSearches } from '../hooks/useRecentSearches';
import type { CategorySlug, BrandSlug, Product } from '../types';
type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';
// Simple fuzzy match function (checks if all chars in query appear in target in order)
function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (t.includes(q)) return true;
  let qIdx = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === q[qIdx]) qIdx++;
    if (qIdx === q.length) return true;
  }
  return false;
}
// Highlight matched text
const HighlightText = ({ text, query }: {text: string;query: string;}) => {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
      regex.test(part) ?
      <mark key={i} className="bg-yellow-200 text-gray-900 px-0.5 rounded">
            {part}
          </mark> :

      <span key={i}>{part}</span>

      )}
    </>);

};
export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searches: recentSearches,
    addSearch,
    removeSearch,
    clearSearches
  } = useRecentSearches();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategories, setSelectedCategories] = useState<CategorySlug[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<BrandSlug[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  // Sync query from URL params
  useEffect(() => {
    const q = searchParams.get('q') ?? '';
    setQuery(q);
    setInputValue(q);
  }, [searchParams]);
  // Click outside to close autocomplete
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node))
      {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const handleSearch = (searchQuery: string = inputValue) => {
    const trimmed = searchQuery.trim();
    setQuery(trimmed);
    setInputValue(trimmed);
    setIsFocused(false);
    if (trimmed) {
      addSearch(trimmed);
      setSearchParams({
        q: trimmed
      });
    } else {
      setSearchParams({});
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };
  // Autocomplete suggestions
  const suggestions = useMemo(() => {
    if (!inputValue.trim() || !isFocused) return null;
    const q = inputValue.toLowerCase();
    // Match Categories
    const matchedCats = CATEGORIES.filter(
      (c) => c.label.toLowerCase().includes(q) || c.slug.includes(q)
    ).slice(0, 3);
    // Match Brands
    const matchedBrands = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(q)
    ).slice(0, 3);
    // Match Products (exact or fuzzy)
    const matchedProducts = PRODUCTS.filter(
      (p) =>
      p.name.toLowerCase().includes(q) ||
      fuzzyMatch(q, p.name) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 5);
    return {
      categories: matchedCats,
      brands: matchedBrands,
      products: matchedProducts
    };
  }, [inputValue, isFocused]);
  // Main search results
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    let results = PRODUCTS.filter(
      (p) =>
      p.name.toLowerCase().includes(q) ||
      fuzzyMatch(q, p.name) ||
      p.brand.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
    if (selectedCategories.length > 0) {
      results = results.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      results = results.filter(
        (p) => p.brandSlug && selectedBrands.includes(p.brandSlug)
      );
    }
    if (onlyInStock) {
      results = results.filter((p) => p.availability === 'InStock');
    }
    return [...results].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [query, selectedCategories, selectedBrands, onlyInStock, sortBy]);
  // Suggestions for empty state
  const suggestedProducts = useMemo(() => {
    if (filteredProducts.length > 0 || !query.trim()) return [];
    // Return some popular products as suggestions
    return [...PRODUCTS].
    sort((a, b) => b.reviewCount - a.reviewCount).
    slice(0, 4);
  }, [filteredProducts.length, query]);
  const toggleCategory = (slug: CategorySlug) => {
    setSelectedCategories((prev) =>
    prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };
  const toggleBrand = (slug: BrandSlug) => {
    setSelectedBrands((prev) =>
    prev.includes(slug) ? prev.filter((b) => b !== slug) : [...prev, slug]
    );
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setOnlyInStock(false);
  };
  const hasActiveFilters =
  selectedCategories.length > 0 || selectedBrands.length > 0 || onlyInStock;
  const resultCount = filteredProducts.length;
  const resultLabel =
  resultCount === 1 ? '1 risultato' : `${resultCount} risultati`;
  return (
    <Layout>
      <SEOHead title="Ricerca" canonical="/search" />
      <main
        className="min-h-screen w-full cubes-overlay-light"
        style={{
          backgroundColor: 'var(--color-bg)'
        }}>

        <div className="max-w-screen-xl mx-auto px-6 py-4 relative z-10">
          <Breadcrumb
            items={[
            {
              label: 'ricerca'
            }]
            } />


          <div className="mb-6">
            <h1 className="font-sans text-3xl font-bold text-gray-900 mb-1">
              Ricerca
            </h1>
            <p className="font-mono text-xs text-gray-400 mb-4">
              /search · premi '/' per cercare
            </p>

            <div
              className="flex gap-2 max-w-2xl relative"
              ref={searchContainerRef}>

              <div className="relative flex-1">
                <SearchIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16} />

                <input
                  type="search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Cerca prodotti, marchi, categorie…"
                  className="w-full font-sans text-base border border-gray-300 rounded-lg pl-10 pr-10 py-3 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 transition-colors shadow-sm"
                  autoComplete="off" />

                {inputValue &&
                <button
                  onClick={() => {
                    setInputValue('');
                    setQuery('');
                    setSearchParams({});
                    searchContainerRef.current?.
                    querySelector('input')?.
                    focus();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1">

                    <XIcon size={16} />
                  </button>
                }

                {/* Autocomplete Dropdown */}
                {isFocused && (
                inputValue.trim() || recentSearches.length > 0) &&
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                      {!inputValue.trim() && recentSearches.length > 0 &&
                  <div className="p-2">
                          <div className="flex items-center justify-between px-3 py-2">
                            <span className="font-mono text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ricerche Recenti
                            </span>
                            <button
                        onClick={clearSearches}
                        className="font-mono text-xs text-gray-400 hover:text-gray-700">

                              Cancella
                            </button>
                          </div>
                          <ul className="space-y-1">
                            {recentSearches.map((s, i) =>
                      <li
                        key={i}
                        className="flex items-center justify-between group px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                        onClick={() => handleSearch(s)}>

                                <div className="flex items-center gap-3 text-gray-600 group-hover:text-gray-900">
                                  <ClockIcon
                            size={14}
                            className="text-gray-400" />

                                  <span className="font-sans text-sm">{s}</span>
                                </div>
                                <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSearch(s);
                          }}
                          className="text-gray-300 hover:text-gray-500 hidden group-hover:block">

                                  <XIcon size={14} />
                                </button>
                              </li>
                      )}
                          </ul>
                        </div>
                  }

                      {suggestions &&
                  <div className="divide-y divide-gray-100 max-h-[60vh] overflow-y-auto">
                          {suggestions.categories.length > 0 &&
                    <div className="p-2">
                              <span className="font-mono text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-1 block">
                                Categorie
                              </span>
                              {suggestions.categories.map((c) =>
                      <button
                        key={c.slug}
                        onClick={() =>
                        navigate(`/category/${c.slug}`)
                        }
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center justify-between group">

                                  <span className="font-sans text-sm text-gray-700 group-hover:text-gray-900">
                                    <HighlightText
                            text={c.label}
                            query={inputValue} />

                                  </span>
                                  <ArrowRightIcon
                          size={14}
                          className="text-gray-300 group-hover:text-gray-500" />

                                </button>
                      )}
                            </div>
                    }

                          {suggestions.brands.length > 0 &&
                    <div className="p-2">
                              <span className="font-mono text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-1 block">
                                Marchi
                              </span>
                              {suggestions.brands.map((b) =>
                      <button
                        key={b.slug}
                        onClick={() => navigate(`/brand/${b.slug}`)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center justify-between group">

                                  <span className="font-sans text-sm text-gray-700 group-hover:text-gray-900">
                                    <HighlightText
                            text={b.name}
                            query={inputValue} />

                                  </span>
                                  <ArrowRightIcon
                          size={14}
                          className="text-gray-300 group-hover:text-gray-500" />

                                </button>
                      )}
                            </div>
                    }

                          {suggestions.products.length > 0 &&
                    <div className="p-2">
                              <span className="font-mono text-xs font-medium text-gray-400 uppercase tracking-wider px-3 py-1 block">
                                Prodotti
                              </span>
                              {suggestions.products.map((p) =>
                      <button
                        key={p.id}
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-3 group">

                                  <div className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center bg-white overflow-hidden flex-shrink-0">
                                    {p.imageUrl ?
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="w-full h-full object-cover mix-blend-multiply" /> :


                          <span className="font-mono text-[10px] text-gray-300">
                                        IMG
                                      </span>
                          }
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-sans text-sm font-medium text-gray-800 truncate group-hover:text-gray-900">
                                      <HighlightText
                              text={p.name}
                              query={inputValue} />

                                    </p>
                                    <p className="font-mono text-xs text-gray-500 truncate">
                                      {p.category} · €{p.price.toFixed(2)}
                                    </p>
                                  </div>
                                </button>
                      )}
                            </div>
                    }

                          {suggestions.categories.length === 0 &&
                    suggestions.brands.length === 0 &&
                    suggestions.products.length === 0 &&
                    <div className="p-4 text-center">
                                <p className="font-sans text-sm text-gray-500">
                                  Nessun suggerimento trovato
                                </p>
                                <p className="font-mono text-xs text-gray-400 mt-1">
                                  Premi Invio per cercare in tutto il catalogo
                                </p>
                              </div>
                    }
                        </div>
                  }
                    </div>
                }
              </div>
              <button
                onClick={() => handleSearch()}
                className="font-sans font-semibold text-base px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors shadow-sm">

                Cerca
              </button>
            </div>

            {query &&
            <p className="font-mono text-xs text-gray-500 mt-3">
                {resultCount === 0 ?
              `Nessun risultato per "${query}"` :
              `${resultLabel} per "${query}"`}
              </p>
            }
          </div>

          {query.trim() ?
          <div className="flex flex-col lg:flex-row gap-6">
              {/* Left sidebar — filters */}
              {resultCount > 0 &&
            <aside className="w-full lg:w-56 flex-shrink-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <FilterIcon size={14} className="text-gray-500" />
                      <span className="font-sans text-sm font-semibold text-gray-900">
                        Filtri
                      </span>
                    </div>
                    {hasActiveFilters &&
                <button
                  onClick={clearFilters}
                  className="font-mono text-xs text-gray-500 hover:text-gray-900 transition-colors underline">

                        Azzera
                      </button>
                }
                  </div>

                  <div
                className="bg-white border border-gray-200 rounded p-4"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>

                    <span className="font-sans text-sm font-medium text-gray-900 block mb-3">
                      Categoria
                    </span>
                    <div className="space-y-2">
                      {CATEGORIES.map((cat) =>
                  <label
                    key={cat.slug}
                    className="flex items-center gap-2.5 cursor-pointer group">

                          <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => toggleCategory(cat.slug)}
                      className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900" />

                          <span className="font-sans text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                            {cat.label}
                          </span>
                        </label>
                  )}
                    </div>
                  </div>

                  <div
                className="bg-white border border-gray-200 rounded p-4"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>

                    <span className="font-sans text-sm font-medium text-gray-900 block mb-3">
                      Marca
                    </span>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
                      {BRANDS.map((brand) =>
                  <label
                    key={brand.slug}
                    className="flex items-center gap-2.5 cursor-pointer group">

                          <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand.slug)}
                      onChange={() => toggleBrand(brand.slug)}
                      className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900" />

                          <span className="font-sans text-sm text-gray-600 group-hover:text-gray-900 transition-colors truncate">
                            {brand.name}
                          </span>
                        </label>
                  )}
                    </div>
                  </div>

                  <div
                className="bg-white border border-gray-200 rounded p-4"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>

                    <span className="font-sans text-sm font-medium text-gray-900 block mb-3">
                      Disponibilità
                    </span>
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900" />

                      <span className="font-sans text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        Solo disponibili
                      </span>
                    </label>
                  </div>
                </aside>
            }

              {/* Right: results */}
              <div className="flex-1 min-w-0">
                {resultCount > 0 &&
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 py-3 px-4 bg-white border border-gray-200 rounded"
                style={{
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>

                    <span className="font-mono text-xs text-gray-500">
                      {resultLabel}
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-gray-500 hidden sm:inline">
                          Ordina:
                        </span>
                        <select
                      value={sortBy}
                      onChange={(e) =>
                      setSortBy(e.target.value as SortOption)
                      }
                      className="font-sans text-sm border border-gray-300 rounded px-2 py-1.5 text-gray-700 bg-white focus:outline-none focus:border-gray-500">

                          <option value="relevance">Rilevanza</option>
                          <option value="price-asc">Prezzo: crescente</option>
                          <option value="price-desc">
                            Prezzo: decrescente
                          </option>
                          <option value="rating">Valutazione</option>
                        </select>
                      </div>
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>

                          <GridIcon size={16} />
                        </button>
                        <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>

                          <ListIcon size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
              }

                {hasActiveFilters && resultCount > 0 &&
              <div className="flex flex-wrap gap-2 mb-6">
                    {selectedCategories.map((slug) => {
                  const cat = CATEGORIES.find((c) => c.slug === slug);
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1.5 font-sans text-xs px-2.5 py-1 bg-white border border-gray-300 rounded-full text-gray-700">

                          {cat?.label ?? slug}
                          <button
                        onClick={() => toggleCategory(slug)}
                        className="text-gray-400 hover:text-gray-700">

                            <XIcon size={12} />
                          </button>
                        </span>);

                })}
                    {selectedBrands.map((slug) => {
                  const brand = BRANDS.find((b) => b.slug === slug);
                  return (
                    <span
                      key={slug}
                      className="inline-flex items-center gap-1.5 font-sans text-xs px-2.5 py-1 bg-white border border-gray-300 rounded-full text-gray-700">

                          {brand?.name ?? slug}
                          <button
                        onClick={() => toggleBrand(slug)}
                        className="text-gray-400 hover:text-gray-700">

                            <XIcon size={12} />
                          </button>
                        </span>);

                })}
                    {onlyInStock &&
                <span className="inline-flex items-center gap-1.5 font-sans text-xs px-2.5 py-1 bg-white border border-gray-300 rounded-full text-gray-700">
                        Solo disponibili
                        <button
                    onClick={() => setOnlyInStock(false)}
                    className="text-gray-400 hover:text-gray-700">

                          <XIcon size={12} />
                        </button>
                      </span>
                }
                  </div>
              }

                {filteredProducts.length === 0 ?
              <div className="space-y-8">
                    <div className="border border-dashed border-gray-300 rounded-lg py-16 px-4 flex flex-col items-center justify-center bg-white text-center">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <CubeLogo size={32} className="text-gray-300" />
                      </div>
                      <h2 className="font-sans text-lg font-semibold text-gray-900 mb-2">
                        Nessun risultato trovato
                      </h2>
                      <p className="font-sans text-sm text-gray-500 max-w-md mb-6">
                        Non abbiamo trovato prodotti che corrispondono a "
                        {query}". Prova a controllare l'ortografia o usa termini
                        più generici.
                      </p>
                      {hasActiveFilters &&
                  <button
                    onClick={clearFilters}
                    className="font-sans font-medium text-sm px-5 py-2.5 bg-accent text-white rounded hover:bg-accent-hover transition-colors">

                          Rimuovi tutti i filtri
                        </button>
                  }
                    </div>

                    {suggestedProducts.length > 0 &&
                <div>
                        <h3 className="font-sans text-lg font-semibold text-gray-900 mb-4">
                          Potrebbe interessarti anche
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {suggestedProducts.map((p) =>
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={() => navigate(`/product/${p.slug}`)} />

                    )}
                        </div>
                      </div>
                }
                  </div> :

              <div
                className={
                viewMode === 'grid' ?
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' :
                'flex flex-col gap-4'
                }>

                    {filteredProducts.map((product) =>
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => navigate(`/product/${product.slug}`)} />

                )}
                  </div>
              }
              </div>
            </div> :

          <div className="border border-dashed border-gray-300 rounded-lg py-24 flex flex-col items-center justify-center bg-white text-center px-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <CubeLogo size={32} className="text-gray-300" />
              </div>
              <h2 className="font-sans text-lg font-semibold text-gray-900 mb-2">
                Cosa stai cercando?
              </h2>
              <p className="font-sans text-sm text-gray-500 max-w-md mb-8">
                Cerca per nome del prodotto, principio attivo, marca o
                categoria. Premi '/' in qualsiasi momento per attivare la
                ricerca.
              </p>

              <div className="w-full max-w-2xl">
                <h3 className="font-mono text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 text-left">
                  Categorie Popolari
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(
                [
                'anabolizzanti',
                'peptidi',
                'sarms',
                'hgh',
                'pct'] as
                CategorySlug[]).
                map((slug) => {
                  const cat = CATEGORIES.find((c) => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => navigate(`/category/${slug}`)}
                      className="font-sans text-sm px-4 py-2 border border-gray-200 bg-gray-50 text-gray-700 rounded-full hover:border-gray-400 hover:bg-white transition-colors">

                        {cat?.label}
                      </button>);

                })}
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </Layout>);

}