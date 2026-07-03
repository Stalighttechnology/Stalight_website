/**
 * Utility functions for generating JSON-LD structured data.
 * Helps with SEO by providing machine-readable information to search engines.
 */

const BASE_URL = "https://stalight.in";

// ========== NEURO CAMPUS SCHEMA (Campus Management System) ==========
export const neuroCampusSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Stalight Campus",
  "operatingSystem": "Web, Windows, macOS, iOS, Android",
  "applicationCategory": "EducationalApplication",
  "applicationSubCategory": "Campus Management System",
  "url": `${BASE_URL}/Stalight-Campus`,
  "description": "Stalight Campus by Stalight Technologies is a comprehensive AI-powered campus management system for schools, colleges, and large institutional enterprises. It automates academic administration, student tracking, and institutional workflows for educational organizations of all sizes.",
  "offers": {
    "@type": "Offer",
    "url": `${BASE_URL}/Stalight-Campus-Access`,
    "price": "99.00",
    "priceCurrency": "INR",
    "description": "Flexible pricing plans for Stalight Campus campus management system. Built by Stalight Technologies for schools to large institutional enterprises in Bengaluru, India.",
    "category": "Subscription",
    "availability": "https://schema.org/InStock"
  },
  "author": {
    "@type": "Organization",
    "name": "Stalight Technologies Pvt Ltd"
  },
  "featureList": [
    "Student Enrollment & Management",
    "Faculty & Staff Management",
    "Attendance Tracking",
    "Exam & Grade Management",
    "Fee Collection & Billing",
    "Library Management",
    "Hostel Management",
    "AI-Powered Analytics & Reporting",
    "Parent-Teacher Collaboration",
    "Mobile App Integration"
  ],
  "educationalLevel": [
    "https://schema.org/ElementarySchool",
    "https://schema.org/MiddleSchool",
    "https://schema.org/HighSchool",
    "https://schema.org/CollegeOrUniversity"
  ],
  "teaches": [
    "Campus Management",
    "Academic Administration",
    "Institutional Automation",
    "Student Lifecycle Management"
  ],
  "potentialAction": {
    "@type": "Action",
    "name": "Request Demo",
    "target": `${BASE_URL}/Stalight-Campus-Access`,
    "expectsAcceptanceOf": {
      "@type": "Offer",
      "name": "Stalight Campus Demo"
    }
  }
};

// ========== NEUROSYNC SCHEMA (Coding Platform + Placement Drive) ==========
export const neuroSyncSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Stalight Sync",
  "operatingSystem": "Web, Windows, macOS, iOS, Android",
  "applicationCategory": "EducationalApplication, BusinessApplication",
  "applicationSubCategory": "Coding Platform and Recruitment Software",
  "url": `${BASE_URL}/Stalight-Sync`,
  "description": "Stalight Sync by Stalight Technologies is a campus-associated coding platform and end-to-end placement drive solution. It connects students with companies through AI-powered technical assessments, coding challenges, and automated recruitment workflows for educational institutions and enterprises.",
  "offers": {
    "@type": "Offer",
    "url": `${BASE_URL}/Stalight-Sync`,
    "priceCurrency": "INR",
    "description": "Custom pricing for Stalight Sync coding platform and placement drive automation. Built by Stalight Technologies for campus recruitment and technical assessments in Bengaluru, India.",
    "category": "Subscription",
    "availability": "https://schema.org/InStock"
  },
  "author": {
    "@type": "Organization",
    "name": "Stalight Technologies Pvt Ltd"
  },
  "featureList": [
    "Online Coding IDE with 50+ Languages",
    "Automated Code Evaluation & Plagiarism Check",
    "Placement Drive Management",
    "Company-Student Smart Matching",
    "Technical Assessment & Proctoring",
    "Real-time Collaboration Tools",
    "AI-Powered Candidate Screening",
    "Interview Scheduling Automation",
    "Performance Analytics Dashboard",
    "Custom Coding Challenges"
  ],
  "targetPopulation": [
    "Students",
    "Educational Institutions",
    "Recruiters",
    "HR Teams",
    "Tech Companies"
  ],
  "potentialAction": {
    "@type": "Action",
    "name": "Start Free Trial",
    "target": `${BASE_URL}/neurosync`
  }
};

// ========== ORGANIZATION SCHEMA ==========
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Stalight Technologies Pvt Ltd",
  "alternateName": ["Stalight", "Stalight Technologies", "Stalight Pvt Ltd"],  // "Stalight" FIRST = critical
  "url": BASE_URL,
  "logo": `${BASE_URL}/full_logo.png`,
  "description": "Stalight (Stalight Technologies) is a leading AI-first software development company in Bengaluru, India, specializing in enterprise solutions, campus automation, and custom software for businesses.",
  "sameAs": [
    "https://www.linkedin.com/company/stalight-technologies",
    "https://twitter.com/stalight_tech",
    "https://www.facebook.com/stalight.technologies"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rajajinagar, Bengaluru",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560010",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-73495-51102",
    "contactType": "Customer Support",
    "email": "support@stalight.in",
    "availableLanguage": ["English", "Hindi", "Kannada"]  // Optional: Adds local relevance
  },
  "areaServed": ["India", "Bengaluru", "Karnataka"],  // NEW: Boosts local SEO
  "foundingDate": "2026"  // NEW: Add if known (builds trust)
};

// ========== LOCAL BUSINESS SCHEMA ==========
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "Stalight Technologies Pvt Ltd",
  "image": `${BASE_URL}/office.jpeg`,
  "url": BASE_URL,
  "telephone": "+91-73495-51102",
  "email": "support@stalight.in",
  "description": "Leading software development company in Bengaluru offering AI-first enterprise solutions, custom software, and campus automation platforms.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rajajinagar, Bengaluru",
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
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "19:00"
  },
  "priceRange": "INR 100000 - INR 1000000",
  "hasMap": "https://www.google.com/maps/place/13%C2%B000'03.1%22N+77%C2%B033'10.4%22E/@13.000873,77.552898,640m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d13.000873!4d77.552898?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
  "keywords": ["Software Development", "Enterprise Software", "AI Solutions", "Stalight Technologies", "Bengaluru"]
};

// ========== GENERATOR FUNCTIONS ==========
export const generateOrganizationSchema = () => organizationSchema;
export const generateLocalBusinessSchema = () => localBusinessSchema;

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
