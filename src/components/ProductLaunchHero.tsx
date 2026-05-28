import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Layers, Smartphone, LayoutDashboard, ArrowRight, GraduationCap, BookOpen, Calendar, FileCheck, BarChart, Target, Wallet, Bus, Library, Home, Users, Lock, Globe, Bell } from "lucide-react";

const easeOutExpo = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOutExpo } },
};

const whyChoose = [
  { icon: ShieldCheck, title: "Secure & Compliant", desc: "Enterprise-grade security" },
  { icon: Layers, title: "All-In-One Platform", desc: "Integrated ecosystem" },
  { icon: LayoutDashboard, title: "Real-Time Intelligence", desc: "Live dashboards" },
  { icon: Smartphone, title: "Accessible Anywhere", desc: "Web & mobile ready" },
];

const allModules = [
  { icon: GraduationCap, name: "Student Management", desc: "Admissions, profiles, lifecycle" },
  { icon: BookOpen, name: "Course Management", desc: "Curriculum, subjects, electives" },
  { icon: Calendar, name: "Smart Timetable", desc: "Real-time sync, faculty mapping" },
  { icon: FileCheck, name: "Examination (COE)", desc: "Full exam lifecycle & grading" },
  { icon: BarChart, name: "Performance Analytics", desc: "Data-driven academic insights" },
  { icon: Target, name: "CO/PO Analytics", desc: "NBA/NAAC accreditation ready" },
  { icon: Wallet, name: "Fees & Finance", desc: "Automated collection, payment gateway" },
  { icon: Bus, name: "Transport Management", desc: "Live tracking, fleet routes" },
  { icon: Library, name: "Library Management", desc: "Digital catalog, issue tracking" },
  { icon: Home, name: "Hostel Management", desc: "Room allocation, warden approvals" },
  { icon: Users, name: "Faculty & HR", desc: "Staff profiles, leave, attendance" },
  { icon: Lock, name: "Role-Based Access", desc: "Isolated dashboards per role" },
  { icon: Globe, name: "Multi-Campus Admin", desc: "Centralized superadmin dashboard" },
  { icon: Bell, name: "Announcements", desc: "Push notifications, broadcoasts" },
];

const ProductLaunchHero = () => {
  return (
    <section className="relative isolate flex h-[100dvh] w-full items-start lg:items-center justify-center overflow-y-auto overflow-x-hidden bg-white font-sans border-b border-slate-200 custom-scrollbar">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full min-h-[1000px]">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:60px_60px]" />
        
        {/* Gradients */}
        <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-[100px] transform-gpu" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-[100px] transform-gpu" />
      </div>

      <div className="container relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 px-5 py-20 lg:py-24 pb-32 sm:px-6 lg:px-8 max-w-[1400px]">
        
        {/* Left Column: Core Value Prop */}
        <motion.div
          className="flex flex-col justify-center items-start pt-10 lg:pt-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Launch Badge */}
          <motion.div variants={itemVariants} className="relative inline-flex mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 blur-sm opacity-50 transform-gpu"></div>
            <div className="relative bg-white border border-purple-200 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-800">Launching June 2nd</span>
            </div>
          </motion.div>

          {/* Logo & Product Name */}
          <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
            <img src="/campus logo.png" alt="Stalight Campus Logo" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600">STALIGHT</h2>
              <p className="text-sm sm:text-base font-bold text-slate-500 tracking-[0.3em] uppercase mt-1">Campus</p>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900 mb-6">
            Smart Campus. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600">
              Better Learning.
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
            An All-in-One Campus Management Solution for Modern Educational Institutions. Streamline administration, improve communication, and deliver a better learning experience.
          </motion.p>

          {/* Why Choose Stalight */}
          <motion.div variants={itemVariants} className="mb-10 w-full max-w-lg">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-4">
              Why Choose Us <span className="h-[1px] flex-1 bg-slate-200"></span>
            </p>
            <div className="grid grid-cols-2 gap-4">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-slate-800">
                    <item.icon size={16} className="text-purple-600" />
                    <span className="text-sm font-bold">{item.title}</span>
                  </div>
                  <span className="text-xs text-slate-500 pl-6">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#demo" className="group relative flex min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 px-6 py-4 text-[12px] font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:-translate-y-0.5 overflow-hidden">
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative flex items-center gap-2">
                Join Waitlist <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>

        </motion.div>

        {/* Right Column: Full Features Grid */}
        <motion.div
          className="relative h-full flex flex-col justify-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="bg-white/60 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 sm:p-8">
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Core Modules</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full">14+ Features</span>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {allModules.map((mod, idx) => (
                <motion.div 
                  variants={itemVariants}
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0 group-hover:bg-purple-100 transition-colors">
                    <mod.icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight mb-1">{mod.name}</h4>
                    <p className="text-xs text-slate-500 leading-snug">{mod.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Subtle decoration for the module grid */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-2xl transform-gpu -z-10"></div>
        </motion.div>
      </div>

      {/* Global CSS for scrollbar inside the grid */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #cbd5e1;
        }
      `}</style>
    </section>
  );
};

export default ProductLaunchHero;
