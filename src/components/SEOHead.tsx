import React from 'react';
import { Helmet } from 'react-helmet-async';
interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  noIndex?: boolean;
}
const SITE_NAME = 'ISTEROIDI';
const DEFAULT_DESCRIPTION =
'Farmaci per la Performance — Steroidi anabolizzanti, ormoni, peptidi e integratori per atleti e bodybuilder. Qualità farmaceutica certificata.';
const DEFAULT_OG_IMAGE = 'https://isteroidi.it/og-image.jpg';
const BASE_URL = 'https://isteroidi.it';
export function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false
}: SEOHeadProps) {
  const fullTitle = title ?
  `${title} | ${SITE_NAME}` :
  `${SITE_NAME} — Farmaci per la Performance`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:locale" content="it_IT" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>);

}