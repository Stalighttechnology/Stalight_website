import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import ProductLaunchHero from "./ProductLaunchHero";

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = [HeroSection, ProductLaunchHero];

  useEffect(() => {
    if (isHovered) return;
    
    const duration = activeIndex === 0 ? 4000 : 10000;
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setActiveIndex((current) => (current === 0 ? 1 : 0));
    }, duration);
    
    return () => clearTimeout(timer);
  }, [activeIndex, isHovered]);

  const CurrentSlide = slides[activeIndex];

  return (
    <div
      className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#F8F7F3]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait" onExitComplete={() => setIsTransitioning(false)}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0 w-full h-full"
          style={{ willChange: "transform, opacity" }}
        >
          <CurrentSlide isTransitioning={isTransitioning} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;

