import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import heroBg from "@/assets/backgrounds/hero-bg.jpg";

const easeOutExpo = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: easeOutExpo, delay: 0.3 },
  },
};

const backgroundVariants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.8, ease: easeOutExpo },
  },
};

const HeroSection = () => {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const floatY = reduceMotion ? 0 : isMobile ? 10 : 22;
  const floatDuration = isMobile ? 8 : 10;

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#F8F7F3] font-sans border-b border-slate-200"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-y-0 right-0 w-full md:w-[72%]"
          style={{
            clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%)",
            background: `url(${heroBg}) center/cover no-repeat`,
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,247,243,0.52),rgba(248,247,243,0.86)_58%,rgba(248,247,243,1)_100%)] md:bg-[linear-gradient(90deg,rgba(248,247,243,0.98)_0%,rgba(248,247,243,0.82)_36%,rgba(248,247,243,0.18)_100%)]" />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, -floatY, 0],
                  x: [0, 10, 0],
                }
          }
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[14%] left-[7%] h-36 w-36 rounded-full bg-[#D32027]/10 blur-3xl md:h-56 md:w-56 md:bg-[#D32027]/12"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  y: [0, 16, 0],
                  x: [0, -12, 0],
                }
          }
          transition={{
            duration: floatDuration + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[12%] right-[8%] h-40 w-40 rounded-full bg-slate-900/8 blur-3xl md:h-64 md:w-64 md:bg-slate-900/10"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  opacity: [0.3, 0.55, 0.3],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 top-1/2 h-[70%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-[80px] md:w-[58%]"
        />

        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(15,23,42,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 py-24 text-center sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        

        <motion.h1 className="flex flex-col gap-3 md:gap-4">
          <motion.span
            variants={itemVariants}
            className="text-sm font-medium uppercase tracking-[0.32em] text-slate-500 sm:text-base"
          >
            The Standard for
          </motion.span>

          <motion.span
            variants={itemVariants}
            className="mx-auto max-w-5xl text-[3rem] font-black leading-[0.92] tracking-[-0.05em] text-[#0B101E] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Enterprise
            <br className="block md:hidden" />
            Intelligence
          </motion.span>
        </motion.h1>

        <motion.div
          variants={lineVariants}
          className="mt-7 mb-8 h-1.5 w-14 origin-center rounded-full bg-[#D32027] md:w-16"
        />

        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-[15px] font-medium leading-7 text-slate-600 sm:text-base md:text-lg"
        >
          Bridging academic rigor and enterprise-grade AI with secure, scalable
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
                // fallback: change hash
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
            className="flex w-full min-w-[220px] items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B101E] backdrop-blur-md transition-all duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:w-auto"
          >
            View Solutions
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;