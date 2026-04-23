import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// --- Images ---
import ncImg1 from "@/assets/screenshots/leavereqimage.png";
import ncImg2 from "@/assets/products/neurocampus11.png";

import nsImg1 from "@/assets/products/neurosync11.png";
import nsImg2 from "@/assets/products/neurosync22.png";

const neuroCampusImages = [ncImg1, ncImg2];
const neuroSyncImages = [nsImg1, nsImg2];

const customEase = [0.19, 1.0, 0.22, 1.0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: customEase },
  },
};

const ProductsSection = () => {
  const [ncIndex, setNcIndex] = useState(0);
  const [nsIndex, setNsIndex] = useState(0);

  useEffect(() => {
    const ncTimer = setInterval(() => {
      setNcIndex((prev) => (prev + 1) % neuroCampusImages.length);
    }, 4000);

    const nsTimer = setInterval(() => {
      setNsIndex((prev) => (prev + 1) % neuroSyncImages.length);
    }, 4500);

    return () => {
      clearInterval(ncTimer);
      clearInterval(nsTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAFAFC] relative overflow-hidden z-10">

      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.3] sm:opacity-[0.4] md:opacity-[0.5]"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)', backgroundSize: '60px 60px sm:80px 80px' }}
      ></div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-[-5%] sm:right-[-10%] w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-[-5%] sm:left-[-10%] w-[350px] sm:w-[450px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[600px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px] md:blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- HEADER --- */}
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeUpVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Enterprise-Grade <br className="hidden sm:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Platforms</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto px-4">
            Designed for scalability, intelligence, and high-performance environments. Transform your institution with our flagship products.
          </motion.p>
        </motion.div>

        {/* ===================== NEURO CAMPUS CARD ===================== */}
        <Link to="/neuro-campus" onClick={scrollToTop} className="block group mb-8 sm:mb-12 lg:mb-16 xl:mb-20">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(168,85,247,0.2)] hover:border-purple-200 transition-all duration-700 overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Hover Gradient Aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Content Side */}
            <div className="w-full lg:w-[45%] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
              <motion.div variants={fadeUpVariants}>
                <div className="w-8 h-0.5 sm:w-10 sm:h-1 lg:w-12 lg:h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-4 sm:mb-6 lg:mb-8"></div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4 lg:mb-6">
                  Neuro Campus
                </h3>

                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                  A unified AI-powered campus ecosystem that transforms how institutions operate — 
                  from automated workflows to real-time intelligence. Built for scalability, precision, 
                  and next-generation academic excellence.
                </p>

                {/* Button */}
                <div className="relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-slate-900 text-white rounded-full overflow-hidden shadow-md">
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.15em] uppercase">
                    Explore Platform <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Image Side (Sleek UI Window) */}
            <div className="w-full lg:w-[55%] bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-100 relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center justify-center overflow-hidden">
              {/* Decorative background shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[75%] lg:w-[80%] h-[70%] sm:h-[75%] lg:h-[80%] bg-purple-200/40 rounded-full blur-[40px] sm:blur-[60px] lg:blur-[80px] group-hover:bg-purple-300/50 transition-colors duration-700"></div>

              <motion.div variants={fadeUpVariants} className="relative w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[600px] aspect-[4/3] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:scale-[1.01] sm:group-hover:scale-[1.02] transition-all duration-700">
                {/* Mac-style header */}
                <div className="h-6 sm:h-7 lg:h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 sm:px-4 gap-1 sm:gap-1.5 z-20 relative">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-red-400 transition-colors"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors"></div>
                </div>
                {/* Image Crossfade */}
                <div className="relative w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)] lg:h-[calc(100%-2rem)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`nc-${ncIndex}`}
                      src={neuroCampusImages[ncIndex]}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Link>

        {/* ===================== NEURO SYNC CARD ===================== */}
        <Link to="/neurosync" onClick={scrollToTop} className="block group">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
            className="relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.2)] hover:border-blue-200 transition-all duration-700 overflow-hidden flex flex-col-reverse lg:flex-row"
          >
            {/* Hover Gradient Aura */}
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            {/* Image Side (Sleek UI Window) */}
            <div className="w-full lg:w-[55%] bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex items-center justify-center overflow-hidden">
              {/* Decorative background shape */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[75%] lg:w-[80%] h-[70%] sm:h-[75%] lg:h-[80%] bg-blue-200/40 rounded-full blur-[40px] sm:blur-[60px] lg:blur-[80px] group-hover:bg-blue-300/50 transition-colors duration-700"></div>

              <motion.div variants={fadeUpVariants} className="relative w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[600px] aspect-[4/3] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden group-hover:-translate-y-1 sm:group-hover:-translate-y-2 group-hover:scale-[1.01] sm:group-hover:scale-[1.02] transition-all duration-700">
                {/* Mac-style header */}
                <div className="h-6 sm:h-7 lg:h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3 sm:px-4 gap-1 sm:gap-1.5 z-20 relative">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-red-400 transition-colors"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors"></div>
                </div>
                {/* Image Crossfade */}
                <div className="relative w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)] lg:h-[calc(100%-2rem)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`ns-${nsIndex}`}
                      src={neuroSyncImages[nsIndex]}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      initial={{ opacity: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-[45%] p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center relative z-10">
              <motion.div variants={fadeUpVariants}>
                <div className="w-8 h-0.5 sm:w-10 sm:h-1 lg:w-12 lg:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 sm:mb-6 lg:mb-8"></div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4 lg:mb-6">
                  NeuroSync
                </h3>

                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8 lg:mb-10">
                  An intelligent AI infrastructure designed to simulate, assess, and enhance workforce 
                  capabilities through adaptive learning, cloud-based IDE execution, and real-world scenario intelligence.
                </p>

                {/* Button */}
                <div className="relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-slate-900 text-white rounded-full overflow-hidden shadow-md">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.15em] uppercase">
                    Explore Platform <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Link>

      </div>
    </section>
  );
};

export default ProductsSection;