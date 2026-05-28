import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import ProductLaunchHero from "./ProductLaunchHero";

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slides = [HeroSection, ProductLaunchHero];

  // We removed setInterval. The slide change is now driven perfectly by the progress bar's completion.

  const CurrentSlide = slides[activeIndex];

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden bg-[#F8F7F3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ease-out ${
              activeIndex === idx 
                ? "w-16 bg-slate-300" 
                : "w-12 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {activeIndex === idx && (
              <motion.div
                key={`progress-${activeIndex}`}
                className="absolute top-0 left-0 h-full bg-slate-900"
                initial={{ width: "0%" }}
                animate={{ width: isHovered ? "0%" : "100%" }} // pauses/resets on hover, but we just want a smooth fill. Let's just use 100% and a CSS trick if needed. Actually, if we just animate to 100%, it will fill.
                transition={{ 
                  duration: 5, 
                  ease: "linear"
                }}
                onAnimationComplete={() => {
                  if (!isHovered) {
                    setActiveIndex((current) => (current === 0 ? 1 : 0));
                  }
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
