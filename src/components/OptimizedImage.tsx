import React, { useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (!alt) {
    console.warn(`SEO Warning: Missing alt text for image ${src}`);
  }

  // Find if className has explicit object-fit classes, else default to cover
  const hasObjectFit = className.includes('object-');

  return (
    <div className={`relative overflow-hidden inline-block ${className}`} style={{ width, height }}>
      {(!isLoaded && !hasError) && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full ${!hasObjectFit ? 'object-cover' : ''} transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...(priority ? { "fetchpriority": "high" } : {})}
        {...props}
      />
    </div>
  );
};
