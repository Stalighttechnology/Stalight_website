import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/utils/seoUtils';
import { Helmet } from 'react-helmet-async';

/**
 * Breadcrumbs component with integrated JSON-LD Schema.
 * Automatically generates breadcrumbs based on the current path.
 */
export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // If we're on the home page, don't show breadcrumbs
  if (pathnames.length === 0) return null;

  const breadcrumbItems = [
    { name: 'Home', item: '/' },
    ...pathnames.map((value, index) => {
      const last = index === pathnames.length - 1;
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const name = value
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return { name, item: to };
    }),
  ];

  const schema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-6 bg-transparent relative z-10">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      <ol className="flex items-center space-x-2 text-sm font-medium text-slate-500">
        <li>
          <Link to="/" className="flex items-center hover:text-slate-900 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbItems.slice(1).map((item, index) => {
          const isLast = index === breadcrumbItems.length - 2;
          return (
            <li key={item.item} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-slate-400" />
              {isLast ? (
                <span className="text-slate-900 font-bold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.item}
                  className="hover:text-slate-900 transition-colors capitalize"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
