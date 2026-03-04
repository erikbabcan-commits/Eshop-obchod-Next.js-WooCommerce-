export type Language =
'it' |
'en' |
'de' |
'fr' |
'es' |
'pl' |
'nl' |
'pt' |
'cs' |
'ro' |
'hu' |
'sk' |
'bg' |
'hr';

export type CategorySlug =
'anabolizzanti' |
'bruciagrassi' |
'ormoni' |
'peptidi' |
'pct' |
'sarms' |
'hgh' |
'vitamine';

export type BrandSlug =
'balkan-pharmaceuticals' |
'magnus-pharmaceuticals' |
'hilma-biocare' |
'sopharma' |
'lawless-labs' |
'ansomone' |
'astra-zeneca' |
'peptide-sciences';

export interface Category {
  slug: CategorySlug;
  label: string;
  description: string;
  richText: string;
  productCount: number;
}

export interface Brand {
  slug: BrandSlug;
  name: string;
  country: string;
  countryCode: string;
  description: string;
  richText: string;
  productCount: number;
  founded?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug?: BrandSlug;
  category: CategorySlug;
  price: number;
  originalPrice?: number;
  sku: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  tags: string[];
  imageAlt: string;
  imageUrl?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface JsonLdProduct {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  sku: string;
  brand: {'@type': string;name: string;};
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  isAdmin?: boolean;
}