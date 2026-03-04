import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export type SortOption =
'relevance' |
'price-asc' |
'price-desc' |
'rating' |
'bestsellers';
export type ViewMode = 'grid' | 'list';
export type AvailabilityFilter = 'InStock' | 'OutOfStock' | 'PreOrder';

export interface Filters {
  brands: string[];
  sort: SortOption;
  minPrice: number | null;
  maxPrice: number | null;
  availability: AvailabilityFilter[];
  rating: number | null;
  view: ViewMode;
}

export interface UseUrlFiltersReturn {
  filters: Filters;
  currentPage: number;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  removeFilter: (key: keyof Filters) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  toggleBrand: (brand: string) => void;
  toggleAvailability: (availability: AvailabilityFilter) => void;
}

function parseCommaSeparated(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').filter(Boolean);
}

function parseNumber(value: string | null): number | null {
  if (!value) return null;
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

function parseSort(value: string | null): SortOption {
  const valid: SortOption[] = [
  'relevance',
  'price-asc',
  'price-desc',
  'rating',
  'bestsellers'];

  if (value && valid.includes(value as SortOption)) {
    return value as SortOption;
  }
  return 'relevance';
}

function parseView(value: string | null): ViewMode {
  if (value === 'list') return 'list';
  return 'grid';
}

function parseAvailability(value: string | null): AvailabilityFilter[] {
  if (!value) return [];
  const parts = value.split(',').filter(Boolean);
  const valid: AvailabilityFilter[] = ['InStock', 'OutOfStock', 'PreOrder'];
  return parts.filter((p): p is AvailabilityFilter =>
  valid.includes(p as AvailabilityFilter)
  );
}

export function useUrlFilters(): UseUrlFiltersReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<Filters>(
    () => ({
      brands: parseCommaSeparated(searchParams.get('brand')),
      sort: parseSort(searchParams.get('sort')),
      minPrice: parseNumber(searchParams.get('minPrice')),
      maxPrice: parseNumber(searchParams.get('maxPrice')),
      availability: parseAvailability(searchParams.get('availability')),
      rating: parseNumber(searchParams.get('rating')),
      view: parseView(searchParams.get('view'))
    }),
    [searchParams]
  );

  const currentPage = useMemo(() => {
    const page = parseNumber(searchParams.get('page'));
    return page && page > 0 ? Math.floor(page) : 1;
  }, [searchParams]);

  const setFilter = useCallback(
    <K extends keyof Filters,>(key: K, value: Filters[K]) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        // Reset to page 1 when filters change
        newParams.delete('page');

        if (key === 'brands') {
          const brands = value as string[];
          if (brands.length > 0) {
            newParams.set('brand', brands.join(','));
          } else {
            newParams.delete('brand');
          }
        } else if (key === 'availability') {
          const avail = value as AvailabilityFilter[];
          if (avail.length > 0) {
            newParams.set('availability', avail.join(','));
          } else {
            newParams.delete('availability');
          }
        } else if (key === 'sort') {
          const sort = value as SortOption;
          if (sort !== 'relevance') {
            newParams.set('sort', sort);
          } else {
            newParams.delete('sort');
          }
        } else if (key === 'view') {
          const view = value as ViewMode;
          if (view !== 'grid') {
            newParams.set('view', view);
          } else {
            newParams.delete('view');
          }
        } else if (
        key === 'minPrice' ||
        key === 'maxPrice' ||
        key === 'rating')
        {
          const num = value as number | null;
          if (num !== null && num > 0) {
            newParams.set(key, String(num));
          } else {
            newParams.delete(key);
          }
        }

        return newParams;
      });
    },
    [setSearchParams]
  );

  const removeFilter = useCallback(
    (key: keyof Filters) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('page');

        if (key === 'brands') {
          newParams.delete('brand');
        } else if (key === 'availability') {
          newParams.delete('availability');
        } else if (key === 'sort') {
          newParams.delete('sort');
        } else if (key === 'view') {
          newParams.delete('view');
        } else {
          newParams.delete(key);
        }

        return newParams;
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const setPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (page > 1) {
          newParams.set('page', String(page));
        } else {
          newParams.delete('page');
        }
        return newParams;
      });
    },
    [setSearchParams]
  );

  const toggleBrand = useCallback(
    (brand: string) => {
      const currentBrands = filters.brands;
      const newBrands = currentBrands.includes(brand) ?
      currentBrands.filter((b) => b !== brand) :
      [...currentBrands, brand];
      setFilter('brands', newBrands);
    },
    [filters.brands, setFilter]
  );

  const toggleAvailability = useCallback(
    (availability: AvailabilityFilter) => {
      const current = filters.availability;
      const newAvail = current.includes(availability) ?
      current.filter((a) => a !== availability) :
      [...current, availability];
      setFilter('availability', newAvail);
    },
    [filters.availability, setFilter]
  );

  return {
    filters,
    currentPage,
    setFilter,
    removeFilter,
    clearFilters,
    setPage,
    toggleBrand,
    toggleAvailability
  };
}