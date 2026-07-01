import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import ProductLaunchHero from "./ProductLaunchHero";
import { AnimatePresence, motion } from "framer-motion";
import { TARGET_LAUNCH_DATE } from "@/hooks/useLaunchCountdown";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check lock state immediately on mount
    const checkLockState = () => {
      const now = new Date().getTime();
      const targetDate = new Date(TARGET_LAUNCH_DATE).getTime();
      const diff = targetDate - now;
      
      // Lock if within 50 seconds before launch OR within 15 minutes (900,000 ms) after launch
      return (diff <= 50000 && diff > 0) || (diff <= 0 && diff >= -900000);
    };

    if (checkLockState()) {
      setCurrentSlide(0);
    }

    const timer = setInterval(() => {
      if (checkLockState()) {
        setCurrentSlide(0); // Force to ProductLaunchHero
      } else {
        setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
      }
    }, 5000); // 5 seconds as requested

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#F8F7F3]">
      <AnimatePresence mode="wait">
        {currentSlide === 0 ? (
          <motion.div
            key="slide0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <ProductLaunchHero />
          </motion.div>
        ) : (
          <motion.div
            key="slide1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <HeroSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;
