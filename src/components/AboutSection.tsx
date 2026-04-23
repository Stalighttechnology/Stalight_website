import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Import office gallery images
import galleryImg1 from "@/assets/office/stalightoffice.png";
import galleryImg2 from "@/assets/office/stalightmainoffice.png";

const images = [galleryImg1, galleryImg2];

// The content that will continuously fade in and out
const coreCapabilities = [
  {
    title: "Comprehensive Software Training",
    description: "Expert-led training programs in modern technologies, programming languages, and enterprise software solutions designed to upskill teams and drive organizational excellence."
  },
  {
    title: "Professional IT Services",
    description: "End-to-end IT support including system administration, network management, infrastructure optimization, and technical consulting to keep your operations running seamlessly."
  },
  {
    title: "Custom IT Solutions",
    description: "Tailored software development and IT solutions engineered to solve your unique business challenges, improve efficiency, and deliver measurable ROI for your organization."
  }
];

// --- Premium Animation Variants ---
const customEase = [0.19, 1.0, 0.22, 1.0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const textRevealVariants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: customEase },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: customEase },
  },
};

// Masked Text Helper
const MaskedText = ({ children, className }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1">
    <motion.div variants={textRevealVariants} className={className}>
      {children}
    </motion.div>
  </div>
);

const AboutSection = () => {
  const containerRef = useRef(null);
  
  // States for our animated sections
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCapabilityIndex, setCurrentCapabilityIndex] = useState(0);
  
  // Setup Parallax for the right-side image container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "10%"]);

  // Master Timer for both Image Gallery and Text Fades
  useEffect(() => {
    // Cycles images every 4.5 seconds
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4500);

    // Cycles text capabilities every 4.5 seconds (offset slightly for dynamic feel)
    const textTimer = setInterval(() => {
      setCurrentCapabilityIndex((prev) => (prev + 1) % coreCapabilities.length);
    }, 4500);

    return () => {
      clearInterval(imageTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-28 md:py-40 bg-white font-sans overflow-hidden border-b border-slate-100"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-8 md:px-24 opacity-[0.03]">
        <div className="w-px h-full bg-slate-900"></div>
        <div className="w-px h-full bg-slate-900 border-l border-dashed border-slate-900"></div>
        <div className="w-px h-full bg-slate-900 hidden md:block"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          
          {/* --- LEFT COLUMN: Typography & Content --- */}
          <div className="order-2 lg:order-1 pr-0 lg:pr-8">
            <MaskedText className="text-[#D32027] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#D32027]"></span>
              Corporate Heritage
            </MaskedText>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-950 mb-10 leading-[1.05] tracking-tight">
              Transforming Business Through <br />
              <span className="font-bold">Software Excellence.</span>
            </h2>

            <motion.div variants={fadeUpVariants} className="text-slate-600 font-light text-[16px] md:text-[18px] leading-relaxed border-l border-slate-200 pl-6 mb-12">
              <p>
                Stalight Technology is your trusted partner for comprehensive software training, professional IT services, and innovative IT solutions. We empower organizations with cutting-edge technology expertise and customized solutions that drive growth, efficiency, and competitive advantage.
              </p>
            </motion.div>

            {/* --- REPLACED NUMBERS WITH DYNAMIC FADING TEXT --- */}
            <motion.div variants={fadeUpVariants} className="pt-8 border-t border-slate-100 min-h-[140px] relative">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Our Core Focus</p>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCapabilityIndex}
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: customEase }}
                  className="absolute top-12 left-0 w-full"
                >
                  <div className="flex gap-4 items-start">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#D32027] shrink-0"></div>
                    <div>
                      <h4 className="text-[15px] font-bold text-slate-900 uppercase tracking-widest mb-2">
                        {coreCapabilities[currentCapabilityIndex].title}
                      </h4>
                      <p className="text-slate-500 font-light text-[16px] leading-relaxed">
                        {coreCapabilities[currentCapabilityIndex].description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: Dynamic Image Gallery & Badge --- */}
          <motion.div 
            variants={fadeUpVariants} 
            className="order-1 lg:order-2 relative h-[450px] md:h-[600px] bg-slate-100 overflow-hidden shadow-2xl group rounded-lg"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 10% 100%)" }}
          >
            {/* Animated Crossfade Gallery */}
            <motion.div style={{ y: yParallax }} className="w-full h-[130%] absolute top-[-15%]">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="Stalight Technologies Office"
                  className="w-full h-full object-cover absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </motion.div>
            
            {/* Inner Shadow Overlay for depth */}
            <div className="absolute inset-0 border border-black/5 mix-blend-multiply pointer-events-none z-10"></div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;