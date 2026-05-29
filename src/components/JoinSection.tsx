import React from "react";
import carrier1Img from "@/assets/backgrounds/carrier1.jpg";
import carrier2Img from "@/assets/backgrounds/carrier2.jpg";
import campusImg from "@/assets/backgrounds/campus.jpg";

const MaskedText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1">
    <div className={className}>
      {children}
    </div>
  </div>
);

const CinematicImage = ({ src, alt, className = "", style = {} }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <img loading="lazy" decoding="async"
        src={src}
        alt={alt}
        className="w-full h-full object-cover origin-center transform-gpu transition-all duration-500 ease-out hover:scale-105"
        style={{ willChange: "transform" }}
      />
    </div>
  );
};

const CareersPage = () => {
  return (
    <div className="font-sans antialiased text-slate-900 bg-white selection:bg-[#D32027] selection:text-white">
      
      {/* SECTION 1: Architecture */}
      <section id="careers" className="relative bg-[#FAFAFA] py-16 md:py-24 overflow-hidden">
        
        {/* Software Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 lg:mb-24">
            <div className="lg:col-span-5 z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-950 leading-[1.05] mb-8 tracking-tight">
                <MaskedText>Careers built</MaskedText>
                <MaskedText><span className="font-bold">for scale.</span></MaskedText>
              </h2>
              
              <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed border-l border-slate-300 pl-6 ml-1">
                We architect intelligent systems and high-availability pipelines that redefine how global enterprises operate. Work where clean code meets massive impact.
              </p>
            </div>
            
            <div className="lg:col-span-7 relative z-10 mt-8 lg:mt-0">
              <CinematicImage 
                src={carrier1Img} 
                alt="Engineering Team"
                className="w-full aspect-[16/10] border border-slate-100 shadow-sm"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1 relative flex justify-end">
               <CinematicImage 
                 src={carrier2Img} 
                 alt="System Architecture"
                 className="w-11/12 md:w-4/5 aspect-[4/3] border border-slate-100 shadow-sm"
               />
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2 z-20">
              <p className="text-slate-700 text-lg md:text-xl font-light leading-relaxed mb-12">
                Join a culture designed for those who value silent focus, quality relationships, and solving complex algorithmic challenges. We are looking for builders.
              </p>
              
              <div>
                <a
                  href="https://www.linkedin.com/company/stalight-technologies-pvt-ltd/about/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center bg-slate-950 text-white px-8 py-4 text-[11px] font-bold tracking-[0.25em] uppercase overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#D32027] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
                  <span className="relative z-10 flex items-center gap-3">
                    Explore Opportunities
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path></svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Network */}
      <section id="connect-grow" className="relative w-full py-12 md:py-24 bg-slate-800 overflow-hidden">
        
        {/* Subtle ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D32027]/5 rounded-full blur-[40px] pointer-events-none z-0 transform-gpu"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          
          <div className="w-full max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-[2rem] md:rounded-[3rem] shadow-lg overflow-hidden flex flex-col lg:flex-row relative">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D32027] via-[#D32027]/50 to-transparent origin-left z-30"></div>

            {/* Left Content Half */}
            <div className="flex-1 p-6 md:p-14 lg:p-20 flex flex-col justify-center relative z-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight text-white leading-[1.15]">
                Connect & Grow
              </h2>
              
              <p className="text-base md:text-lg font-light text-slate-400 leading-relaxed mb-10 border-l-2 border-[#D32027]/30 pl-3">
                Beyond the corporate hierarchy, join a synchronized community of creators and system thinkers.
              </p>
              
              <div className="mt-4">
                <a
                  href="https://www.linkedin.com/company/stalight-technologies-pvt-ltd/about/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center bg-white text-slate-950 px-8 py-4 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(211,32,39,0.4)] overflow-hidden rounded-full w-full sm:w-auto"
                  aria-label="Open Stalight Technologies LinkedIn"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#D32027] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out origin-bottom z-0"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Initialize Connection
                  </span>
                </a>
              </div>
            </div>

            {/* Right Image Half */}
            <div className="flex-1 relative min-h-[140px] md:min-h-[400px] lg:min-h-0 p-6 lg:p-8">
              <div className="w-full h-full relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-md border border-slate-800">
                <img loading="lazy" decoding="async" 
                  src={campusImg} 
                  alt="Corporate Campus" 
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.8] group-hover:brightness-95 transition-all duration-500 ease-out origin-center transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-slate-800/40 via-transparent to-slate-800/80 pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
};

export default CareersPage;