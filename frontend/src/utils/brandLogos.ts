/**
 * Brand Logo Utility
 * Maps brand names to local logo paths with fallback
 */

const FALLBACK_LOGO = 'https://dummyimage.com/200x200/ffffff/000000&text=No+Logo';

/**
 * Brand logo mapping
 * Uses local paths to avoid network/DNS errors
 */
const brandLogoMap: Record<string, string> = {
  'gc': '/logos/gc.png',
  'gc corporation': '/logos/gc.png',
  'angelus': '/logos/angelus.png',
  'ivoclar': '/logos/ivoclar.png',
  'ivoclar vivadent': '/logos/ivoclar.png',
  'bisco': '/logos/bisco.png',
  'bisco dental': '/logos/bisco.png',
  'nobel': '/logos/nobel.png',
  'nobel biocare': '/logos/nobel.png',
  'miltex': '/logos/miltex.png',
  'septodont': '/logos/septodont.png',
  'straumann': '/logos/straumann.png',
  'woodpecker': '/logos/woodpecker.png',
  'ultradent': '/logos/ultradent.png',
  'zimmer': '/logos/zimmer.png',
  'zimmer biomet': '/logos/zimmer.png',
  '3m': '/logos/3m.png',
  '3m espe': '/logos/3m.png',
  'dentsply': '/logos/dentsply.png',
  'dentsply sirona': '/logos/dentsply.png',
  'kerr': '/logos/kerr.png',
  'kerr dental': '/logos/kerr.png',
  'shofu': '/logos/shofu.png',
  'shofu dental': '/logos/shofu.png',
  'coltene': '/logos/coltene.png',
  'nsk': '/logos/nsk.png',
  'hu-friedy': '/logos/hu-friedy.png',
  'colgate': '/logos/colgate.png',
  'colgate professional': '/logos/colgate.png',
  'oral-b': '/logos/oral-b.png',
  'oral-b professional': '/logos/oral-b.png',
};

/**
 * Get brand logo path
 * Returns local path if available, otherwise fallback
 */
export const getBrandLogo = (brandName: string): string => {
  if (!brandName) return FALLBACK_LOGO;
  
  const normalizedBrand = brandName.toLowerCase().trim();
  return brandLogoMap[normalizedBrand] || FALLBACK_LOGO;
};

/**
 * Get brand logo with error handling
 * Returns fallback if image fails to load
 */
export const getBrandLogoWithFallback = (brandName: string, onError?: () => void): string => {
  const logo = getBrandLogo(brandName);
  
  // Check if logo exists (for local paths)
  if (logo.startsWith('/')) {
    const img = new Image();
    img.onerror = () => {
      if (onError) onError();
    };
    img.src = logo;
  }
  
  return logo;
};

/**
 * Preload brand logos
 * Useful for better performance
 */
export const preloadBrandLogos = (brands: string[]): void => {
  brands.forEach(brand => {
    const logo = getBrandLogo(brand);
    if (logo !== FALLBACK_LOGO) {
      const img = new Image();
      img.src = logo;
    }
  });
};

/**
 * Get all available brand logos
 */
export const getAllBrandLogos = (): Record<string, string> => {
  return { ...brandLogoMap };
};

export default getBrandLogo;
