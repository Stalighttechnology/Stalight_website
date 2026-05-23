import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Cloud, MonitorSmartphone, Check } from "lucide-react";

// Update these paths to your actual assets
import leftImage from "@/assets/office/left.png";
import centerImage from "@/assets/office/center.png";
import rightImage from "@/assets/office/right.png";

const capabilities = [
  {
    title: "Software Training",
    tag: "Education",
    description: "Future-ready technical education and enterprise-level software expertise designed for modern businesses.",
    Icon: BookOpen,
    gradient: "from-orange-400 to-pink-500",
    lightBg: "bg-orange-50/80 hover:bg-orange-100",
    iconColor: "text-orange-500",
    shadow: "hover:shadow-orange-500/20"
  },
  {
    title: "IT Infrastructure",
    tag: "Architecture",
    description: "Scalable digital systems, cloud integration, and reliable IT architecture built for performance.",
    Icon: Cloud,
    gradient: "from-teal-400 to-emerald-500",
    lightBg: "bg-teal-50/80 hover:bg-teal-100",
    iconColor: "text-teal-500",
    shadow: "hover:shadow-teal-500/20"
  },
  {
    title: "Custom Solutions",
    tag: "Development",
    description: "Premium technology solutions crafted to accelerate operational growth and digital transformation.",
    Icon: MonitorSmartphone,
    gradient: "from-blue-500 to-indigo-500",
    lightBg: "bg-blue-50/80 hover:bg-blue-100",
    iconColor: "text-blue-500",
    shadow: "hover:shadow-blue-500/20"
  },
];

// Upgraded Animations using Spring Physics for a premium, natural feel
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

const AboutSection = () => {
  const mobileCards = [
    {
      title: "Skills Development",
      subtitle: "Empowering individuals with in-demand digital skills for tomorrow.",
      image: leftImage,
      tag: "Skills"
    },
    {
      title: "Solutions",
      subtitle: "Building smart, scalable solutions that drive business forward.",
      image: centerImage,
      tag: "Solutions"
    },
    {
      title: "Growth Together",
      subtitle: "Partnering with you to achieve sustainable growth and success.",
      image: rightImage,
      tag: "Growth"
    }
  ];

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center bg-[#FAFAFA] py-20 lg:py-28 overflow-hidden z-0">
      
      {/* Refined Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 100% 0%, rgba(244,180,67,0.15), transparent 40%), radial-gradient(circle at 0% 100%, rgba(45,174,174,0.1), transparent 40%), linear-gradient(rgba(220,225,230,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(220,225,230,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px, 40px 40px, 40px 40px, 40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-20">
        
        {/* TOP ROW: Hero Text & Main Image */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12 xl:gap-20">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <h2 className="text-orange-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
                  Our Excellence
                </h2>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6">
                Building Your <br />
                <span className="relative inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">
                  Digital Future
                  {/* Elegant curved underline */}
                  <svg className="absolute -bottom-3 left-0 w-full h-4 opacity-70" viewBox="0 0 300 20" fill="none" preserveAspectRatio="none">
                    <path d="M5 15Q150 5 295 15" stroke="url(#paint0_linear)" strokeWidth="4" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="paint0_linear" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F97316" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              
              <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                We bridge the gap between complex technology and your business goals with innovative, scalable, and future-proof solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <Link to="/about-us" className="relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden shadow-xl shadow-slate-900/20 group mt-2 transition-transform hover:scale-105 active:scale-95">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 text-xs lg:text-sm font-bold tracking-[0.15em] uppercase">
                  Discover More 
                  <ArrowRight size={16} className="group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Visual Layout */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center py-10 lg:py-0">

            {/* Mobile: horizontally scrollable cards so all three images are visible */}
            <div className="w-full lg:hidden">
              <div className="flex flex-col gap-6 py-6 px-4">
                {mobileCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 80, delay: i * 0.06 }}
                    className="relative bg-white rounded-3xl p-6 shadow-lg border border-slate-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{card.subtitle}</p>
                      </div>
                      <span className="ml-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.tag}</span>
                    </div>

                    <div className="mt-4 rounded-xl overflow-hidden h-[220px]">
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                    </div>

                    {i === 1 && (
                      <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md border border-slate-100">
                        <Check className="w-5 h-5 text-emerald-500" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop / large screens: keep the previous overlapping layout */}
            <div className="hidden lg:flex w-full relative justify-center items-center">
              {/* Ambient Glow behind images */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-400/20 rounded-full blur-[80px] -z-10"></div>

              <div className="relative flex items-center justify-center lg:gap-6">
                {/* Floating Left Image */}
                <motion.div 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="w-40 xl:w-48 h-72 xl:h-80 rounded-[28px] overflow-hidden border-4 border-white shadow-2xl mt-24 z-0"
                >
                  <img src={leftImage} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" alt="Workspace Left" />
                </motion.div>

                {/* Main Center Image */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 70, damping: 20 }}
                    className="w-[85vw] max-w-[340px] lg:w-72 xl:w-[360px] h-[400px] lg:h-[500px] rounded-[32px] overflow-hidden border-[6px] border-white bg-slate-50 shadow-[0_20px_50px_rgba(15,23,42,0.15)] relative group cursor-pointer"
                  >
                    <img src={centerImage} className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-110" alt="Office Main" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Floating Right Image */}
                <motion.div 
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="w-40 xl:w-48 h-72 xl:h-80 rounded-[28px] overflow-hidden border-4 border-white shadow-2xl mt-12 z-0"
                >
                  <img src={rightImage} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" alt="Office Right" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Dynamic Grid Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-24 lg:mt-32 relative z-10"
        >
          {capabilities.map((cap, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`bg-white rounded-[32px] p-8 lg:p-10 border border-slate-100 relative overflow-hidden group transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl ${cap.shadow}`}
            >
              {/* Animated Gradient Background Blob */}
              <div className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-br ${cap.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-all duration-700 ease-out group-hover:scale-150`} />
              
              {/* Icon Container with interactive hover */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-300 ${cap.lightBg}`}>
                <cap.Icon className={`w-7 h-7 ${cap.iconColor} transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-3`} />
              </div>
              
              <div className="relative z-10">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 block">
                  {cap.tag}
                </span>
                
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">
                  {cap.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base group-hover:text-slate-600 transition-colors">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;