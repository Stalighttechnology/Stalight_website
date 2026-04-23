import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import itImg from "@/assets/products/webapp.jpg";
import { Server, Shield, Cloud, Headset, Zap, Activity } from "lucide-react";

// --- Animation Variants ---
const fadeUp = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
};

const staggerContainer = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } } 
};

// --- Mock Data ---
const services = [
  { icon: <Cloud className="w-8 h-8 text-pink-500" />, title: "Cloud Migration", desc: "Seamless transition to scalable cloud infrastructure with zero downtime and high availability." },
  { icon: <Shield className="w-8 h-8 text-purple-500" />, title: "Cybersecurity", desc: "Proactive threat detection, regular vulnerability assessments, and strict compliance." },
  { icon: <Headset className="w-8 h-8 text-blue-500" />, title: "24/7 Managed Support", desc: "Round-the-clock monitoring and a dedicated IT helpdesk to keep your team running smoothly." },
  { icon: <Server className="w-8 h-8 text-pink-600" />, title: "Infrastructure Ops", desc: "Optimized server, network, and hardware management tailored precisely for scale." },
];

const ITServices = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 overflow-hidden">
      <Navbar />

      {/* --- Hero Section --- */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer} 
        className="pt-32 pb-20 container mx-auto px-4 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
              Next-Gen <br />
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                IT Services
              </span> & Ops
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Empower your institution with robust managed operations, secure cloud migrations, and 24/7 proactive support. We handle the tech so you can focus on growth.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:info@stalight.tech" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Talk to an Expert
                <Zap className="w-5 h-5" />
              </a>
              <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-900 rounded-full font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-1">
                Explore Services
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Glowing background blur matched to your logo colors */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-3xl blur opacity-30"></div>
            <img src={itImg} className="relative z-10 w-full h-full object-cover rounded-2xl border border-white/20" alt="Stalight IT Services" />
          </motion.div>
        </div>
      </motion.section>

      {/* --- Services Grid Section --- */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer} 
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive IT Solutions
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 max-w-2xl mx-auto">
              Tailored technology strategies designed to streamline operations, enhance security, and drive innovation across your enterprise.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer} 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                whileHover={{ y: -10, transition: { duration: 0.2 } }} 
                className="p-8 bg-[#FAFAFA] rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="mb-6 p-4 bg-white rounded-xl shadow-sm inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Call to Action Section --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Dark background with abstract colored blurs */}
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-8 backdrop-blur-sm">
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to scale your infrastructure?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
              Join leading institutions that trust us for secure, reliable, and high-performance managed IT operations.
            </motion.p>
            <motion.a 
              variants={fadeUp} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:info@stalight.tech" 
              className="inline-block px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl"
            >
              Get Your Custom IT Assessment
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ITServices;