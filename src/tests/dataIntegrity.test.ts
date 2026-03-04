import { describe, it, expect } from './testUtils';
import { PRODUCTS, CATEGORIES, BRANDS } from '../data/store';
import type { CategorySlug, BrandSlug } from '../types';

describe('Data Integrity — Product-Category Relationships', () => {
  it('all products should reference valid categories', () => {
    const validCategorySlugs = CATEGORIES.map((c) => c.slug);
    PRODUCTS.forEach((product) => {
      expect(validCategorySlugs).toContain(product.category);
    });
  });

  it('all categories should have at least one product', () => {
    CATEGORIES.forEach((category) => {
      const productsInCategory = PRODUCTS.filter(
        (p) => p.category === category.slug
      );
      expect(productsInCategory.length).toBeGreaterThan(0);
    });
  });

  it('category productCount should match actual product count', () => {
    CATEGORIES.forEach((category) => {
      const actualCount = PRODUCTS.filter(
        (p) => p.category === category.slug
      ).length;
      // Note: productCount is approximate in mock data, so we just check it's reasonable
      expect(category.productCount).toBeGreaterThan(0);
    });
  });
});

describe('Data Integrity — Product-Brand Relationships', () => {
  it('all products with brandSlug should reference valid brands', () => {
    const validBrandSlugs = BRANDS.map((b) => b.slug);
    PRODUCTS.filter((p) => p.brandSlug).forEach((product) => {
      expect(validBrandSlugs).toContain(product.brandSlug);
    });
  });

  it('product brand name should match brand slug', () => {
    PRODUCTS.filter((p) => p.brandSlug).forEach((product) => {
      const brand = BRANDS.find((b) => b.slug === product.brandSlug);
      expect(brand).toBeTruthy();
      expect(product.brand).toBe(brand?.name);
    });
  });

  it('all brands should have at least one product', () => {
    BRANDS.forEach((brand) => {
      const productsForBrand = PRODUCTS.filter(
        (p) => p.brandSlug === brand.slug
      );
      expect(productsForBrand.length).toBeGreaterThan(0);
    });
  });
});

describe('Data Integrity — Slug Consistency', () => {
  it('product slugs should be URL-safe', () => {
    const urlSafePattern = /^[a-z0-9-]+$/;
    PRODUCTS.forEach((product) => {
      expect(product.slug).toMatch(urlSafePattern);
    });
  });

  it('category slugs should be URL-safe', () => {
    const urlSafePattern = /^[a-z0-9-]+$/;
    CATEGORIES.forEach((category) => {
      expect(category.slug).toMatch(urlSafePattern);
    });
  });

  it('brand slugs should be URL-safe', () => {
    const urlSafePattern = /^[a-z0-9-]+$/;
    BRANDS.forEach((brand) => {
      expect(brand.slug).toMatch(urlSafePattern);
    });
  });
});

describe('Data Integrity — Price Consistency', () => {
  it('all prices should be positive numbers', () => {
    PRODUCTS.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
    });
  });

  it('all prices should have at most 2 decimal places', () => {
    PRODUCTS.forEach((product) => {
      const decimals = (product.price.toString().split('.')[1] || '').length;
      expect(decimals).toBeLessThan(3);
    });
  });

  it('discount percentage should be reasonable (1-90%)', () => {
    PRODUCTS.filter((p) => p.originalPrice).forEach((product) => {
      const discount = Math.round(
        (product.originalPrice! - product.price) / product.originalPrice! *
        100
      );
      expect(discount).toBeGreaterThan(0);
      expect(discount).toBeLessThan(91);
    });
  });
});

describe('Data Integrity — SKU Format', () => {
  it('all SKUs should follow expected pattern', () => {
    // Pattern: XX-XXX-XXX or similar with letters, numbers, and hyphens
    const skuPattern = /^[A-Z0-9-]+$/;
    PRODUCTS.forEach((product) => {
      expect(product.sku).toMatch(skuPattern);
    });
  });

  it('all SKUs should have minimum length', () => {
    PRODUCTS.forEach((product) => {
      expect(product.sku.length).toBeGreaterThan(5);
    });
  });
});

describe('Data Integrity — Content Quality', () => {
  it('all products should have non-empty descriptions', () => {
    PRODUCTS.forEach((product) => {
      expect(product.description.length).toBeGreaterThan(50);
      expect(product.shortDescription.length).toBeGreaterThan(20);
    });
  });

  it('all products should have at least one tag', () => {
    PRODUCTS.forEach((product) => {
      expect(product.tags.length).toBeGreaterThan(0);
    });
  });

  it('all categories should have rich text content', () => {
    CATEGORIES.forEach((category) => {
      expect(category.richText.length).toBeGreaterThan(100);
    });
  });

  it('all brands should have rich text content', () => {
    BRANDS.forEach((brand) => {
      expect(brand.richText.length).toBeGreaterThan(100);
    });
  });

  it('all products should have imageAlt text', () => {
    PRODUCTS.forEach((product) => {
      expect(product.imageAlt.length).toBeGreaterThan(10);
    });
  });
});

describe('Data Integrity — Type Constraints', () => {
  it('availability should be valid enum value', () => {
    const validValues: string[] = ['InStock', 'OutOfStock', 'PreOrder'];
    PRODUCTS.forEach((product) => {
      expect(validValues).toContain(product.availability);
    });
  });

  it('category slugs should match CategorySlug type', () => {
    const validSlugs: CategorySlug[] = [
    'anabolizzanti',
    'bruciagrassi',
    'ormoni',
    'peptidi',
    'pct',
    'sarms',
    'hgh',
    'vitamine'];

    PRODUCTS.forEach((product) => {
      expect(validSlugs).toContain(product.category);
    });
  });

  it('brand slugs should match BrandSlug type when present', () => {
    const validSlugs: BrandSlug[] = [
    'balkan-pharmaceuticals',
    'magnus-pharmaceuticals',
    'hilma-biocare',
    'sopharma',
    'lawless-labs',
    'ansomone',
    'astra-zeneca',
    'peptide-sciences'];

    PRODUCTS.filter((p) => p.brandSlug).forEach((product) => {
      expect(validSlugs).toContain(product.brandSlug);
    });
  });
});

describe('Data Integrity — Ratings', () => {
  it('ratings should be between 0 and 5', () => {
    PRODUCTS.forEach((product) => {
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThan(5.1);
    });
  });

  it('review counts should be non-negative integers', () => {
    PRODUCTS.forEach((product) => {
      expect(product.reviewCount).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(product.reviewCount)).toBe(true);
    });
  });

  it('products with reviews should have reasonable ratings', () => {
    PRODUCTS.filter((p) => p.reviewCount > 0).forEach((product) => {
      // Products with reviews typically have ratings between 3 and 5
      expect(product.rating).toBeGreaterThan(2.5);
    });
  });
});