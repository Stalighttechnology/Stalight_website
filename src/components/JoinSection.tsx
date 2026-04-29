import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import carrier1Img from "@/assets/backgrounds/carrier1.jpg";
import carrier2Img from "@/assets/backgrounds/carrier2.jpg";
import campusImg from "@/assets/backgrounds/campus.jpg";

// --- Enterprise-Grade Easing & Variants ---
const premiumEase = [0.16, 1, 0.3, 1] as any;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const textRevealVariants: Variants = {
  hidden: { y: "110%", rotate: 2, opacity: 0 },
  visible: {
    y: 0,
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: premiumEase },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: premiumEase },
  },
};

// Masked Text Helper
const MaskedText = ({ children, className = "", variant = textRevealVariants }: { children: React.ReactNode; className?: string; variant?: Variants }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1">
    <motion.div variants={variant as any} className={className} style={{ transformOrigin: "left center" }}>
      {children}
    </motion.div>
  </div>
);

// High-End Image Reveal Component (Curtain Effect)
const CinematicImage = ({ src, alt, className = "", style = {} }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.3 }}
        animate={isInView ? { scale: 1 } : { scale: 1.3 }}
        transition={{ duration: 2, ease: premiumEase }}
        className="w-full h-full object-cover origin-center"
      />
      <motion.div
        initial={{ y: "0%" }}
        animate={isInView ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 1.2, ease: premiumEase, delay: 0.1 }}
        className="absolute inset-0 bg-slate-900 z-10"
      />
    </div>
  );
};

const CareersPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={containerRef} className="font-sans antialiased text-slate-900 bg-white selection:bg-[#D32027] selection:text-white">
      
      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: Architecture (Light Theme) */}
      {/* ----------------------------------------------------------------- */}
      <section id="careers" className="relative bg-[#FAFAFA] py-16 md:py-24 overflow-hidden">
        
        {/* Software Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.3 }}>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Row 1 */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-32 lg:mb-48"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="lg:col-span-5 z-20">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-950 leading-[1.05] mb-8 tracking-tight">
                <MaskedText>Careers built</MaskedText>
                <MaskedText><span className="font-bold">for scale.</span></MaskedText>
              </h2>
              
              <motion.p variants={fadeUpVariants} className="text-slate-600 text-lg md:text-xl font-light leading-relaxed border-l border-slate-300 pl-6 ml-1">
                We architect intelligent systems and high-availability pipelines that redefine how global enterprises operate. Work where clean code meets massive impact.
              </motion.p>
            </div>
            
            <div className="lg:col-span-7 relative z-10 mt-8 lg:mt-0">
              <CinematicImage 
                src={carrier1Img} 
                alt="Engineering Team"
                className="w-full aspect-[16/10] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8% 100%)" }}
              />
            </div>
          </motion.div>

          {/* Row 2 */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <div className="lg:col-span-7 order-2 lg:order-1 relative flex justify-end">
               <CinematicImage 
                 src={carrier2Img} 
                 alt="System Architecture"
                 className="w-11/12 md:w-4/5 aspect-[4/3] shadow-2xl hover:scale-[1.02] transition-transform duration-700 ease-out"
               />
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2 z-20">
              <motion.p variants={fadeUpVariants} className="text-slate-700 text-lg md:text-xl font-light leading-relaxed mb-12">
                Join a culture designed for those who value silent focus, quality relationships, and solving complex algorithmic challenges. We are looking for builders.
              </motion.p>
              
              <motion.div variants={fadeUpVariants}>
                <a
                  href="https://www.linkedin.com/in/stalight-technology-45391a378?utm_source=share_via&utm_content=profile&utm_medium=member_android"
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
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: Network (Dark Theme Premium Split Card) */}
      {/* ----------------------------------------------------------------- */}
      <section id="connect-grow" className="relative w-full py-2 md:py-24 bg-[#050810] overflow-hidden">
        
        {/* Subtle ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D32027]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-20">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="w-full max-w-7xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col lg:flex-row relative"
          >
            {/* Animated Laser Accent Line */}
            <motion.div 
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.5, ease: premiumEase } } }}
              className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#D32027] via-[#D32027]/50 to-transparent origin-left z-30"
            ></motion.div>

            {/* Left Content Half */}
            <div className="flex-1 p-2 md:p-14 lg:p-20 flex flex-col justify-center relative z-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-0 md:mb-6 tracking-tight text-white leading-[1.15]">
                <MaskedText>Connect &</MaskedText>
                <MaskedText><span className="text-[#D32027] font-light italic">Grow together.</span></MaskedText>
              </h2>
              
              <motion.p variants={fadeUpVariants} className="text-base md:text-lg font-light text-slate-400 leading-relaxed mb-2 md:mb-10 border-l-2 border-[#D32027]/30 pl-3">
                Beyond the corporate hierarchy, join a synchronized community of creators and system thinkers.
              </motion.p>
              
              <motion.div variants={fadeUpVariants} className="mt-auto md:mt-4">
                <a
                  href="#join"
                  className="group relative inline-flex items-center justify-center bg-white text-slate-950 px-8 py-4 text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-500 hover:shadow-[0_0_30px_-5px_rgba(211,32,39,0.4)] overflow-hidden rounded-full w-full sm:w-auto"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#D32027] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-out origin-bottom z-0"></span>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Initialize Connection
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Right Image Half */}
            <div className="flex-1 relative min-h-[60px] sm:min-h-[140px] md:min-h-[400px] lg:min-h-0 p-1 md:p-6 lg:p-8">
              <div className="w-full h-full relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-2xl">
                <motion.img 
                  initial={{ scale: 1.15 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: premiumEase }}
                  src={campusImg} 
                  alt="Corporate Campus" 
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] group-hover:scale-105 group-hover:brightness-95 transition-all duration-1000 ease-out origin-center"
                />
                {/* Inner shadow gradient to blend image with card */}
                <div className="absolute inset-0 bg-gradient-to-bl from-[#050810]/40 via-transparent to-[#050810]/80 pointer-events-none"></div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default CareersPage;