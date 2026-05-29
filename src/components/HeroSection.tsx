import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import heroBg from "@/assets/backgrounds/hero-bg.jpg";

const easeOutExpo = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOutExpo,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOutExpo },
  },
};

const HeroSection = ({ isTransitioning = false }: { isTransitioning?: boolean }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#F8F7F3] font-sans border-b border-slate-200"
    >
      {/* Background Section */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Background Image Container without clipPath */}
        <div
          className="absolute inset-y-0 right-0 w-full md:w-[72%] bg-cover bg-center bg-no-repeat opacity-95"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />

        {/* 
          Slanted Slit / Visual Split: 
          Instead of clip-path polygon, we use a sharp linear-gradient background overlay.
          For desktop: slanted cut starting at 24% width.
          For mobile: fades the background out so the text is fully legible.
        */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,247,243,0.52),rgba(248,247,243,0.86)_58%,rgba(248,247,243,1)_100%)] md:bg-gradient-to-r md:from-[#F8F7F3] md:via-[#F8F7F3]/90 md:to-transparent md:via-[26%] md:from-[24%]" />

        {/* Soft Decorative Ambient Glows - Blur reduced to 40px for paint optimization */}
        <div className="absolute top-[5%] left-[0%] h-64 w-64 md:h-96 md:w-96 bg-[radial-gradient(circle,rgba(211,32,39,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[0%] right-[0%] h-72 w-72 md:h-[400px] md:w-[400px] bg-[radial-gradient(circle,rgba(15,23,42,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.01] [background-image:linear-gradient(rgba(15,23,42,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-6 lg:px-8 transform-gpu"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className="flex flex-col gap-3 md:gap-4" variants={itemVariants}>
          <span className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500 sm:text-base">
            The Standard for
          </span>
          <span className="mx-auto max-w-5xl text-[3rem] font-black leading-[0.92] tracking-[-0.05em] text-[#0B101E] sm:text-6xl md:text-7xl lg:text-8xl">
            Enterprise <br className="block md:hidden" />
            Intelligence
          </span>
        </motion.h1>

        {/* Separator Line */}
        <motion.div
          variants={itemVariants}
          className="mt-7 mb-8 h-1.5 w-14 origin-center rounded-full bg-[#D32027] md:w-16"
        />

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-[15px] font-medium leading-7 text-slate-600 sm:text-base md:text-lg"
        >
          Bridging academic rigor and enterprise-grade technology with secure, scalable
          platforms designed for institutional trust and measurable impact.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4"
        >
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("services");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              } else {
                window.location.hash = "#services";
              }
            }}
            className="group relative flex w-full min-w-[220px] items-center justify-center overflow-hidden rounded-xl bg-[#0B101E] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_18px_40px_rgba(11,16,30,0.18)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full bg-[#D32027] transition-transform duration-500 group-hover:translate-x-0" />
            <span className="relative z-10 flex items-center gap-2">
              Explore services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>

          <a
            href="#products"
            className="flex w-full min-w-[220px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B101E] transition-all duration-300 hover:bg-slate-50 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:w-auto"
          >
            View Solutions
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;