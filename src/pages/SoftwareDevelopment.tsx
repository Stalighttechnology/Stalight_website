import React, { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import devImg from "@/assets/products/it services.jpg";
import { Code2, MonitorSmartphone, Cpu, Layers, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
// OptimizedImage intentionally removed from this page; using devImg as a background instead
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      <SEO
        title="Custom Software Development | Stalight Technologies"
        description="From intuitive websites to complex enterprise software, we engineer bespoke digital solutions. We turn your specific requirements into scalable, secure applications."
        jsonLd={[
          generateWebPageSchema(
            "Software Development",
            "Bespoke software engineering designed to solve complex challenges and scale alongside your growth.",
            "/software-development"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Software Development", item: "/software-development" }
          ])
        ]}
      />
      <Navbar />


      {/* --- Hero Section (NeuroCampus-style) --- */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-52 pb-8 sm:pb-12 md:pb-16 z-10 w-full flex flex-col items-center min-h-[70vh]">
        {/* Subtle background image (lightly visible) */}
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
                href="mailto:info@stalight.in"
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

        {/* visual card removed — hero now uses the image as a subtle background */}
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

                  {/* Learn More dialog trigger */}
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
                            {/* Title split: head + tail for gradient emphasis */}
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
                            {service.details?.map((d: string, i: number) => (
                              <li key={i} className="leading-relaxed">{d}</li>
                            ))}
                          </ul>
                        </div>

                        <DialogFooter className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                          <a
                            href={`mailto:info@stalight.in?subject=Request%20estimate%20for%20${encodeURIComponent(service.title)}`}
                            className="group relative inline-flex items-center justify-center px-4 py-2 bg-slate-950 text-white rounded-md overflow-hidden shadow-[0_10px_30px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-0.5 transition-all duration-200"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 text-sm font-semibold">Request Estimate</span>
                          </a>

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

      {/* --- CTA Section (Light Theme) --- */}
      <section className="py-24 bg-white text-slate-900">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-8"
          >
            Ready to build something custom?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg mb-10"
          >
            Share your project details and we'll craft an Custom plan, timeline, and estimate to get you started.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            href="mailto:info@stalight.in"
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.12)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-3 text-sm font-bold tracking-[0.08em] uppercase">
              Get a Project Estimate <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SoftwareDevelopment;