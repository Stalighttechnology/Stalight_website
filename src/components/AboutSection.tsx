import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

// Images
import galleryImg1 from "@/assets/office/stalightoffice.png";
import galleryImg2 from "@/assets/office/stalightmainoffice.png";

const images = [galleryImg1, galleryImg2];

const capabilities = [
  {
    title: "Software Training",
    description: "Future-ready technical education and enterprise-level software expertise designed for modern businesses.",
  },
  {
    title: "IT Infrastructure",
    description: "Scalable digital systems, cloud integration, and reliable IT architecture built for performance.",
  },
  {
    title: "Custom Solutions",
    description: "Premium technology solutions crafted to accelerate operational growth and digital transformation.",
  },
];

const ease = [0.22, 1, 0.36, 1];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentCapability, setCurrentCapability] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.2, 1.2]);

  // Smooth mouse follow
  const mouseX = useSpring(0, { stiffness: 35, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 35, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto cycle images & capabilities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setCurrentCapability((prev) => (prev + 1) % capabilities.length);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#f7f7f5] py-20 md:py-32 lg:py-40"
    >
      {/* Background Elements */}
      <motion.div
        style={{
          x: useTransform(mouseX, (v) => v * 0.018),
          y: useTransform(mouseY, (v) => v * 0.018),
        }}
        className="absolute -left-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#D32027]/8 blur-3xl"
      />
      <motion.div
        style={{
          x: useTransform(mouseX, (v) => -v * 0.012),
          y: useTransform(mouseY, (v) => -v * 0.012),
        }}
        className="absolute -bottom-52 right-0 h-[720px] w-[720px] rounded-full bg-slate-400/8 blur-3xl"
      />

      <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:gap-20 lg:grid-cols-2">
          {/* LEFT SIDE - CONTENT */}
          <motion.div
            style={{ y: textY }}
            className="space-y-12 lg:space-y-16"
          >
            {/* Label */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[#D32027]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#D32027]">
                STALIGHT TECHNOLOGY
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl lg:text-[82px] xl:text-[92px] leading-[0.95] font-light tracking-[-0.04em] text-slate-950">
                Building
              </h1>
              <h1 className="text-6xl md:text-7xl lg:text-[82px] xl:text-[92px] leading-[0.95] font-light tracking-[-0.04em] text-slate-950">
                Digital
              </h1>
              <h1 className="text-[68px] md:text-[88px] lg:text-[108px] xl:text-[122px] leading-none font-black italic tracking-[-0.07em] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                Excellence.
              </h1>
            </div>

            {/* Description */}
            <p className="max-w-lg text-lg md:text-xl leading-relaxed text-slate-600 font-light tracking-tight">
              We empower businesses through premium software training, enterprise-grade IT infrastructure, 
              and future-focused technology solutions crafted with innovation and precision.
            </p>

            {/* Capabilities */}
            <div className="pt-6">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400">
                  CORE EXPERTISE
                </span>
                <div className="h-px w-20 bg-gradient-to-r from-[#D32027] to-transparent" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCapability}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.85, ease }}
                  className="flex gap-6"
                >
                  <div className="mt-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="h-3.5 w-3.5 rounded-full bg-[#D32027]" />
                      <div className="absolute inset-0 rounded-full border border-[#D32027]/30 animate-ping" />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-900">
                      {capabilities[currentCapability].title}
                    </h3>
                    <p className="text-[17px] leading-relaxed text-slate-600">
                      {capabilities[currentCapability].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT SIDE - VISUAL */}
          <motion.div
            style={{ rotate }}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] lg:max-w-none">
              {/* Outer Frame */}
              <div className="absolute -inset-6 rounded-[42px] border border-slate-200/60" />

              {/* Main Image Container */}
              <div className="relative h-[520px] md:h-[620px] lg:h-[680px] overflow-hidden rounded-3xl shadow-2xl shadow-black/20 bg-black">
                <motion.div style={{ y: imageY }} className="absolute inset-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={images[currentImage]}
                      alt="Stalight Office"
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.12 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

                {/* Shine Effect */}
                <motion.div
                  animate={{ x: ["-120%", "280%"] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                />

                {/* Subtle Border Accent */}
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute inset-4 rounded-[22px] border border-white/20 pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;