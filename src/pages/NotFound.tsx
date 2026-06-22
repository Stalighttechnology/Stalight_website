import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <SEO 
        title="Page Not Found | Stalight Technologies - Software Development Company"
        description="Oops! The page you're looking for doesn't exist. Return to Stalight Technologies, a leading software development company in Bengaluru."
        noIndex={true}
      />
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-100/30 rounded-full blur-[100px] transform-gpu"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-[12rem] font-black text-slate-100 leading-none select-none">404</h1>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Page <span className="text-[#D32027]">Not Found</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-light max-w-md mx-auto mb-10 leading-relaxed">
            The architectural blueprint for this route seems to be missing or relocated.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-950 text-white rounded-full font-bold uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-[#D32027] hover:-translate-y-1 transition-all duration-300"
          >
            Return to Stalight Technologies Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
