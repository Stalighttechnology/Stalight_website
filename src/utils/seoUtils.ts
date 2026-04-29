/**
 * Utility functions for generating JSON-LD structured data.
 * Helps with SEO by providing machine-readable information to search engines.
 */

const BASE_URL = "https://stalight.in";

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stalight Technologies",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "customer service",
    "email": "info@stalight.in"
  },
  "sameAs": [
    "https://www.linkedin.com/company/stalight-technologies",
    "https://twitter.com/stalight_tech",
    "https://www.facebook.com/stalight.technologies"
  ],
  "description": "AI-First Enterprise Platforms"
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Stalight Technologies",
  "image": `${BASE_URL}/office.jpg`,
  "@id": `${BASE_URL}/#localbusiness`,
  "url": BASE_URL,
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Silicon Valley of India",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9716,
    "longitude": 77.5946
  }
});

export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item.startsWith('http') ? item.item : `${BASE_URL}${item.item}`
  }))
});

export const generateWebPageSchema = (name: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": name,
  "description": description,
  "url": `${BASE_URL}${url}`,
  "publisher": {
    "@type": "Organization",
    "name": "Stalight Technologies"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "Stalight Technologies",
    "url": BASE_URL
  }
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

