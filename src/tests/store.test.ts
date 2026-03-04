import { describe, it, expect } from './testUtils';
import {
  PRODUCTS,
  CATEGORIES,
  BRANDS,
  getProductsByCategory,
  getProductBySlug,
  getCategoryBySlug,
  getBrandBySlug,
  getProductsByBrand,
  searchProducts } from
'../data/store';

describe('Data Store — Products', () => {
  it('should have products array with items', () => {
    expect(PRODUCTS).toBeTruthy();
    expect(PRODUCTS.length).toBeGreaterThan(0);
  });

  it('should have valid product structure', () => {
    const product = PRODUCTS[0];
    expect(product.id).toBeTruthy();
    expect(product.name).toBeTruthy();
    expect(product.slug).toBeTruthy();
    expect(product.brand).toBeTruthy();
    expect(product.category).toBeTruthy();
    expect(product.price).toBeGreaterThan(0);
    expect(product.sku).toBeTruthy();
    expect(product.availability).toBeTruthy();
  });

  it('should have unique product IDs', () => {
    const ids = PRODUCTS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have unique product slugs', () => {
    const slugs = PRODUCTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('should have unique SKUs', () => {
    const skus = PRODUCTS.map((p) => p.sku);
    const uniqueSkus = new Set(skus);
    expect(uniqueSkus.size).toBe(skus.length);
  });

  it('should have valid availability values', () => {
    const validValues = ['InStock', 'OutOfStock', 'PreOrder'];
    PRODUCTS.forEach((p) => {
      expect(validValues).toContain(p.availability);
    });
  });

  it('should have ratings between 0 and 5', () => {
    PRODUCTS.forEach((p) => {
      expect(p.rating).toBeGreaterThanOrEqual(0);
      expect(p.rating).toBeLessThan(6);
    });
  });

  it('should have non-negative review counts', () => {
    PRODUCTS.forEach((p) => {
      expect(p.reviewCount).toBeGreaterThanOrEqual(0);
    });
  });

  it('should have originalPrice greater than price when set', () => {
    PRODUCTS.filter((p) => p.originalPrice).forEach((p) => {
      expect(p.originalPrice!).toBeGreaterThan(p.price);
    });
  });
});

describe('Data Store — Categories', () => {
  it('should have categories array with items', () => {
    expect(CATEGORIES).toBeTruthy();
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it('should have valid category structure', () => {
    const category = CATEGORIES[0];
    expect(category.slug).toBeTruthy();
    expect(category.label).toBeTruthy();
    expect(category.description).toBeTruthy();
    expect(category.richText).toBeTruthy();
    expect(category.productCount).toBeGreaterThanOrEqual(0);
  });

  it('should have unique category slugs', () => {
    const slugs = CATEGORIES.map((c) => c.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('should have all expected categories', () => {
    const expectedSlugs = [
    'anabolizzanti',
    'bruciagrassi',
    'ormoni',
    'peptidi',
    'pct',
    'sarms',
    'hgh',
    'vitamine'];

    expectedSlugs.forEach((slug) => {
      const found = CATEGORIES.find((c) => c.slug === slug);
      expect(found).toBeTruthy();
    });
  });
});

describe('Data Store — Brands', () => {
  it('should have brands array with items', () => {
    expect(BRANDS).toBeTruthy();
    expect(BRANDS.length).toBeGreaterThan(0);
  });

  it('should have valid brand structure', () => {
    const brand = BRANDS[0];
    expect(brand.slug).toBeTruthy();
    expect(brand.name).toBeTruthy();
    expect(brand.country).toBeTruthy();
    expect(brand.countryCode).toBeTruthy();
    expect(brand.description).toBeTruthy();
    expect(brand.richText).toBeTruthy();
    expect(brand.productCount).toBeGreaterThanOrEqual(0);
  });

  it('should have unique brand slugs', () => {
    const slugs = BRANDS.map((b) => b.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it('should have valid country codes (2 letters)', () => {
    BRANDS.forEach((b) => {
      expect(b.countryCode).toHaveLength(2);
    });
  });
});

describe('Data Store — Query Functions', () => {
  it('getProductsByCategory should return products for valid category', () => {
    const products = getProductsByCategory('anabolizzanti');
    expect(products.length).toBeGreaterThan(0);
    products.forEach((p) => {
      expect(p.category).toBe('anabolizzanti');
    });
  });

  it('getProductsByCategory should return empty array for invalid category', () => {
    const products = getProductsByCategory('nonexistent');
    expect(products).toHaveLength(0);
  });

  it('getProductBySlug should return product for valid slug', () => {
    const product = getProductBySlug('testosterone-enantato-250');
    expect(product).toBeTruthy();
    expect(product?.slug).toBe('testosterone-enantato-250');
  });

  it('getProductBySlug should return undefined for invalid slug', () => {
    const product = getProductBySlug('nonexistent-product');
    expect(product).toBeUndefined();
  });

  it('getCategoryBySlug should return category for valid slug', () => {
    const category = getCategoryBySlug('peptidi');
    expect(category).toBeTruthy();
    expect(category?.slug).toBe('peptidi');
  });

  it('getCategoryBySlug should return undefined for invalid slug', () => {
    const category = getCategoryBySlug('nonexistent');
    expect(category).toBeUndefined();
  });

  it('getBrandBySlug should return brand for valid slug', () => {
    const brand = getBrandBySlug('balkan-pharmaceuticals');
    expect(brand).toBeTruthy();
    expect(brand?.slug).toBe('balkan-pharmaceuticals');
  });

  it('getBrandBySlug should return undefined for invalid slug', () => {
    const brand = getBrandBySlug('nonexistent');
    expect(brand).toBeUndefined();
  });

  it('getProductsByBrand should return products for valid brand', () => {
    const products = getProductsByBrand('balkan-pharmaceuticals');
    expect(products.length).toBeGreaterThan(0);
    products.forEach((p) => {
      expect(p.brandSlug).toBe('balkan-pharmaceuticals');
    });
  });
});

describe('Data Store — Search', () => {
  it('searchProducts should return empty for short queries', () => {
    expect(searchProducts('')).toHaveLength(0);
    expect(searchProducts('a')).toHaveLength(0);
  });

  it('searchProducts should find products by name', () => {
    const results = searchProducts('testosterone');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      const matchesName = p.name.toLowerCase().includes('testosterone');
      const matchesDesc = p.shortDescription.
      toLowerCase().
      includes('testosterone');
      const matchesTags = p.tags.some((t) => t.includes('testosterone'));
      expect(matchesName || matchesDesc || matchesTags).toBeTruthy();
    });
  });

  it('searchProducts should find products by brand', () => {
    const results = searchProducts('balkan');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      expect(p.brand.toLowerCase()).toContain('balkan');
    });
  });

  it('searchProducts should find products by tag', () => {
    const results = searchProducts('peptide');
    expect(results.length).toBeGreaterThan(0);
  });

  it('searchProducts should be case insensitive', () => {
    const lower = searchProducts('testosterone');
    const upper = searchProducts('TESTOSTERONE');
    const mixed = searchProducts('TeStOsTeRoNe');
    expect(lower.length).toBe(upper.length);
    expect(lower.length).toBe(mixed.length);
  });
});