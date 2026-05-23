import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Cpu } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

// Update these paths to your actual assets
import leftImage from "@/assets/office/abt1.jpg";
import rightImage from "@/assets/office/abt2.png";

const features = [
  { icon: Cpu, text: "Future-ready technical education" },
  { icon: ShieldCheck, text: "Scalable cloud & IT infrastructure" },
  { icon: Zap, text: "Premium custom digital solutions" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 20 } 
  }
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  
  // Parallax Scroll Effects for the images
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Left image moves up, Right image moves down slightly on scroll
  const leftImageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rightImageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#FAFAFC] py-20 lg:py-28 overflow-hidden z-0"
    >
      
      {/* Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Breathing Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-[100px] mix-blend-multiply" 
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* LEFT COLUMN: Text & Value Propositions */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-slate-700 font-bold tracking-[0.15em] uppercase text-[10px] sm:text-xs">
                  About Our Excellence
                </span>
              </div>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              Building Your <br className="hidden lg:block" />
              <span className="relative inline-block mt-2">
                {/* Flowing Gradient Text Animation */}
                <motion.span 
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-[length:200%_auto]"
                >
                  Digital Future
                </motion.span>
                
                {/* Elegant curved underline */}
                <svg className="absolute -bottom-2 left-0 w-full h-3 opacity-60 z-0" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                  <path d="M5 15Q150 5 295 15" stroke="url(#paint0_linear)" strokeWidth="6" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F97316" />
                      <stop offset="1" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              We bridge the gap between complex technology and your business goals. By delivering scalable software, modern IT infrastructure, and top-tier technical education, we empower you to lead in a digital-first world.
            </motion.p>

            {/* Seamless Animated Feature List */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-10 mx-auto lg:mx-0 max-w-md">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="group flex items-center gap-4 bg-white/60 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 shadow-sm cursor-default transition-colors hover:bg-white hover:border-orange-100 hover:shadow-orange-500/10"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-pink-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <feature.icon className="w-5 h-5 text-orange-500 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <span className="text-slate-700 font-semibold text-sm sm:text-base group-hover:text-slate-900 transition-colors">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link to="/about-us" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden shadow-xl shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/25">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 text-sm font-bold tracking-[0.1em] uppercase">
                  Discover More 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Parallax Staggered Non-Overlapping Grid */}
          <div className="lg:col-span-7 mt-12 lg:mt-0 w-full relative">
            
            {/* Ambient Back Glow for Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gradient-to-tr from-orange-100 to-pink-100 rounded-full blur-[80px] -z-10 opacity-60"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full">
              
              {/* Image 1: Left / Moves UP on scroll */}
              <motion.div 
                style={{ y: leftImageY }}
                className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-white bg-slate-100 sm:mt-12"
              >
                <OptimizedImage src={leftImage} alt="Workspace Detail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                
                {/* Static Clean Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-slate-100">
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-800">Growth & Skills</span>
                </div>
              </motion.div>

              {/* Image 2: Right / Moves DOWN on scroll */}
              <motion.div 
                style={{ y: rightImageY }}
                className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-white bg-slate-100 sm:-mt-12"
              >
                <OptimizedImage src={rightImage} alt="Enterprise Solutions" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                
                {/* Interactive Floating Label at bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-100 p-4 rounded-xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-0.5">Architecture</p>
                      <p className="text-slate-900 font-bold text-sm leading-tight">Enterprise Solutions</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="text-emerald-500 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;