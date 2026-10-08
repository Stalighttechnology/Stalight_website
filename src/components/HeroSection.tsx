import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import heroBg from "@/assets/backgrounds/background.webp";
import heroBgMobile from "@/assets/backgrounds/phoneback.webp";
import heroBgTablet from "@/assets/backgrounds/backtab.webp";

const easeOutExpo = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: easeOutExpo, delay: 0.2 },
  },
};

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const check = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  const getBgImage = () => {
    switch (deviceType) {
      case "mobile":
        return heroBgMobile;
      case "tablet":
        return heroBgTablet;
      case "desktop":
      default:
        return heroBg;
    }
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-white font-sans border-b border-slate-100"
    >
      {/* ──── BACKGROUND SYSTEM ──── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        {/* Dynamic responsive background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover"
          style={{
            backgroundImage: `url(${getBgImage()})`,
            backgroundPosition: deviceType === "desktop" ? "left center" : "center center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* ──── CONTENT GRID ──── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[100dvh]">

        {/* LEFT COLUMN: Typography & Copy */}
        <motion.div
          className="flex-1 max-w-2xl text-left flex flex-col justify-center pt-16 lg:pt-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Label */}
          <div className="flex items-center mb-6">
            <motion.span
              variants={itemVariants}
              className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500"
            >
              The Standard For
            </motion.span>
          </div>

          {/* Heading with pink-purple-blue color grading on 'Intelligence' */}
          <motion.h1
            variants={itemVariants}
            className="text-[3.25rem] sm:text-[4rem] md:text-[5.25rem] font-bold leading-[1.04] tracking-[-0.04em] text-[#0F172A] font-sans"
          >
            Enterprise
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] inline-block pb-3 -mb-3">
              Intelligence
            </span>
          </motion.h1>

          {/* Horizontal Red Line - Placed directly below heading */}
          <motion.div
            variants={lineVariants}
            className="mt-6 mb-8 h-[3.5px] w-14 rounded-full bg-[#D32027]"
          />

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-[15px] sm:text-base md:text-[17px] font-normal leading-8 text-slate-500"
          >
            Bridging academic rigor and enterprise-grade technology with secure, scalable platforms designed for institutional trust and measurable impact.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Primary button: Solid Dark Navy */}
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("services");
              }}
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0B101E] px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-500/25 active:translate-y-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Services</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>

            {/* Secondary button: Outlined white */}
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                handleScroll("products");
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-7 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B101E] backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Solutions</span>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Spacer to allow background image's crystal shards to show */}
        <div className="flex-1 w-full min-h-[300px] md:min-h-[450px] lg:min-h-[580px] pointer-events-none" />

      </div>
    </section>
  );
};

export default HeroSection;