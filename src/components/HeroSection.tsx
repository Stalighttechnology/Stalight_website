import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/backgrounds/hero-bg.jpg"; 

const customEase = [0.19, 1.0, 0.22, 1.0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const revealVariants = {
  hidden: { y: "30%", opacity: 0 },
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
      // Changed: h-screen is forced, overflow is hidden to prevent any scrollbars at 100% zoom
      className="relative h-screen min-h-[500px] max-h-[1080px] w-full flex items-center justify-center overflow-hidden bg-[#F8F7F3] font-sans border-b border-slate-200"
    >
      
      {/* Background Graphic - Lowered opacity for better text contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div 
          className="absolute right-0 w-full md:w-[70%] h-full"
          style={{ 
            clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0 100%)",
            background: `url(${heroBg}) center/cover no-repeat`,
            mixBlendMode: "multiply"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F3] via-[#F8F7F3]/60 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <motion.div 
        className="relative z-10 w-full px-6 flex flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* Adjusted Heading: Using smaller 'clamp' values to ensure it fits laptop screens */}
        <h1 className="flex flex-col gap-1 mb-4 md:mb-6">
          <motion.span 
            variants={revealVariants}
            className="text-slate-600 font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight"
          >
            The Standard for
          </motion.span>
          <motion.span 
            variants={revealVariants}
            className="text-slate-950 font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter"
          >
            Enterprise Intelligence.
          </motion.span>
        </h1>

        {/* Thinner, tighter divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-16 h-1 bg-[#D32027] mb-6 md:mb-8"
        />

        {/* Subtitle: Reduced max-width and font-size for better "Fit" */}
        <motion.p 
          variants={revealVariants}
          className="max-w-xl md:max-w-2xl text-sm md:text-base lg:text-lg text-slate-600 font-light leading-relaxed mb-8 px-4"
        >
          Bridging academic rigour and enterprise-grade AI—delivering 
          platforms built for scale and institutional trust.
        </motion.p>

        {/* Buttons: Clean, non-intrusive sizing */}
        <motion.div 
          variants={revealVariants} 
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#contact"
            className="group relative px-8 py-3 bg-slate-950 text-white overflow-hidden shadow-md transition-all w-full sm:w-auto min-w-[200px]"
          >
            <div className="absolute inset-0 w-full h-full bg-[#D32027] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative z-10 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
              Institutional Inquiry
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
          
          <a
            href="#products"
            className="px-8 py-3 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-900 border border-slate-300 bg-white/50 backdrop-blur-sm hover:bg-white transition-all w-full sm:w-auto min-w-[200px]"
          >
            View Solutions
          </a>
        </motion.div>

      </motion.div>

      {/* Corporate Grid Overlay (Subtle) */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-10 md:px-20 lg:px-40 opacity-[0.03]">
        <div className="w-px h-full bg-slate-950"></div>
        <div className="w-px h-full bg-slate-950"></div>
      </div>
    </section>
  );
};

export default HeroSection;