import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Update these paths to your actual assets
import galleryImg1 from "@/assets/office/about0.jpg";
import galleryImg2 from "@/assets/office/about1.jpg";
import galleryImg3 from "@/assets/office/stalightoffice.png";
import galleryImg4 from "@/assets/office/stalightmainoffice.png";
import officeImg from "@/assets/office/office.jpeg";

const images = [galleryImg1, galleryImg2, galleryImg3, galleryImg4];

const capabilities = [
  {
    title: "Software Training",
    tag: "Education",
    description: "Future-ready technical education and enterprise-level software expertise designed for modern businesses.",
  },
  {
    title: "IT Infrastructure",
    tag: "Architecture",
    description: "Scalable digital systems, cloud integration, and reliable IT architecture built for performance.",
  },
  {
    title: "Custom Solutions",
    tag: "Development",
    description: "Premium technology solutions crafted to accelerate operational growth and digital transformation.",
  },
];

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % capabilities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex items-center bg-[#FAFAFA] py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at top right, rgba(244,180,67,0.16), transparent 35%), radial-gradient(circle at bottom left, rgba(45,174,174,0.12), transparent 28%), linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }}
        />
      </div>

      {/* Decorative Background Elements (Reference image_a3e93c.jpg) */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-orange-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-teal-50/50 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-orange-500 font-bold tracking-[0.2em] uppercase text-sm mb-4">
                Our Excellence
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold text-[#1A1A1A] leading-[1.1]">
                Building Your <br />
                <span className="relative">
                  Digital Future
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 20" fill="none">
                    <path d="M5 15Q150 5 295 15" stroke="#F4B043" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
            </motion.div>

            <div className="relative h-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <p className="text-gray-600 text-lg leading-relaxed max-w-md italic">
                    "{capabilities[currentIndex].description}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <Link to="/about-us" className="relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 bg-slate-900 text-white rounded-full overflow-hidden shadow-md group">
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs lg:text-sm font-bold tracking-[0.15em] uppercase">
                About Us <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* RIGHT VISUAL - THE "TAGGED PHOTO" DESIGN */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            
            {/* The Triple Capsule Layout (Inspired by image_a3f157.png) */}
            <div className="relative flex items-center gap-4">
              
              {/* Left Secondary Image */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-64 md:w-40 md:h-80 rounded-[32px] overflow-hidden border border-white/80 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.16)] mt-20"
              >
                <img
                  src={galleryImg3}
                  className="h-full w-full object-cover"
                  alt="Stalight Workspace Left"
                />
              </motion.div>

              {/* Main Center Image */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="w-56 h-80 md:w-72 md:h-[450px] rounded-[40px] overflow-hidden border border-white/90 bg-slate-50 shadow-[0_40px_90px_rgba(15,23,42,0.18)] z-10 relative"
                >
                  <img
                    src={officeImg}
                    className="h-full w-full object-cover"
                    alt="Stalight Office"
                  />
                </motion.div>
              </div>

              {/* Right Secondary Image */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-32 h-64 md:w-40 md:h-80 rounded-[32px] overflow-hidden border border-white/80 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.16)] mt-10"
              >
                <img
                  src={galleryImg4}
                  className="h-full w-full object-cover"
                  alt="Stalight Main Office HQ"
                />
              </motion.div>
            </div>

            {/* Decorative Ambient Glow */}
            <div className="absolute top-4 right-10 w-16 h-16 rounded-full bg-orange-200/30 blur-3xl" />
            <div className="absolute bottom-8 left-12 w-24 h-24 rounded-full bg-sky-100/30 blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;