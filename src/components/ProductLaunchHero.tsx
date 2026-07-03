import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Layers, Smartphone, LayoutDashboard, ArrowRight, GraduationCap, BookOpen, Calendar, FileCheck, BarChart, Target, Wallet, Bus, Library, Home, Users, Lock, Globe, Bell, X, Loader2, Send } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useLaunchCountdown, TARGET_LAUNCH_DISPLAY } from "@/hooks/useLaunchCountdown";

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
  const { isLaunched, timeLeft, isReady } = useLaunchCountdown();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ full_name: "", official_email: "", phone: "", organization: "", designation: "", interested_solution: "", preferred_date: "", preferred_time: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      full_name: formData.full_name || null,
      official_email: formData.official_email || null,
      phone: formData.phone || null,
      organization: formData.organization || null,
      designation: formData.designation || null,
      interested_solution: formData.interested_solution || null,
      preferred_date: formData.preferred_date || null,
      preferred_time: formData.preferred_time || null,
      message: formData.message || null,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase.from('neurocampus_inquiries').insert([payload]);
    setIsSubmitting(false);

    if (error) {
      alert('Submission error: ' + error.message);
      return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
    }, 3000);

    setFormData({ full_name: "", official_email: "", phone: "", organization: "", designation: "", interested_solution: "", preferred_date: "", preferred_time: "", message: "" });
  };

  return (
    <AnimatePresence>
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0, transition: { duration: 0.45 } }} className="relative isolate flex flex-col w-full min-h-[100dvh] overflow-x-hidden bg-white font-sans border-b border-slate-200">

      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full min-h-[1000px]">
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute top-[-10%] right-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl" />
      </div>

      {/* FIX: Reduced extreme paddings to allow content to fit perfectly on laptop screens */}
      <div className="container relative z-10 mx-auto px-4 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-32 lg:pb-16 w-full max-w-[1400px]">

        {/* Hero Top Content */}
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl tracking-tight leading-none text-slate-900 mb-4 flex flex-wrap justify-center gap-2 sm:gap-4">
            <span className="font-light uppercase">STALIGHT</span>
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 bg-[length:200%_auto]"
            >
              Campus
            </motion.span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2 variants={itemVariants} className="text-base sm:text-lg md:text-2xl font-medium leading-[1.3] tracking-wide text-slate-500 mb-4 text-center">
            Smart Campus. Better Learning.
          </motion.h2>

          {/* FIX: Reduced margin bottom here from mb-10 to mb-6 */}
          <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-center px-2">
            An All-in-One Campus Management Solution for Modern Educational Institutions. Streamline administration, improve communication, and deliver a better learning experience.
          </motion.p>

          {/* Launch Countdown */}
          <AnimatePresence>
            {(!isLaunched || !isReady) && (
              <motion.div
                key="timer-box"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto", transition: { duration: 0.5, ease: easeOutExpo } }}
                exit={{ opacity: 0, height: 0, scale: 0.95, transition: { duration: 0.4 } }}
                className="relative w-full max-w-sm sm:max-w-auto sm:inline-flex group origin-top pb-6 justify-center mx-auto"
              >
                <div className="mb-4 sm:mb-6 mt-2 relative w-full sm:w-auto">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>
                  <div className="relative bg-white/95 backdrop-blur-md border border-white/60 rounded-2xl p-3 sm:p-5 flex flex-col items-center gap-2 shadow-2xl w-full">
                    <div className="flex items-center justify-center gap-2 mb-1 px-1">
                      <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{TARGET_LAUNCH_DISPLAY}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 sm:gap-4 md:gap-5 px-1 sm:px-4 w-full">
                      <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
                        <span className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tabular-nums leading-none tracking-tight">{String(timeLeft.days).padStart(2, '0')}</span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1 sm:mt-2">Days</span>
                      </div>
                      <span className="text-xl sm:text-3xl md:text-4xl font-black text-slate-300 pb-3 sm:pb-5 animate-pulse">:</span>
                      <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
                        <span className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tabular-nums leading-none tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1 sm:mt-2">Hours</span>
                      </div>
                      <span className="text-xl sm:text-3xl md:text-4xl font-black text-slate-300 pb-3 sm:pb-5 animate-pulse">:</span>
                      <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
                        <span className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tabular-nums leading-none tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1 sm:mt-2">Mins</span>
                      </div>
                      <span className="text-xl sm:text-3xl md:text-4xl font-black text-slate-300 pb-3 sm:pb-5 animate-pulse">:</span>
                      <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
                        <span className="text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-500 to-purple-600 tabular-nums leading-none tracking-tight">{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-pink-500 mt-1 sm:mt-2">Secs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Why Choose Stalight */}
          <motion.div variants={itemVariants} className="mb-8 w-full max-w-4xl mx-auto px-2">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-[1px] w-8 sm:w-12 bg-slate-200"></span>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                Why Choose Us
              </p>
              <span className="h-[1px] w-8 sm:w-12 bg-slate-200"></span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-center">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 p-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-1 sm:mb-2">
                    <item.icon size={20} className="text-purple-600 sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">{item.title}</span>
                  <span className="text-[10px] sm:text-xs text-slate-500 leading-tight">{item.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto relative flex-wrap z-20 mx-auto px-4">
            <AnimatePresence mode="wait">
              {isLaunched && (
                <motion.a
                  key="access-btn"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  href="https://campus.stalight.in/stalightcampus" target="_blank" rel="noopener noreferrer" className="group relative flex w-full sm:w-auto min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 px-6 py-3.5 sm:py-4 text-[12px] font-bold uppercase tracking-widest text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:-translate-y-0.5 overflow-hidden">
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative flex items-center gap-2">
                    Get Access <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.a>
              )}
            </AnimatePresence>
          </motion.div>

        </motion.div>

        {/* Core Modules Marquee - FIX: Reduced top margin significantly so it tucks nicely under the button */}
        <motion.div
          className="relative mt-12 sm:mt-14 lg:mt-16 w-full max-w-[1200px] mx-auto z-20 pb-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 mb-6 sm:mb-8">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-purple-100 shadow-sm">14+ Core Modules</span>
            <p className="text-[11px] sm:text-sm text-slate-500 text-center px-4 font-medium">Everything you need to manage your institution</p>
          </motion.div>


          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-20 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 blur-2xl -z-10 rounded-full pointer-events-none"></div>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #94a3b8;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Demo Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsFormOpen(false)} />

          <div className="relative z-[110] w-full max-w-2xl bg-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-slate-100 max-h-[90dvh] flex flex-col overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 sm:h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 z-20"></div>

            <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-6 shrink-0 border-b border-slate-100 bg-white relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Schedule a Live Demo</h3>
              <button onClick={() => setIsFormOpen(false)} className="p-2 -mr-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar p-5 sm:p-8 relative">
              <form id="hero-demo-form" onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 text-left font-sans">
                {submitted && (
                  <div className="sm:col-span-2 bg-green-50 border border-green-100 text-green-800 px-4 py-3 rounded-xl text-sm font-medium">
                    Demo request submitted — we will reach out to confirm the schedule.
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input name="full_name" placeholder="Your full name" value={formData.full_name} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Official Email *</label>
                  <input name="official_email" type="email" placeholder="name@institution.edu" value={formData.official_email} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input name="phone" placeholder="+91 9380937502" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Organization / Institution Name *</label>
                  <input name="organization" placeholder="Company / Institution" value={formData.organization} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Designation / Role *</label>
                  <input name="designation" placeholder="e.g., Principal, HOD, Placement Officer" value={formData.designation} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Interested Solution *</label>
                  <Select value={formData.interested_solution} onValueChange={(val) => setFormData(s => ({ ...s, interested_solution: val }))}>
                    <SelectTrigger className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900">
                      <SelectValue placeholder="Select a solution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stalight_campus">Stalight Campus</SelectItem>
                      <SelectItem value="neurosync">Stalight Sync</SelectItem>
                      <SelectItem value="both">Both / Integration</SelectItem>
                      <SelectItem value="custom">Custom / Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Preferred Demo Date *</label>
                  <input name="preferred_date" type="date" value={formData.preferred_date} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Preferred Demo Time *</label>
                  <input name="preferred_time" type="time" value={formData.preferred_time} onChange={handleChange} required className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm text-slate-900" />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Additional Notes</label>
                  <textarea name="message" placeholder="Any specific agenda or requirements" value={formData.message} onChange={handleChange} rows={3} className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm resize-none text-slate-900" />
                </div>
              </form>
            </div>

            <div className="px-5 sm:px-8 py-4 shrink-0 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 relative z-10">
              <button type="button" onClick={() => setIsFormOpen(false)} disabled={isSubmitting} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <button type="submit" form="hero-demo-form" disabled={isSubmitting} className="px-5 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSubmitting ? 'Submitting...' : 'Request Demo'}
              </button>
            </div>
          </div>
        </div>
      )}
        </motion.section>
    </AnimatePresence>
  );
};

export default ProductLaunchHero;