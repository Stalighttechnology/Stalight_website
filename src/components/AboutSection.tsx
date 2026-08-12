import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Note: images removed for a cleaner professional layout

const features = [
  {
    title: "Future-ready technical education",
    desc: "Hands-on curricula, industry-aligned projects, and mentorship to upskill teams."
  },
  {
    title: "Scalable cloud & IT infrastructure",
    desc: "Robust cloud architectures, secure deployments, and cost-optimized operations."
  },
  {
    title: "Premium custom digital solutions",
    desc: "Tailored software built for performance, maintainability, and growth."
  }
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center bg-[#FAFAFC] py-20 lg:py-28 overflow-hidden z-0"
    >
      {/* Curved Divider between Hero and About */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -translate-y-[1px] pointer-events-none z-10">
        <svg 
          viewBox="0 0 1440 120" 
          className="relative block w-full h-[60px] md:h-[100px] lg:h-[140px]" 
          preserveAspectRatio="none"
        >
          {/* Animated Wave 1 (Back wave, slightly translucent lavender) */}
          <motion.path 
            animate={{
              d: [
                "M0,32 C240,70 480,10 720,50 C960,90 1200,30 1440,64 L1440,120 L0,120 Z",
                "M0,50 C240,20 480,80 720,40 C960,0 1200,60 1440,50 L1440,120 L0,120 Z",
                "M0,32 C240,70 480,10 720,50 C960,90 1200,30 1440,64 L1440,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill="#E9E3FF" 
            opacity="0.5"
          />
          {/* Animated Wave 2 (Middle wave, deeper tone) */}
          <motion.path 
            animate={{
              d: [
                "M0,60 C360,100 720,20 1080,70 C1200,85 1320,110 1440,90 L1440,120 L0,120 Z",
                "M0,40 C360,60 720,80 1080,45 C1200,30 1320,80 1440,70 L1440,120 L0,120 Z",
                "M0,60 C360,100 720,20 1080,70 C1200,85 1320,110 1440,90 L1440,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill="#DCD2FF" 
            opacity="0.3"
          />
          {/* Animated Wave 3 (Front main wave, matching the About Section background) */}
          <motion.path 
            animate={{
              d: [
                "M0,80 C360,40 720,90 1080,50 C1200,35 1320,70 1440,60 L1440,120 L0,120 Z",
                "M0,70 C360,90 720,40 1080,75 C1200,90 1320,50 1440,55 L1440,120 L0,120 Z",
                "M0,80 C360,40 720,90 1080,50 C1200,35 1320,70 1440,60 L1440,120 L0,120 Z"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            fill="#FAFAFC" 
          />
        </svg>
      </div>
      
      {/* Animated Ambient Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Subtle ambient glows (static for performance) */}
        <div className="absolute top-0 right-[-6%] w-[360px] h-[360px] bg-orange-400/12 rounded-full blur-[24px]  transform-gpu" style={{pointerEvents: 'none'}} />
        <div className="absolute bottom-[-6%] left-[-6%] w-[300px] h-[300px] bg-pink-400/12 rounded-full blur-[20px]  transform-gpu" style={{pointerEvents: 'none'}} />
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
            
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6 ">
              Building Your <br className="hidden lg:block" />
              <span className="relative inline-block mt-2">
                {/* Flowing Gradient Text Animation */}
                <span
                  className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-[length:200%_auto]"
                >
                  Digital Future
                </span>
                
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
            {/* Compact feature summary (no repeated descriptions) */}
            <div className="mb-10 mx-auto lg:mx-0 max-w-md">
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">Technical education</span>
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">Cloud & IT infrastructure</span>
                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold">Custom digital solutions</span>
              </div>
            </div>

            <motion.div variants={itemVariants}>
              <Link to="/about-us" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden shadow-xl shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/25">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 text-sm font-bold tracking-[0.1em] uppercase">
                  Discover More
                  <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Professional Feature Cards (images removed) */}
          <div className="lg:col-span-7 mt-12 lg:mt-0 w-full relative">

            {/* Ambient Back Glow for Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-gradient-to-tr from-orange-100 to-pink-100 rounded-full blur-[80px] -z-10 opacity-60 transform-gpu"></div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 w-full">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-white/60 border border-slate-100 rounded-2xl p-6 shadow-sm transition-all duration-200 "
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 rounded-full bg-orange-500 shrink-0" />
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg">{feature.title}</h3>
                      <p className="text-slate-500 text-sm mt-2 max-w-xl">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Call-to-action panel */}
              

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;