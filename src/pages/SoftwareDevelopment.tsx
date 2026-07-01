import React, { useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import devImg from "@/assets/products/it services.jpg";
import {
  Code2,
  MonitorSmartphone,
  Cpu,
  Layers,
  ArrowRight,
  X,
  Send,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
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

// IMPORTANT: We are now using the direct supabase client instead of the helper file!
import { supabase } from "@/lib/supabaseClient";

// --- Smooth Animation Variants ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- Service Data ---
const services = [
  {
    icon: <MonitorSmartphone className="w-7 h-7 text-purple-600" />,
    title: "Web & App Development",
    desc: "Responsive, high-performance web applications and mobile platforms tailored to your specific business requirements.",
    details: [
      "Responsive websites (SPA/SSR) and Progressive Web Apps (PWAs)",
      "Native & cross-platform mobile apps (iOS / Android / React Native / Flutter)",
      "Performance & accessibility optimization",
      "CMS integrations and headless architectures",
      "SEO-friendly frontend implementations",
      "End-to-end testing (unit, integration, E2E) and CI/CD pipelines",
      "Monitoring, release management and post-launch support",
    ],
  },
  {
    icon: <Code2 className="w-7 h-7 text-purple-600" />,
    title: "Custom Software Solutions",
    desc: "End-to-end bespoke software engineering designed to solve complex challenges and scale alongside your growth.",
    details: [
      "Requirements analysis and solution design",
      "Architecture, data modelling and API contracts",
      "Full-stack implementation and integrations",
      "Scalability, performance tuning and security",
      "QA, automated testing and release automation",
      "Ongoing maintenance, SLAs and feature roadmaps",
    ],
  },
  {
    icon: <Layers className="w-7 h-7 text-purple-600" />,
    title: "Enterprise Modernization",
    desc: "Upgrading legacy systems to modern, cloud-native architectures with seamless integration and zero data loss.",
    details: [
      "Legacy assessment and migration planning",
      "Replatforming and microservices decomposition",
      "Data migration, validation and reconciliation",
      "Cloud adoption (AWS / GCP / Azure) and infra automation",
      "Security hardening and compliance support",
    ],
  },
  {
    icon: <Cpu className="w-7 h-7 text-purple-600" />,
    title: "API & Microservices",
    desc: "Building robust backend systems and APIs to ensure secure, rapid communication across all your digital assets.",
    details: [
      "API design (REST / GraphQL) and documentation",
      "Authentication, authorization and secure patterns",
      "Service mesh patterns, observability and tracing",
      "Rate limiting, caching and performance tuning",
      "Load testing, CI for APIs and production readiness",
    ],
  }
];

const SoftwareDevelopment = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Safety check for dropdown
    const serviceRequired = form.get("service_required");
    if (!serviceRequired) {
      alert("Please select a Service Required from the dropdown.");
      return;
    }

    // Map the form data to match the database exactly
    const payload = {
      full_name: form.get("full_name") || "",
      email: form.get("email") || "",
      phone: form.get("phone") || "",
      company_name: form.get("company_name") || "",
      service_required: serviceRequired || "",
      expected_timeline: form.get("timeline") || "",
      project_requirements: form.get("details") || "",
    };

    setIsSubmitting(true);

    // Call Supabase DIRECTLY to bypass the helper file issues
    const { error } = await supabase
      .from('project_inquiries')
      .insert([payload]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error submitting form:", error);
      alert("Database error: " + error.message);
      return;
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
    }, 4000);
  };

  const scrollToEstimate = (e) => {
    e.preventDefault();
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setIsFormOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      <SEO
        title="Custom Software Development in Bengaluru | Stalight Technologies"
        description="Stalight Technologies builds custom software, web applications, enterprise systems, and mobile apps for businesses and institutions across India. Scalable, secure, and tailored to your requirements — developed in Bengaluru, Karnataka."
        keywords="custom software development Bengaluru, web application development India, enterprise software solutions, mobile app development Bengaluru, software development company Karnataka, bespoke software development, scalable software solutions, business software development India, software engineering company Bengaluru, Stalight Technologies"
        jsonLd={[
          generateWebPageSchema(
            "Custom Software Development — Stalight Technologies Bengaluru",
            "Custom software development services including web applications, enterprise systems, and mobile apps for businesses and institutions across India.",
            "/software-development"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Software Development", item: "/software-development" }
          ])
        ]}
      />
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-52 pb-8 sm:pb-12 md:pb-16 z-10 w-full flex flex-col items-center min-h-[70vh]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60 grayscale blur-sm"
            style={{ backgroundImage: `url(${devImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-white/40" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full text-center mb-8 sm:mb-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-light text-slate-950 tracking-tighter leading-[0.98] mb-6 px-2">
              <span className="font-light">Build exactly</span>{' '}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">what your business needs.</span>
            </h1>

            <motion.p variants={fadeUp} className="text-slate-600 font-light text-lg max-w-3xl mx-auto leading-relaxed mb-6 px-2">
              From intuitive websites to complex enterprise software, we engineer bespoke digital solutions. We turn your specific requirements into scalable, secure, and beautiful applications.
            </motion.p>

            <motion.div variants={fadeUp} className="relative z-20 mb-8 sm:mb-12">
              <a
                href="#estimate"
                onClick={scrollToEstimate}
                className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-[0.08em] uppercase">
                  Start a Project <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                              onClick={scrollToEstimate}
                              className="group relative inline-flex items-center justify-center px-4 py-2 bg-slate-950 text-white rounded-md overflow-hidden shadow-[0_10px_30px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-0.5 transition-all duration-200"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <span className="relative z-10 text-sm font-semibold">Request Estimate</span>
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

      {/* --- CTA / Professional Project Inquiry Section --- */}
      <section id="estimate" className="py-24 bg-white text-slate-900 scroll-mt-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden min-h-[400px]">
            {/* Top gradient border highlight */}
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
                  <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to build something custom?</h2>
                  <p className="text-slate-600 text-lg mb-10 max-w-2xl">
                    Share your project requirements and our engineering team will craft a tailored strategy and timeline for your business.
                  </p>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                    <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-[0.08em] uppercase">
                      Start an Inquiry <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
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
                  <h3 className="text-3xl font-black mb-4">Inquiry Received Successfully!</h3>
                  <p className="text-slate-600 text-lg">Our engineering team will review your requirements and reach out within 1 business day.</p>
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
                      <h3 className="text-2xl font-black">Project Inquiry</h3>
                      <p className="text-sm text-slate-500 mt-1">Please provide your professional details and project scope.</p>
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
                        <input name="full_name" type="text" required placeholder="Jane Doe" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Work Email <span className="text-pink-500">*</span></label>
                        <input name="email" type="email" required placeholder="jane@company.com" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Phone Number <span className="text-pink-500">*</span></label>
                        <input name="phone" type="tel" required placeholder="+1 (555) 000-0000" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Company Name <span className="text-pink-500">*</span></label>
                        <input name="company_name" type="text" required placeholder="Your Organization" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                    </div>

                    {/* Row 3: Service & Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Service Required <span className="text-pink-500">*</span></label>
                        <select defaultValue="" name="service_required" required className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none cursor-pointer">
                          <option value="" disabled>Select service...</option>
                          <option value="web-app">Web & App Development</option>
                          <option value="custom-software">Custom Software Solutions</option>
                          <option value="enterprise">Enterprise Modernization</option>
                          <option value="api">API & Microservices</option>
                          <option value="other">Other Requirements</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Expected Timeline</label>
                        <select defaultValue="" name="timeline" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none cursor-pointer">
                          <option value="" disabled>Select timeline...</option>
                          <option value="immediate">Immediate Start</option>
                          <option value="1-3-months">1 to 3 Months</option>
                          <option value="3-6-months">3 to 6 Months</option>
                          <option value="exploring">Just Exploring Options</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Details */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Project Requirements <span className="text-pink-500">*</span></label>
                      <textarea name="details"
                        required
                        rows={4}
                        placeholder="Please describe your current challenges, desired outcomes, and key technical requirements..."
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
                          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
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

export default SoftwareDevelopment;