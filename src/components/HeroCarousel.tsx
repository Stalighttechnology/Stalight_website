import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import ProductLaunchHero from "./ProductLaunchHero";

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slides = [HeroSection, ProductLaunchHero];

  useEffect(() => {
    if (isHovered) return;
    
    const duration = activeIndex === 0 ? 4000 : 10000;
    const timer = setTimeout(() => {
      setActiveIndex((current) => (current === 0 ? 1 : 0));
    }, duration);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isHovered]);

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

    </div>
  );
};

export default HeroCarousel;
