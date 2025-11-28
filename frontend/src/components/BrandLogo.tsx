import { useState } from 'react';
import { getBrandLogo } from '../utils/brandLogos';

interface BrandLogoProps {
  brandName: string;
  className?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FALLBACK_LOGO = 'https://dummyimage.com/200x200/ffffff/000000&text=No+Logo';

const sizeClasses = {
  sm: 'h-8 w-auto',
  md: 'h-12 w-auto',
  lg: 'h-16 w-auto'
};

/**
 * BrandLogo Component
 * Displays brand logo with automatic fallback on error
 */
export default function BrandLogo({ brandName, className = '', alt, size = 'md' }: BrandLogoProps) {
  const [imgSrc, setImgSrc] = useState(getBrandLogo(brandName));
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACK_LOGO);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || `${brandName} logo`}
      className={`${sizeClasses[size]} object-contain ${className}`}
      onError={handleError}
      loading="lazy"
    />
  );
}
