import React from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean; // If true, sets loading="eager" and fetchpriority="high"
}

/**
 * OptimizedImage component for better SEO and Performance.
 * Features:
 * - Mandatory Alt Text for accessibility and SEO.
 * - Lazy loading by default (except for priority images).
 * - Aspect ratio preservation with width/height.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}) => {
  // Simple check to warn if alt is missing (though TypeScript handles this)
  if (!alt) {
    console.warn(`SEO Warning: Missing alt text for image ${src}`);
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      {...(priority ? { "fetchpriority": "high" } : {})}
      {...props}
    />
  );
};
