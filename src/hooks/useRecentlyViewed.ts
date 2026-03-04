import { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '../data/store';
import type { Product } from '../types';

const STORAGE_KEY = 'isteroidi_recently_viewed';
const MAX_ITEMS = 8;

function getStoredSlugs(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.filter((s): s is string => typeof s === 'string');
      }
    }
  } catch (e) {
    console.error('Error reading recently viewed from localStorage:', e);
  }
  return [];
}

function setStoredSlugs(slugs: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  } catch (e) {
    console.error('Error saving recently viewed to localStorage:', e);
  }
}

export interface UseRecentlyViewedReturn {
  slugs: string[];
  products: Product[];
  addProduct: (slug: string) => void;
  clearAll: () => void;
}

export function useRecentlyViewed(): UseRecentlyViewedReturn {
  const [slugs, setSlugs] = useState<string[]>(() => getStoredSlugs());

  // Sync with localStorage on mount
  useEffect(() => {
    setSlugs(getStoredSlugs());
  }, []);

  const addProduct = useCallback((slug: string) => {
    setSlugs((prev) => {
      // Remove duplicate if exists
      const filtered = prev.filter((s) => s !== slug);
      // Add to front
      const updated = [slug, ...filtered].slice(0, MAX_ITEMS);
      setStoredSlugs(updated);
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSlugs([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Error clearing recently viewed:', e);
    }
  }, []);

  // Convert slugs to Product objects
  const products = slugs.
  map((slug) => PRODUCTS.find((p) => p.slug === slug)).
  filter((p): p is Product => p !== undefined);

  return {
    slugs,
    products,
    addProduct,
    clearAll
  };
}