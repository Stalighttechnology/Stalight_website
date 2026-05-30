import React from "react";
import { Quote } from "lucide-react";

const QuoteSection = () => {
  const quoteText = "Stalight Technology represents the definitive convergence of deep-intellect engineering and the next frontier of computational intelligence.";

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
          
          .font-editorial { font-family: 'Playfair Display', serif; }
          .font-tech { font-family: 'Inter', sans-serif; }
          .font-signature { font-family: 'Alex Brush', cursive; }
        `}
      </style>

      {/* Reduced py-20/24/32 to py-12/16/20 and min-h to 0 for better flow */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-[#FAFAFC] overflow-hidden flex items-center justify-center min-h-0 selection:bg-purple-200 selection:text-purple-900 border-y border-slate-200/60">
        
        {/* Layer 1: Architectural Grid */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]" 
          style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        ></div>

        {/* Layer 2: Brand Ambient Glows */}
        <div className="absolute top-0 right-[-10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0 transform-gpu"></div>
        <div className="absolute bottom-0 left-[-10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0 transform-gpu"></div>

        {/* Layer 3: Massive Floating Quote Mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-[0.03]">
          <Quote className="text-purple-600 fill-purple-600 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px]" strokeWidth={0} />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl md:max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* The Main Editorial Quote */}
            <blockquote className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-slate-900 leading-[1.4] tracking-tight mb-8 sm:mb-12 md:mb-16 relative z-10">
              {/* quote marks */}
              <span className="absolute -top-6 sm:-top-8 -left-2 sm:-left-6 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500 font-serif text-5xl sm:text-7xl opacity-40 select-none">
                “
              </span>
              
              <div className="relative z-10">
                {quoteText}
              </div>
              
              <span className="absolute -bottom-10 sm:-bottom-12 -right-2 sm:-right-6 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-500 font-serif text-5xl sm:text-7xl opacity-40 rotate-180 select-none">
                “
              </span>
            </blockquote>

            {/* Signature & Identity Block */}
            <div className="flex flex-col items-center mt-4 sm:mt-0">
              <div className="relative mb-6 sm:mb-8 flex justify-center w-full">
                
                {/* Alistair Vance Signature */}
                <div className="font-signature text-4xl sm:text-5xl md:text-6xl text-slate-900 relative z-10 px-4">
                  Alistair Vance
                </div>
                
                {/* Static Ink Underline */}
                <svg 
                  className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[110%] sm:w-[120%] max-w-[280px] sm:max-w-[320px] h-8 sm:h-10 overflow-visible z-0 opacity-90 pointer-events-none" 
                  viewBox="0 0 300 30" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="sigGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M5 15 C 80 -5, 180 25, 290 10"
                    stroke="url(#sigGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Crisp, ultra-minimalist Metadata */}
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 font-tech">
                <p className="text-[11px] sm:text-xs tracking-[0.2em] font-bold uppercase text-slate-950">
                  Dr. Alistair Vance
                </p>
                <div className="h-1 w-6 sm:w-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 my-0.5 sm:my-1"></div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium text-center">
                  Director, Global Institutional Governance
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default QuoteSection;