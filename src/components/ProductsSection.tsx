import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// --- Images ---
import ncImg1 from "@/assets/screenshots/leavereqimage.png";
import ncImg2 from "@/assets/products/neurocampus11.jpg";

import nsImg1 from "@/assets/products/neurosync11.jpg";
import nsImg2 from "@/assets/products/neurosync22.jpg";

const neuroCampusImages = [ncImg1, ncImg2];
const neuroSyncImages = [nsImg1, nsImg2];

const ProductsSection = () => {
  const [ncIndex, setNcIndex] = useState(0);
  const [nsIndex, setNsIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const ncTimer = setInterval(() => {
      setNcIndex((prev) => (prev + 1) % neuroCampusImages.length);
    }, 8000);

    const nsTimer = setInterval(() => {
      setNsIndex((prev) => (prev + 1) % neuroSyncImages.length);
    }, 8000);

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

      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.2]"
        style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      ></div>

      {/* Optimized Ambient Glows */}
      <div className="absolute top-0 right-[-5%] sm:right-[-10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[40px] pointer-events-none transform-gpu"></div>
      <div className="absolute bottom-0 left-[-5%] sm:left-[-10%] w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-blue-500/5 rounded-full blur-[40px] pointer-events-none transform-gpu"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Enterprise-Grade <br className="hidden sm:block"/>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Platforms</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mx-auto px-4">
            Designed for scalability, performance, and institutional transformation. Empower your campus with platforms built for reliability and impact.
          </p>
        </div>

        {/* ===================== NEURO CAMPUS CARD ===================== */}
        <div onClick={() => { scrollToTop(); navigate('/neuro-campus'); }} className="block group mb-8 sm:mb-12 lg:mb-16 cursor-pointer">
          <div className="relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-slate-200/60 shadow-sm hover:border-purple-200 transition-all duration-500 overflow-hidden flex flex-col lg:flex-row">
            {/* Content Side */}
            <div className="w-full lg:w-[45%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-3 sm:mb-4 lg:mb-6">
                  <span className="font-light">Stalight</span>{' '}
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Campus</span>
                </h3>

                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8">
                  A unified campus platform that streamlines operations, secures access, and elevates academic outcomes.
                </p>

                {/* Buttons */}
                <div className="flex flex-col items-start gap-3">
                  <div className="relative inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full overflow-hidden shadow-sm">
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase">
                      Explore Platform <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* Campus Login (external) */}
                  <a
                    href="https://campus.stalight.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-full text-slate-900 bg-white hover:bg-slate-50 transition-colors duration-150 text-sm"
                  >
                    <span className="text-xs text-slate-500 mr-2">Already have Campus?</span>
                    <span className="underline font-semibold">Login</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Image Side */}
            <div className="w-full lg:w-[55%] bg-slate-50/50 border-t lg:border-t-0 lg:border-l border-slate-100 relative p-4 sm:p-6 lg:p-10 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[75%] h-[70%] sm:h-[75%] bg-purple-200/20 rounded-full blur-[40px] pointer-events-none transform-gpu"></div>

              <div className="relative w-full max-w-[500px] sm:max-w-[550px] aspect-[4/3] bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 overflow-hidden group-hover:-translate-y-1 transition-all duration-500">
                {/* Mac header */}
                <div className="h-6 sm:h-7 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1 z-20 relative">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
                {/* Image Crossfade */}
                <div className="relative w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)]">
                  {neuroCampusImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Campus screenshot"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
                        idx === ncIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================== NEURO SYNC CARD ===================== */}
        <div onClick={() => { scrollToTop(); navigate('/neurosync'); }} className="block group cursor-pointer">
          <div className="relative bg-white rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-slate-200/60 shadow-sm hover:border-blue-200 transition-all duration-500 overflow-hidden flex flex-col-reverse lg:flex-row">
            {/* Image Side */}
            <div className="w-full lg:w-[55%] bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 relative p-4 sm:p-6 lg:p-10 flex items-center justify-center overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] sm:w-[75%] h-[70%] sm:h-[75%] bg-blue-200/20 rounded-full blur-[40px] pointer-events-none transform-gpu"></div>

              <div className="relative w-full max-w-[500px] sm:max-w-[550px] aspect-[4/3] bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-200 overflow-hidden group-hover:-translate-y-1 transition-all duration-500">
                {/* Mac header */}
                <div className="h-6 sm:h-7 bg-slate-100 border-b border-slate-200 flex items-center px-3 gap-1 z-20 relative">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
                {/* Image Crossfade */}
                <div className="relative w-full h-[calc(100%-1.5rem)] sm:h-[calc(100%-1.75rem)]">
                  {neuroSyncImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Sync screenshot"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ease-in-out ${
                        idx === nsIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-[45%] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative z-10">
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-900 tracking-tight mb-3 sm:mb-4 lg:mb-6">
                  <span className="font-light">Stalight</span>{' '}
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Sync</span>
                </h3>

                <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8">
                  An assessment and upskilling platform with cloud-based execution, performance benchmarking, and hands-on practice.
                </p>

                {/* Buttons */}
                <div className="flex flex-col items-start gap-3">
                  <div className="relative inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-full overflow-hidden shadow-sm">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    <span className="relative z-10 flex items-center gap-1.5 text-xs font-bold tracking-[0.15em] uppercase">
                      Explore Platform <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  {/* NeuroSync Login (external page) */}
                  <Link
                    to="/neurosync"
                    onClick={(e) => { e.stopPropagation(); scrollToTop(); }}
                    className="inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-full text-slate-900 bg-white hover:bg-slate-50 transition-colors duration-150 text-sm"
                  >
                    <span className="text-xs text-slate-500 mr-2">Already have Sync?</span>
                    <span className="underline font-semibold">Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductsSection;