/**
 * Utility functions for generating JSON-LD structured data.
 * Helps with SEO by providing machine-readable information to search engines.
 */

const BASE_URL = "https://stalight.in";

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stalight Technologies Pvt Ltd",
  "alternateName": ["Stalight", "Stalight Technologies", "Stalight Pvt Ltd"],
  "url": BASE_URL,
  "logo": `${BASE_URL}/full_logo.png`,
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-73495-51102",
    "contactType": "customer service",
    "email": "support@stalight.in"
  },
  "sameAs": [
    "https://www.linkedin.com/company/stalight-technologies",
    "https://twitter.com/stalight_tech",
    "https://www.facebook.com/stalight.technologies"
  ],
  "description": "Stalight Technologies Pvt Ltd (Stalight) is a leading provider of custom software development, professional website making, IT skills training, and assured placement programs."
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Stalight Technologies Pvt Ltd",
  "image": `${BASE_URL}/office.jpeg`,
  "@id": `${BASE_URL}/#localbusiness`,
  "url": BASE_URL,
  "telephone": "+91-73495-51102",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rajajinagar",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560010",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9880,
    "longitude": 77.5536
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:00"
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

