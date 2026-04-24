import React from "react";
import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Code, GraduationCap, ServerCog, ArrowRight } from "lucide-react";

// Import IT Services image
import itServicesImg from "@/assets/products/it services.jpg";

// --- Updated Content Array (Only 3 Cards Remaining) ---
const capabilities = [
  { 
    icon: Code, 
    title: "Software Development", 
    desc: "Architecting resilient, hyper-scaled custom applications that drive core business transformation and modernize legacy ecosystems.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
  },
  { 
    icon: GraduationCap, 
    title: "Skill Development Training", 
    desc: "Empowering workforces and academic institutions with industry-leading technical training and advanced capability building.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
  },
  { 
    icon: ServerCog, 
    title: "IT Services", 
    desc: "Delivering comprehensive managed IT operations, secure web services, and seamless infrastructure optimization.",
    image: itServicesImg
  }
];

// --- Premium Animation Variants ---
const customEase = [0.19, 1.0, 0.22, 1.0] as any;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: customEase },
  },
};

const textRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: customEase },
  },
};

// Masked Text Helper
const MaskedText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1">
    <motion.div variants={textRevealVariants} className={className}>
      {children}
    </motion.div>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white text-slate-900 overflow-hidden font-sans border-t border-slate-100 relative">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-8 md:px-24 opacity-[0.03]">
        <div className="w-px h-full bg-slate-900"></div>
        <div className="w-px h-full bg-slate-900 border-l border-dashed border-slate-900"></div>
        <div className="w-px h-full bg-slate-900 hidden md:block"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
        >
          <div className="max-w-2xl">
            <MaskedText className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-[#D32027]"></div>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-slate-500">Our Capabilities</span>
            </MaskedText>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-950 mb-8 tracking-tight leading-[1.1]">
              <MaskedText>Institutional Grade</MaskedText>
              <MaskedText><span className="font-bold">Architecture.</span></MaskedText>
            </h2>
            
            <motion.p variants={cardVariants} className="text-slate-600 text-lg leading-relaxed font-light border-l-2 border-slate-200 pl-6">
              We deliver scalable software solutions engineered for the demands of the modern enterprise. Backed by deep industry expertise, we transform traditional workflows into intelligent digital experiences.
            </motion.p>
          </div>
          
          <motion.a 
            variants={cardVariants}
            href="#contact" 
            className="group inline-flex items-center gap-3 text-slate-900 text-[12px] font-bold uppercase tracking-[0.15em] mt-8 md:mt-0 pb-2 border-b border-transparent hover:border-[#D32027] hover:text-[#D32027] transition-colors"
          >
            Explore All Solutions 
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Grid Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {capabilities.map((item, i) => {
            const href = item.title === "Software Development" ? "/software-development" : item.title === "Skill Development Training" ? "/skill-development" : "/it-services";
            return (
              <Link to={href} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} key={item.title} className="block">
                <motion.div
                  variants={cardVariants}
                  className="group relative bg-white border border-slate-200 overflow-hidden hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2"
                >
              {/* Image Header with Cinematic Reveal */}
              <div className="h-56 overflow-hidden relative bg-slate-100">
                <motion.img 
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: customEase, delay: i * 0.1 }}
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-&lsqb;1.5s&rsqb; ease-out"
                />
                {/* Subtle gradient so the white floating badge looks good over light images */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>

              {/* Content Body */}
              <div className="p-8 relative">
                {/* Floating Icon Badge with Lift Animation */}
                <div className="absolute -top-8 left-8 w-14 h-14 bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:-translate-y-2 group-hover:shadow-lg group-hover:bg-[#D32027] group-hover:border-[#D32027] transition-all duration-500 ease-out z-10">
                  <item.icon className="w-6 h-6 text-[#D32027] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3 tracking-tight group-hover:text-[#D32027] transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-slate-600 text-[14.5px] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Red Animated Bottom Border - Center Expanding */}
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#D32027] scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500 ease-out z-20"></div>
            </motion.div>
            </Link>
          )})}
        </motion.div>
        
      </div>
    </section>
  );
};

export default ServicesSection;