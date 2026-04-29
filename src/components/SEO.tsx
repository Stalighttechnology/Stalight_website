import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  noIndex?: boolean;
}

export const SEO = ({ title, description, canonicalUrl, type = "website", jsonLd, noIndex }: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://stalight.in";
  const currentFullUrl = `${baseUrl}${location.pathname}${location.search}`;
  const finalCanonicalUrl = canonicalUrl || currentFullUrl;

  // Manual fallback for browser tab to ensure immediate update
  useEffect(() => {
    document.title = title;
  }, [title]);

  const robotsContent = noIndex 
    ? "noindex, nofollow" 
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="Stalight Technologies" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@stalight_tech" />

      {/* Canonical Link */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};


