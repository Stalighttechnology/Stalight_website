import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import devImg from "@/assets/products/it services.jpg";
import { Code2, MonitorSmartphone, Cpu, Layers, ArrowRight } from "lucide-react";

// --- Smooth Animation Variants ---
const fadeUp = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } 
};

const staggerContainer = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
};

// --- Service Data ---
const services = [
  {
    icon: <MonitorSmartphone className="w-7 h-7 text-indigo-600" />,
    title: "Web & App Development",
    desc: "Responsive, high-performance web applications and mobile platforms tailored to your specific business requirements."
  },
  {
    icon: <Code2 className="w-7 h-7 text-indigo-600" />,
    title: "Custom Software Solutions",
    desc: "End-to-end bespoke software engineering designed to solve complex challenges and scale alongside your growth."
  },
  {
    icon: <Layers className="w-7 h-7 text-indigo-600" />,
    title: "Enterprise Modernization",
    desc: "Upgrading legacy systems to modern, cloud-native architectures with seamless integration and zero data loss."
  },
  {
    icon: <Cpu className="w-7 h-7 text-indigo-600" />,
    title: "API & Microservices",
    desc: "Building robust backend systems and APIs to ensure secure, rapid communication across all your digital assets."
  }
];

const SoftwareDevelopment = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />

      {/* --- Hero Section --- */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer} 
        className="pt-32 pb-20 container mx-auto px-4 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold tracking-wide text-sm">
              Custom Engineering
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Build exactly what your business needs.
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              From intuitive websites to complex enterprise software, we engineer bespoke digital solutions. We turn your specific requirements into scalable, secure, and beautiful applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:info@stalight.tech" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="relative group perspective-1000">
            {/* Minimalist architectural backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-slate-50 rounded-3xl transform rotate-3 scale-105 -z-10 transition-transform duration-500 group-hover:rotate-6"></div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white bg-white">
              <img src={devImg} alt="Software Development Interface" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Detailed Services Section --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={staggerContainer} 
            className="mb-16 max-w-3xl"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Engineering solutions tailored to your workflow.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-slate-600 text-lg leading-relaxed">
              We don't believe in one-size-fits-all. Whether you need a sleek customer-facing website, an internal management dashboard, or a complete system overhaul, our development process adapts to your goals.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid md:grid-cols-2 gap-x-8 gap-y-12"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:shadow-sm">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-8"
          >
            Have a specific requirement in mind?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg mb-10"
          >
            Let's discuss how we can build custom software that drives your business forward.
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="mailto:info@stalight.tech" 
            className="inline-block px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors"
          >
            Contact Our Engineering Team
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SoftwareDevelopment;