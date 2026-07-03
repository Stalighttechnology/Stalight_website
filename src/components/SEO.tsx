import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const defaultProps = {
  title: 'Stalight Technologies | AI-First Enterprise Software Development Company in Bengaluru',
  description: 'Stalight Technologies is a Bengaluru software company specializing in campus automation, workforce assessment, and custom enterprise solutions.',
  keywords: 'Stalight Technologies, Stalight, Software Development, Enterprise Software Development, AI Software Development, Custom Software Development, Bengaluru, India, Campus Automation, Workforce Assessment, Stalight Campus, Stalight Sync',
  author: 'Stalight Technologies Pvt Ltd',
};

const routeToCanonical: Record<string, string> = {
  '/about': '/about-us',
  '/services': '/it-services',
  '/products': '/software-development',
};

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  type?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
  keywords?: string | string[];
}

export const SEO = ({ title, description, canonicalUrl, type = "website", jsonLd, noIndex, keywords }: SEOProps) => {
  const location = useLocation();
  const baseUrl = "https://stalight.in";
  const pathname = location.pathname;
  const canonicalPathname = routeToCanonical[pathname] || pathname;
  const finalCanonicalUrl = canonicalUrl || `${baseUrl}${canonicalPathname}`;

  const seoTitle = title || defaultProps.title;
  const seoDesc = description || defaultProps.description;
  
  let seoKeywords = "";
  if (keywords) {
    seoKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  } else {
    seoKeywords = defaultProps.keywords;
  }

  // Manual fallback for browser tab to ensure immediate update
  useEffect(() => {
    document.title = seoTitle;
  }, [seoTitle]);

  const robotsContent = noIndex 
    ? "noindex, nofollow" 
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      {seoKeywords && (
        <meta name="keywords" content={seoKeywords} />
      )}
      <meta name="author" content={defaultProps.author} />
      <meta name="robots" content={robotsContent} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="Stalight Technologies" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDesc} />
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


