import React, { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import itImg from "@/assets/backgrounds/campus.jpg";
import { 
  Server, 
  Cloud, 
  Headset, 
  Zap, 
  Activity, 
  ArrowRight,
  X,
  Send,
  CheckCircle2,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { SEO } from "@/components/SEO";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";

// Use the shared Supabase client from `lib`
import { supabase } from "@/lib/supabaseClient";

// --- Animation Variants ---
const fadeUp: Variants = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } 
};

const staggerContainer: Variants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } } 
};

// --- Mock Data ---
const services = [
  {
    icon: <Cloud className="w-8 h-8 text-purple-600" />,
    title: "Cloud & Hosting",
    desc: "Reliable cloud infrastructure and deployment solutions designed for scalability and performance.",
    details: [
      "Managed hosting and deployment pipelines",
      "Autoscaling, load balancing and CDN integration",
      "Secure networking, VPCs and access controls",
      "Cost optimisation, monitoring and observability",
    ],
  },
  {
    icon: <Zap className="w-8 h-8 text-purple-600" />,
    title: "AI Automation",
    desc: "Automate workflows, customer interactions, and repetitive tasks using AI-powered solutions.",
    details: [
      "Intelligent workflow automation with LLMs and RPA",
      "AI-driven customer support (chatbots & voice agents)",
      "Process orchestration, monitoring and analytics",
      "Integration with CRMs, ERPs and enterprise systems",
    ],
  },
  {
    icon: <Activity className="w-8 h-8 text-purple-600" />,
    title: "Performance Optimization & Testing",
    desc: "Optimize system performance and reliability through profiling, testing, and targeted tuning.",
    details: [
      "Performance profiling and bottleneck analysis",
      "Load, stress, and soak testing at scale",
      "Automated regression testing and CI integration",
      "Caching, tuning, and resource optimization strategies",
    ],
  },
  {
    icon: <Server className="w-8 h-8 text-purple-600" />,
    title: "Infrastructure Ops",
    desc: "Optimized server, network, and hardware management tailored precisely for scale.",
    details: [
      "Server & network management",
      "Capacity planning and autoscaling",
      "Backup, DR and recovery",
      "Performance tuning and monitoring",
    ],
  }
];

