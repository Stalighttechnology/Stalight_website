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
  hidden: { y: 40, opacity: 0 },
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
      className="relative h-screen min-h-[600px] max-h-[1080px] w-full flex items-center justify-center overflow-hidden bg-[#F8F7F3] font-sans border-b border-slate-200"
    >
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 md:opacity-30">
        <div 
          className="absolute right-0 w-full md:w-[70%] h-full"
          style={{ 
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0 100%)",
            background: `url(${heroBg}) center/cover no-repeat`,
            mixBlendMode: "multiply"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#F8F7F3] via-[#F8F7F3]/80 md:via-[#F8F7F3]/60 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 w-full px-4 sm:px-6 flex flex-col items-center text-center mt-10 md:mt-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Heading */}
        <h1 className="flex flex-col gap-1 md:gap-2 mb-5 md:mb-6">
          <motion.span 
            variants={revealVariants}
            className="text-slate-600 font-light text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl tracking-tight"
          >
            The Standard for
          </motion.span>
          <motion.span 
            variants={revealVariants}
            className="text-[#0B101E] font-extrabold text-[2.75rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl md:leading-[0.9] tracking-tighter"
          >
            Enterprise<br className="md:hidden" /> Intelligence.
          </motion.span>
        </h1>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: customEase }}
          className="w-20 md:w-16 h-1 bg-[#D32027] mb-6 md:mb-8 origin-center"
        />

        {/* Subtitle */}
        <motion.p 
          variants={revealVariants}
          className="max-w-[90%] sm:max-w-xl md:max-w-2xl text-[15px] sm:text-base lg:text-lg text-slate-600 font-light leading-relaxed mb-10 md:mb-8 px-2 md:px-4"
        >
          Bridging academic rigour and enterprise-grade AI—delivering 
          platforms built for scale and institutional trust.
        </motion.p>

        {/* Buttons - FIXED: Added justify-center to center horizontally on desktop */}
        <motion.div 
          variants={revealVariants} 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full"
        >
          <a
            href="#contact"
            className="group relative px-8 py-3.5 md:py-3 bg-[#0B101E] text-white overflow-hidden shadow-md transition-all w-full sm:w-auto min-w-[200px]"
          >
            <div className="absolute inset-0 w-full h-full bg-[#D32027] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
              Institutional Inquiry
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
          
          <a
            href="#products"
            className="px-8 py-3.5 md:py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-[#0B101E] bg-white/80 md:bg-white/50 border border-slate-200 md:border-slate-300 backdrop-blur-sm hover:bg-white transition-all w-full sm:w-auto min-w-[200px]"
          >
            View Solutions
          </a>
        </motion.div>

      </motion.div>

      {/* Corporate Grid Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-20 lg:px-40 opacity-[0.03]">
        <div className="w-px h-full bg-slate-950"></div>
        <div className="w-px h-full bg-slate-950"></div>
      </div>
    </section>
  );
};

export default HeroSection;