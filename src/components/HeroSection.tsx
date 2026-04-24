import React, { useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "@/assets/backgrounds/hero-bg.jpg"; 

const customEase = [0.19, 1.0, 0.22, 1.0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const revealVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: customEase },
  },
};

const HeroSection = () => {
  const containerRef = useRef(null);
  
  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative h-[100dvh] min-h-[600px] max-h-[1080px] w-full flex items-center justify-center overflow-hidden bg-[#F8F7F3] font-sans border-b border-slate-200"
    >
      
      {/* Background Graphic - REMOVED 'multiply' blend mode for a cleaner, brighter look */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle background scale animation */}
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }} // Much lower opacity for a cleaner "texture" feel
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute right-0 w-full md:w-[70%] h-full"
          style={{ 
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0 100%)",
            background: `url(${heroBg}) center/cover no-repeat`,
          }}
        />
        
        {/* Clean, brightening gradients instead of dark shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F3] via-[#F8F7F3]/80 to-transparent md:bg-gradient-to-r"></div>
        
        {/* Added a subtle radial glow exactly where the text sits to guarantee contrast on mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[60%] h-[60%] bg-[#F8F7F3]/60 blur-[60px] rounded-full"></div>
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 w-full px-5 sm:px-6 flex flex-col items-center text-center -mt-12 md:mt-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Heading */}
        <h1 className="flex flex-col gap-2 md:gap-3 mb-6 md:mb-8">
          <motion.span 
            variants={revealVariants}
            className="text-slate-500 font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase"
          >
            The Standard for
          </motion.span>
          <motion.span 
            variants={revealVariants}
            className="text-[#0B101E] font-black text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
          >
            Enterprise<br className="block md:hidden" /> Intelligence.
          </motion.span>
        </h1>

        {/* Divider - Made slightly thicker but shorter for a sharper, modern look */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
          className="w-12 md:w-16 h-1.5 bg-[#D32027] mb-8 origin-center rounded-full"
        />

        {/* Subtitle - Refined line-height and font-weight for easier mobile reading */}
        <motion.p 
          variants={revealVariants}
          className="max-w-[320px] sm:max-w-xl md:max-w-2xl text-[14px] sm:text-base lg:text-lg text-slate-600 font-medium md:font-light leading-relaxed mb-10 md:mb-12"
        >
          Bridging academic rigour and enterprise-grade AI—delivering 
          platforms built for scale and institutional trust.
        </motion.p>

        {/* Buttons - Sleeker padding and precise constraint limits */}
        <motion.div 
          variants={revealVariants} 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full max-w-[300px] sm:max-w-none"
        >
          <a
            href="#contact"
            className="group relative px-6 py-4 md:py-3.5 bg-[#0B101E] text-white overflow-hidden shadow-lg transition-all w-full sm:w-auto min-w-[220px]"
          >
            <div className="absolute inset-0 w-full h-full bg-[#D32027] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
              Institutional Inquiry
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
          
          <a
            href="#products"
            className="px-6 py-4 md:py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0B101E] bg-white/90 md:bg-white/60 border border-slate-200 md:border-slate-300 backdrop-blur-md hover:bg-white transition-all w-full sm:w-auto min-w-[220px]"
          >
            View Solutions
          </a>
        </motion.div>

      </motion.div>

      {/* Corporate Grid Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-20 lg:px-40 opacity-[0.02] md:opacity-[0.04]">
        <div className="w-px h-full bg-slate-950"></div>
        <div className="w-px h-full bg-slate-950"></div>
      </div>
    </section>
  );
};

export default HeroSection;