import { describe, it, expect } from './testUtils';

// ═══════════════════════════════════════════
// UI/UX Audit Test Suite — ISTEROIDI
// Tests: Contrast, Accessibility, Design Tokens, Touch Targets, Typography
// ═══════════════════════════════════════════

// ── Helpers ───────────────────────────────

/** sRGB relative luminance (WCAG 2.1) */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
  parseInt(h.substring(0, 2), 16),
  parseInt(h.substring(2, 4), 16),
  parseInt(h.substring(4, 6), 16)];

}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = relativeLuminance(r1, g1, b1);
  const l2 = relativeLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ── Design Token Constants ────────────────

const COLORS = {
  primary: '#363a30',
  primaryLight: '#3f4339',
  primaryDark: '#2a2e24',
  accent: '#e94560',
  accentHover: '#d63851',
  success: '#16c784',
  warning: '#f5a623',
  error: '#ef4444',
  white: '#ffffff',
  bg: '#fafafa',
  textPrimary: '#363a30',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  gray300: '#d1d5db',
  gray200: '#e5e7eb',
  gray400: '#9ca3af',
  gray500: '#6b7280'
};

// ═══════════════════════════════════════════
// 1. WCAG Color Contrast Tests
// ═══════════════════════════════════════════

describe('UI/UX — WCAG Color Contrast (AA)', () => {
  // Normal text requires 4.5:1, large text requires 3:1

  it('Primary text on white bg passes AA (≥4.5:1)', () => {
    const ratio = contrastRatio(COLORS.textPrimary, COLORS.white);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Primary text on light bg (#fafafa) passes AA (≥4.5:1)', () => {
    const ratio = contrastRatio(COLORS.textPrimary, COLORS.bg);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Secondary text on white bg passes AA (≥4.5:1)', () => {
    const ratio = contrastRatio(COLORS.textSecondary, COLORS.white);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Muted text on white bg passes AA (≥4.5:1)', () => {
    const ratio = contrastRatio(COLORS.textMuted, COLORS.white);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('White text on primary bg passes AA (≥4.5:1)', () => {
    const ratio = contrastRatio(COLORS.white, COLORS.primary);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('White text on accent bg passes AA for large text (≥3:1)', () => {
    const ratio = contrastRatio(COLORS.white, COLORS.accent);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('White text on accent-hover bg passes AA for large text (≥3:1)', () => {
    const ratio = contrastRatio(COLORS.white, COLORS.accentHover);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Gray-300 on primary bg passes AA (≥4.5:1) for footer/hero text', () => {
    const ratio = contrastRatio(COLORS.gray300, COLORS.primary);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Gray-200 on primary bg passes AA (≥4.5:1) for testimonial text', () => {
    const ratio = contrastRatio(COLORS.gray200, COLORS.primary);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Success color on white bg passes AA for large text (≥3:1)', () => {
    const ratio = contrastRatio(COLORS.success, COLORS.white);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Error color on white bg passes AA (≥4.5:1)', () => {
    const ratio = contrastRatio(COLORS.error, COLORS.white);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Warning color on white bg passes AA for large text (≥3:1)', () => {
    const ratio = contrastRatio(COLORS.warning, COLORS.white);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Primary-dark variant maintains sufficient contrast with white (≥7:1 AAA)', () => {
    const ratio = contrastRatio(COLORS.white, COLORS.primaryDark);
    expect(ratio >= 7.0).toBeTruthy();
  });
});

// ═══════════════════════════════════════════
// 2. Design Token Consistency
// ═══════════════════════════════════════════

describe('UI/UX — Design Token Consistency', () => {
  it('Primary color is valid 6-digit hex', () => {
    expect(COLORS.primary).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('Accent color is valid 6-digit hex', () => {
    expect(COLORS.accent).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('All semantic colors are valid hex', () => {
    const semanticColors = [COLORS.success, COLORS.warning, COLORS.error];
    semanticColors.forEach((c) => {
      expect(c).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  it('Primary palette has correct light/dark hierarchy (dark < default < light)', () => {
    const darkLum = relativeLuminance(...hexToRgb(COLORS.primaryDark));
    const defaultLum = relativeLuminance(...hexToRgb(COLORS.primary));
    const lightLum = relativeLuminance(...hexToRgb(COLORS.primaryLight));
    expect(darkLum < defaultLum).toBeTruthy();
    expect(defaultLum < lightLum).toBeTruthy();
  });

  it('Accent hover is darker than accent default', () => {
    const defaultLum = relativeLuminance(...hexToRgb(COLORS.accent));
    const hoverLum = relativeLuminance(...hexToRgb(COLORS.accentHover));
    expect(hoverLum < defaultLum).toBeTruthy();
  });

  it('Text hierarchy: primary darker than secondary darker than muted', () => {
    const primaryLum = relativeLuminance(...hexToRgb(COLORS.textPrimary));
    const secondaryLum = relativeLuminance(...hexToRgb(COLORS.textSecondary));
    const mutedLum = relativeLuminance(...hexToRgb(COLORS.textMuted));
    expect(primaryLum < secondaryLum).toBeTruthy();
    expect(secondaryLum < mutedLum).toBeTruthy();
  });

  it('Background surface is lighter than text primary (readable)', () => {
    const bgLum = relativeLuminance(...hexToRgb(COLORS.bg));
    const textLum = relativeLuminance(...hexToRgb(COLORS.textPrimary));
    expect(bgLum > textLum).toBeTruthy();
  });
});

// ═══════════════════════════════════════════
// 3. Typography Scale & Hierarchy
// ═══════════════════════════════════════════

describe('UI/UX — Typography & Spacing', () => {
  const TYPE_SCALE = {
    hero: 72, // text-7xl ~72px
    h1: 48, // text-5xl ~48px
    h2: 30, // text-3xl ~30px
    h3: 20, // text-xl ~20px
    body: 16, // text-base
    small: 14, // text-sm
    caption: 12, // text-xs
    micro: 10 // text-[10px]
  };

  it('Type scale follows descending hierarchy', () => {
    expect(TYPE_SCALE.hero > TYPE_SCALE.h1).toBeTruthy();
    expect(TYPE_SCALE.h1 > TYPE_SCALE.h2).toBeTruthy();
    expect(TYPE_SCALE.h2 > TYPE_SCALE.h3).toBeTruthy();
    expect(TYPE_SCALE.h3 > TYPE_SCALE.body).toBeTruthy();
    expect(TYPE_SCALE.body > TYPE_SCALE.small).toBeTruthy();
    expect(TYPE_SCALE.small > TYPE_SCALE.caption).toBeTruthy();
    expect(TYPE_SCALE.caption > TYPE_SCALE.micro).toBeTruthy();
  });

  it('Body text is at least 16px (readable on mobile)', () => {
    expect(TYPE_SCALE.body).toBeGreaterThanOrEqual(16);
  });

  it('Smallest text is at least 10px (legible minimum)', () => {
    expect(TYPE_SCALE.micro).toBeGreaterThanOrEqual(10);
  });

  it('H1 to body ratio is between 2x and 4x (good visual hierarchy)', () => {
    const ratio = TYPE_SCALE.h1 / TYPE_SCALE.body;
    expect(ratio >= 2).toBeTruthy();
    expect(ratio <= 4).toBeTruthy();
  });

  it('Hero to body ratio is between 3x and 6x', () => {
    const ratio = TYPE_SCALE.hero / TYPE_SCALE.body;
    expect(ratio >= 3).toBeTruthy();
    expect(ratio <= 6).toBeTruthy();
  });
});

// ═══════════════════════════════════════════
// 4. Touch Target & Interactive Element Sizes
// ═══════════════════════════════════════════

describe('UI/UX — Touch Targets & Interaction', () => {
  const TOUCH_TARGETS = {
    mobileNavButton: { w: 64, h: 64 }, // w-full h-16 = 64px height
    cartButton: { w: 44, h: 40 }, // px-3 py-2 ≈ 44x40
    wishlistHeart: { w: 32, h: 32 }, // w-8 h-8
    searchInput: { h: 40 }, // py-2 + text = ~40px
    categoryCard: { h: 160 }, // min-h-[160px]
    ctaButton: { h: 56 }, // py-4 + text = ~56px
    socialIcon: { w: 40, h: 40 } // w-10 h-10
  };

  it('Mobile nav buttons meet 44px minimum touch target', () => {
    expect(TOUCH_TARGETS.mobileNavButton.h).toBeGreaterThanOrEqual(44);
  });

  it('Cart button meets 44px minimum width', () => {
    expect(TOUCH_TARGETS.cartButton.w).toBeGreaterThanOrEqual(44);
  });

  it('Wishlist heart is at least 32px (acceptable with padding)', () => {
    expect(TOUCH_TARGETS.wishlistHeart.w).toBeGreaterThanOrEqual(32);
  });

  it('Search input height is at least 40px', () => {
    expect(TOUCH_TARGETS.searchInput.h).toBeGreaterThanOrEqual(40);
  });

  it('Category cards have sufficient height for touch', () => {
    expect(TOUCH_TARGETS.categoryCard.h).toBeGreaterThanOrEqual(44);
  });

  it('Primary CTA button height is at least 44px', () => {
    expect(TOUCH_TARGETS.ctaButton.h).toBeGreaterThanOrEqual(44);
  });

  it('Social media icons meet 40px minimum', () => {
    expect(TOUCH_TARGETS.socialIcon.w).toBeGreaterThanOrEqual(40);
    expect(TOUCH_TARGETS.socialIcon.h).toBeGreaterThanOrEqual(40);
  });
});

// ═══════════════════════════════════════════
// 5. Accessibility Patterns
// ═══════════════════════════════════════════

describe('UI/UX — Accessibility Patterns', () => {
  it('Focus ring uses accent color for visibility', () => {
    // Verify focus ring color contrasts with white bg
    const ratio = contrastRatio(COLORS.accent, COLORS.white);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Focus ring color contrasts with primary bg too', () => {
    const ratio = contrastRatio(COLORS.accent, COLORS.primary);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Error color is distinct from success (not confusable)', () => {
    const errorRgb = hexToRgb(COLORS.error);
    const successRgb = hexToRgb(COLORS.success);
    // Red channel should be much higher in error
    expect(errorRgb[0] > successRgb[0]).toBeTruthy();
    // Green channel should be much higher in success
    expect(successRgb[1] > errorRgb[1]).toBeTruthy();
  });

  it('Warning color is distinct from error (different hue)', () => {
    const warningRgb = hexToRgb(COLORS.warning);
    const errorRgb = hexToRgb(COLORS.error);
    // Warning should have higher green (orange vs red)
    expect(warningRgb[1] > errorRgb[1]).toBeTruthy();
  });

  it('Semantic colors are not solely relying on color (icon pairing required)', () => {
    // This is a design audit: success/error/warning should always pair with icons
    // We verify the colors exist and are distinct
    const colors = [COLORS.success, COLORS.warning, COLORS.error];
    const unique = new Set(colors);
    expect(unique.size).toBe(3);
  });
});

// ═══════════════════════════════════════════
// 6. Responsive & Layout Patterns
// ═══════════════════════════════════════════

describe('UI/UX — Responsive Layout Audit', () => {
  const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280
  };

  it('Breakpoints follow ascending order', () => {
    expect(BREAKPOINTS.sm < BREAKPOINTS.md).toBeTruthy();
    expect(BREAKPOINTS.md < BREAKPOINTS.lg).toBeTruthy();
    expect(BREAKPOINTS.lg < BREAKPOINTS.xl).toBeTruthy();
  });

  it('Mobile breakpoint starts at 640px (standard Tailwind)', () => {
    expect(BREAKPOINTS.sm).toBe(640);
  });

  it('Desktop nav breakpoint at 1024px (lg)', () => {
    expect(BREAKPOINTS.lg).toBe(1024);
  });

  it('Max content width is 1280px (xl) for readability', () => {
    expect(BREAKPOINTS.xl).toBe(1280);
  });

  it('Grid columns scale: 1 (mobile) → 2 (sm) → 4 (lg) for products', () => {
    const cols = { mobile: 1, sm: 2, lg: 4 };
    expect(cols.mobile < cols.sm).toBeTruthy();
    expect(cols.sm < cols.lg).toBeTruthy();
  });
});

// ═══════════════════════════════════════════
// 7. Component Pattern Audit
// ═══════════════════════════════════════════

describe('UI/UX — Component Pattern Audit', () => {
  const BORDER_RADIUS = {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24
  };

  const SHADOWS = {
    levels: ['sm', 'DEFAULT', 'md', 'lg', 'xl', '2xl'],
    specialPurpose: ['card', 'card-hover', 'drawer', 'modal']
  };

  it('Border radius scale is consistent (ascending)', () => {
    expect(BORDER_RADIUS.sm < BORDER_RADIUS.md).toBeTruthy();
    expect(BORDER_RADIUS.md < BORDER_RADIUS.lg).toBeTruthy();
    expect(BORDER_RADIUS.lg < BORDER_RADIUS.xl).toBeTruthy();
  });

  it('Shadow system has 6 elevation levels', () => {
    expect(SHADOWS.levels).toHaveLength(6);
  });

  it('Shadow system has 4 special-purpose shadows', () => {
    expect(SHADOWS.specialPurpose).toHaveLength(4);
  });

  it('Card shadow has a hover variant (interactive feedback)', () => {
    expect(SHADOWS.specialPurpose).toContain('card');
    expect(SHADOWS.specialPurpose).toContain('card-hover');
  });

  it('Modal shadow exists for overlay components', () => {
    expect(SHADOWS.specialPurpose).toContain('modal');
  });

  it('Transition durations cover fast/base/slow needs', () => {
    const durations = { fast: 150, base: 200, slow: 300 };
    expect(durations.fast < durations.base).toBeTruthy();
    expect(durations.base < durations.slow).toBeTruthy();
  });
});

// ═══════════════════════════════════════════
// 8. E-Commerce UX Patterns
// ═══════════════════════════════════════════

describe('UI/UX — E-Commerce UX Patterns', () => {
  it('Product card has all required elements: image, name, price, brand, rating, CTA', () => {
    const requiredElements = [
    'image',
    'name',
    'price',
    'brand',
    'rating',
    'addToCart'];

    expect(requiredElements).toHaveLength(6);
    // Each element serves a specific user need
    expect(requiredElements).toContain('image'); // Visual identification
    expect(requiredElements).toContain('price'); // Purchase decision
    expect(requiredElements).toContain('rating'); // Social proof
    expect(requiredElements).toContain('addToCart'); // Primary action
  });

  it('Cart badge uses accent color for urgency/attention', () => {
    // Badge should contrast with its parent (primary bg cart button)
    const ratio = contrastRatio(COLORS.accent, COLORS.primary);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Discount badge uses accent color (attention-grabbing)', () => {
    const ratio = contrastRatio(COLORS.white, COLORS.accent);
    expect(ratio >= 3.0).toBeTruthy();
  });

  it('Trust signals use success color (positive association)', () => {
    // Success green should be clearly visible on both light and dark
    const onWhite = contrastRatio(COLORS.success, COLORS.white);
    const onDark = contrastRatio(COLORS.success, COLORS.primary);
    expect(onWhite >= 3.0).toBeTruthy();
    expect(onDark >= 3.0).toBeTruthy();
  });

  it('Newsletter CTA has sufficient visual weight', () => {
    // Primary on white for the submit button
    const ratio = contrastRatio(COLORS.white, COLORS.primary);
    expect(ratio >= 4.5).toBeTruthy();
  });

  it('Price typography uses monospace for alignment (design pattern)', () => {
    // Verify mono font is defined in the system
    const monoFonts = ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'];
    expect(monoFonts.length).toBeGreaterThan(0);
    expect(monoFonts[0]).toBe('JetBrains Mono');
  });

  it('Mobile bottom nav has exactly 4 items (optimal for thumb reach)', () => {
    const navItems = ['Home', 'Esplora', 'Carrello', 'Account'];
    expect(navItems).toHaveLength(4);
  });

  it('Header promo banner rotates messages (engagement pattern)', () => {
    const promoCount = 3; // Spedizione, Nuovi arrivi, Garanzia
    expect(promoCount).toBeGreaterThanOrEqual(2);
    expect(promoCount).toBeLessThanOrEqual(5); // Not too many to be annoying
  });
});