const ITServices = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State matching the Supabase it_assessments table
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
    primary_it_focus: '',
    expected_timeline: '',
    current_challenges: ''
  });

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('it_assessments')
      .insert([formData]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please check your connection and try again.");
      return;
    }

    setIsSubmitted(true);
    
    // Auto-reset form after showing success message
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        company_name: '',
        primary_it_focus: '',
        expected_timeline: '',
        current_challenges: ''
      });
    }, 4000);
  };

  const scrollToAssessment = (e) => {
    e.preventDefault();
    const el = document.getElementById('assessment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIsFormOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 overflow-hidden selection:bg-purple-100 selection:text-purple-900">
      <SEO 
        title="Managed IT Services & Operations | Stalight Technologies"
        description="Empower your institution with robust managed operations, reliable cloud & hosting, and proactive support. We handle the tech so you can focus on growth."
      />
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-52 pb-8 sm:pb-12 md:pb-16 z-10 w-full flex flex-col items-center min-h-[70vh]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60 grayscale blur-sm"
            style={{ backgroundImage: `url(${itImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-white/40" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full text-center mb-8 sm:mb-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-light text-slate-950 tracking-tighter leading-[0.98] mb-6 px-2 text-center">
              <span className="font-light">Next-Gen</span>{' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">IT Services & Ops</span>
            </h1>

            <motion.p variants={fadeUp} className="text-slate-600 font-light text-lg max-w-3xl mx-auto leading-relaxed mb-6 px-2">
              Empower your institution with robust managed operations, secure cloud migrations, and proactive support. We handle the tech so you can focus on growth.
            </motion.p>

            <motion.div variants={fadeUp} className="relative z-20 mb-8 sm:mb-12 flex gap-4 flex-wrap justify-center">
              <a
                href="#assessment"
                onClick={scrollToAssessment}
                className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-[0.08em] uppercase">
                  Talk to an Expert 
                </span>
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 text-slate-900 rounded-full font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Services Grid Section --- */}
      <section id="services" className="py-20 bg-white border-t border-slate-100">
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
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center transform transition-transform group-hover:-translate-y-1 group-hover:shadow-sm">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{service.desc}</p>

                  <div className="mt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition">
                          Learn More
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:rounded-2xl p-6 bg-white">
                        <DialogHeader className="flex flex-col items-start gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                              {service.icon}
                            </div>
                            <DialogTitle className="text-lg sm:text-xl">
                              {(() => {
                                const parts = service.title.split(" ");
                                if (parts.length === 1) return <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">{service.title}</span>;
                                const tail = parts.pop();
                                return (
                                  <>
                                    <span className="font-light">{parts.join(" ")}</span>{' '}
                                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">{tail}</span>
                                  </>
                                );
                              })()}
                            </DialogTitle>
                          </div>
                          <DialogDescription className="text-slate-600 mt-1">{service.desc}</DialogDescription>
                        </DialogHeader>

                        <hr className="my-4 border-slate-100" />

                        <div className="mt-2 text-slate-700">
                          <ul className="list-disc pl-5 space-y-3">
                            {service.details?.map((d, i) => (
                              <li key={i} className="leading-relaxed">{d}</li>
                            ))}
                          </ul>
                        </div>

                        <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                          <DialogClose asChild>
                            <button
                              onClick={scrollToAssessment}
                              className="group relative inline-flex items-center justify-center px-4 py-2 bg-slate-950 text-white rounded-md overflow-hidden shadow-[0_10px_30px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-0.5 transition-all duration-200"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <span className="relative z-10 text-sm font-semibold">Get IT Assessment</span>
                            </button>
                          </DialogClose>
                          <DialogClose className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-900 rounded-md hover:bg-slate-200 transition">Close</DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA / Professional Assessment Form Section --- */}
      <section id="assessment" className="py-24 bg-white text-slate-900 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden min-h-[400px]">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
            
            <AnimatePresence mode="wait">
              {!isFormOpen ? (
                /* Initial CTA View */
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="p-10 md:p-16 text-center flex flex-col items-center justify-center h-full"
                >
                  <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to scale your infrastructure?</h2>
                  <p className="text-slate-600 text-lg mb-10 max-w-2xl">
                    Join leading institutions that trust us for secure, reliable, and high-performance managed IT operations. Let's discuss your specific needs.
                  </p>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                    <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-[0.08em] uppercase">
                      Get Your Custom IT Assessment <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </motion.div>
              ) : isSubmitted ? (
                /* Success View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-10 md:p-16 text-center flex flex-col items-center justify-center h-full min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Assessment Request Received!</h3>
                  <p className="text-slate-600 text-lg">Our IT specialists will review your details and contact you within 1 business day.</p>
                </motion.div>
              ) : (
                /* Form View */
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  className="p-8 md:p-12"
                >
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                    <div>
                      <h3 className="text-2xl font-black">IT Assessment Request</h3>
                      <p className="text-sm text-slate-500 mt-1">Please provide your professional details and operational needs.</p>
                    </div>
                    <button 
                      onClick={() => setIsFormOpen(false)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                      aria-label="Close form"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Full Name <span className="text-pink-500">*</span></label>
                        <input 
                          type="text" 
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleInputChange}
                          required 
                          placeholder="Jane Doe" 
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Work Email <span className="text-pink-500">*</span></label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          placeholder="jane@company.com" 
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" 
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Phone Number <span className="text-pink-500">*</span></label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required 
                          placeholder="+1 (555) 000-0000" 
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Company Name <span className="text-pink-500">*</span></label>
                        <input 
                          type="text" 
                          name="company_name"
                          value={formData.company_name}
                          onChange={handleInputChange}
                          required 
                          placeholder="Your Organization" 
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" 
                        />
                      </div>
                    </div>

                    {/* Row 3: Service & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Primary IT Focus <span className="text-pink-500">*</span></label>
                        <select 
                          name="primary_it_focus"
                          value={formData.primary_it_focus}
                          onChange={handleInputChange}
                          required 
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select an area...</option>
                          <option value="Cloud & Hosting Solutions">Cloud & Hosting Solutions</option>
                          <option value="AI & Workflow Automation">AI & Workflow Automation</option>
                          <option value="Performance Optimization">Performance Optimization</option>
                          <option value="Infrastructure & Ops">Infrastructure & Ops</option>
                          <option value="General Managed Services">General Managed Services</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Expected Timeline</label>
                        <select 
                          name="expected_timeline"
                          value={formData.expected_timeline}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select timeline...</option>
                          <option value="Immediate Attention Needed">Immediate Attention Needed</option>
                          <option value="1 to 3 Months">1 to 3 Months</option>
                          <option value="3 to 6 Months">3 to 6 Months</option>
                          <option value="Just Exploring Options">Just Exploring Options</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Details */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Current IT Challenges / Objectives <span className="text-pink-500">*</span></label>
                      <textarea 
                        name="current_challenges"
                        value={formData.current_challenges}
                        onChange={handleInputChange}
                        required 
                        rows={4} 
                        placeholder="Please briefly describe your current infrastructure challenges, bottlenecks, or goals for scaling..." 
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm resize-none"
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
                        ) : (
                          <>Submit Request <Send className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ITServices;