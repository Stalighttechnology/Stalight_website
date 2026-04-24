import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, animate, useInView, Variants } from "framer-motion";
import { 
  Brain, BarChart3, ShieldCheck, Users, User,
  CheckCircle2, Star, Calendar, FileText, 
  ClipboardCheck, BookOpen, GraduationCap, MapPin, Quote,
  Bell, ScanFace, LayoutDashboard, Home, Printer, ArrowRight, Zap, Activity
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
import { OptimizedImage } from "@/components/OptimizedImage";


// --- Image Imports ---
import campusImg from "@/assets/screenshots/mobileloginpage1.png";
import loginpageImg from "@/assets/screenshots/loginpageimage.png";
import leavereqImg from "@/assets/screenshots/leavereqimage.png";
import timetableImg from "@/assets/screenshots/timetable dash.png";
import neurocampus11Img from "@/assets/products/neurocampus11.png";
import nebulaaiImg from "@/assets/products/nebulaai.png";
import facerecognImg from "@/assets/products/facerecogn.jpg";
import resultsImg from "@/assets/screenshots/results.png";

// --- Custom Animated Number Component ---
// This creates the "clock running / counting up" effect
const AnimatedNumber = ({ value, duration = 2.5 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: duration, ease: "easeOut" });
    }
  }, [isInView, value, duration, motionValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- Content ---
const features = [
  { icon: Brain, title: "NebulaSuggests AI", desc: "A recommendation engine that analyses individual learning patterns and suggests tailored DSA problems, study resources, and revision schedules.", imgSrc: nebulaaiImg },
  { icon: ScanFace, title: "Facial Recognition Attendance", desc: "Automated tracking powered by high-precision AI facial recognition to eliminate proxies and save valuable classroom time.", imgSrc: facerecognImg },
  { icon: LayoutDashboard, title: "Role-Based Dashboards", desc: "Personalized interfaces tailored for students, faculty, and administrators, ensuring relevant data is always front and center.", imgSrc: neurocampus11Img },
  { icon: Printer, title: "Smart Print & Xerox", desc: "Digitally upload documents to the campus Xerox center, receive a token, and quickly collect printouts during breaks.", imgSrc: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80" },
  { icon: Calendar, title: "Timetable & Scheduling", desc: "Intelligent timetable management with automated scheduling, conflict detection, and real-time updates.", imgSrc: timetableImg },
  { icon: FileText, title: "Assignment Workflow", desc: "Streamlined system for assignment creation, submission tracking, evaluation, and deadline enforcement.", imgSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80" },
  { icon: ClipboardCheck, title: "Leave & Approvals", desc: "Structured leave request system with multi-level approvals, real-time tracking, and automated notifications.", imgSrc: leavereqImg },
  { icon: BookOpen, title: "Study Material Hub", desc: "Organized digital library for faculty-uploaded resources, enabling students to access study materials anytime.", imgSrc: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80" },
];

const reviews = [
  { name: "Dr. Rajesh Kumar", role: "HOD, Computer Science", institution: "BIT", text: "Neuro Campus transformed how we manage student data. The AI-driven analytics gave us insights we never had before.", rating: 5 },
  { name: "Priya Sharma", role: "Final Year Student", institution: "REVA", text: "The dashboard is intuitive and I can track my progress in one place. Highly recommended for students.", rating: 5 },
  { name: "Prof. Anand Rao", role: "Dean of Academics", institution: "Presidency", text: "We deployed across three departments within a month. Administrative paperwork has dropped significantly.", rating: 4 },
  { name: "Dr. Meena Krishnan", role: "Principal", institution: "Oxford", text: "The face recognition attendance system alone saved us hours of manual work every week.", rating: 5 },
];

const dashboardScreenshots = [leavereqImg, timetableImg, loginpageImg, neurocampus11Img];

const featurePills = [
  { title: "Exam Announcements", icon: Bell },
  { title: "Live Attendance", icon: ScanFace },
  { title: "Timetable Sync", icon: Calendar }, 
  { title: "Leave Approvals", icon: ClipboardCheck },
  { title: "Role Filters", icon: ShieldCheck },
  { title: "IA Marks", icon: BarChart3 },
];

// --- Animations ---
const customEase = [0.16, 1.0, 0.3, 1.0] as any;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } },
};

const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: customEase } },
};

const NeuroCampus = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  const yFloat = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden relative">
      <SEO 
        title="Neuro Campus | Stalight Technologies"
        description="A next-generation academic management platform unifying AI-driven analytics, blockchain security, and automated operations."
        jsonLd={[
          generateWebPageSchema(
            "Neuro Campus",
            "A next-generation academic management platform unifying AI-driven analytics, blockchain security, and automated operations.",
            "/neuro-campus"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Neuro Campus", item: "/neuro-campus" }
          ])
        ]}
      />
      <Navbar />

      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.3] sm:opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px sm:32px 32px' }}></div>
        <div className="absolute top-[-5%] sm:top-[-10%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[400px] sm:h-[600px] bg-gradient-to-br from-pink-500/8 via-purple-500/8 to-blue-500/8 rounded-full blur-[60px] sm:blur-[100px]"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 z-10 flex flex-col items-center">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto">

            <motion.h1 variants={fadeUpVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-950 tracking-tighter leading-[0.85] mb-4 sm:mb-6">
              Neuro <br className="sm:hidden"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-x">
                Campus.
              </span>
            </motion.h1>

            <motion.p variants={fadeUpVariants} className="text-slate-600 font-light text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2">
              A next-generation academic management platform unifying AI-driven analytics, blockchain security, and automated operations.
            </motion.p>

            {/* Infinite Feature Marquee */}
            <motion.div variants={fadeUpVariants} className="w-full max-w-full sm:max-w-4xl mx-auto relative overflow-hidden py-3 sm:py-4">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10"></div>

              <motion.div className="flex gap-2 sm:gap-3 px-2 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>
                {[...featurePills, ...featurePills].map((pill, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm rounded-full shrink-0 hover:border-purple-200 hover:shadow-md transition-all duration-300">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
                      <pill.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide whitespace-nowrap">{pill.title}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- DASHBOARD SHOWCASE (ARCHITECTURAL UPGRADE) --- */}
      <section id="features" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#FAFAFC] overflow-hidden relative z-10">

        {/* Tech Mahindra Style Architectural Background Grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] sm:opacity-[0.6]"
          style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px)', backgroundSize: '60px 100%' }}
        ></div>

        {/* Diagonal Tech Mahindra Style Cut overlay */}
        <div
          className="absolute top-0 right-0 w-[85%] md:w-[70%] lg:w-[65%] h-full bg-white z-0 pointer-events-none shadow-[inset_20px_0_60px_rgba(0,0,0,0.02)]"
          style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)' }}
        ></div>

        {/* Subtle Brand Accents */}
        <div className="absolute top-[15%] sm:top-[20%] left-[-5%] sm:left-[-10%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px] z-0 pointer-events-none"></div>
        <div className="absolute bottom-[-5%] sm:bottom-[-10%] right-[-5%] sm:right-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px] z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 mb-12 sm:mb-16 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          <div className="max-w-3xl text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-3 sm:mb-4 tracking-tight">
              One Dashboard. <br />
              <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Infinite Insights.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Take a tour of our insights section to see how our unified view turns raw academic metrics into actionable intelligence in real-time.
            </p>
          </div>
          <div className="hidden md:flex">
             <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        <div className="relative w-full overflow-hidden pb-8 sm:pb-12 pt-2 sm:pt-4">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-40 bg-gradient-to-r from-[#FAFAFC] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 md:w-24 lg:w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          <motion.div
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-max px-4 relative z-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...dashboardScreenshots, ...dashboardScreenshots].map((img, idx) => (
              <div key={idx} className="relative w-[250px] sm:w-[350px] md:w-[450px] lg:w-[550px] xl:w-[650px] aspect-video bg-white rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-slate-200/80 p-1.5 sm:p-2 lg:p-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] shrink-0 group cursor-pointer hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500">

                {/* Mac-like Window Header */}
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-lg sm:rounded-t-xl lg:rounded-t-[1.5rem]">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-200 group-hover:bg-red-400 transition-colors"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-200 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-slate-200 group-hover:bg-emerald-400 transition-colors"></div>
                </div>

                <div className="w-full h-[calc(100%-2rem)] sm:h-[calc(100%-2.5rem)] lg:h-[calc(100%-3rem)] rounded-b-lg sm:rounded-b-xl lg:rounded-b-[1.5rem] overflow-hidden">
                   <OptimizedImage src={img} alt={`Neuro Campus Dashboard Screenshot ${idx + 1}`} className="w-full h-full object-cover object-top shadow-sm" />
                </div>

                <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-[2rem] ring-1 ring-inset ring-black/5 group-hover:ring-purple-500/30 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- AESTHETIC FEATURE CARDS --- */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight">
               <span className="font-black">Built for</span> Modern Institutions
             </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group bg-white border border-slate-200/60 rounded-xl sm:rounded-2xl lg:rounded-[2rem] overflow-hidden hover:shadow-[0_15px_35px_-10px_rgba(103,58,183,0.15)] hover:border-purple-200 transition-all duration-500 flex flex-col h-full">
                <div className="h-40 sm:h-48 lg:h-56 overflow-hidden relative border-b border-slate-100">
                   <OptimizedImage src={f.imgSrc} alt={`${f.title} - Neuro Campus Feature`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-5 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500">
                    <f.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 group-hover:text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="p-4 sm:p-5 lg:p-6 pt-6 sm:pt-7 lg:pt-8 flex-grow flex flex-col">
                  <h3 className="font-bold text-base sm:text-lg lg:text-xl text-slate-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors">{f.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-light leading-relaxed flex-grow">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-pink-100 rounded-full blur-[60px] sm:blur-[80px] opacity-50 sm:opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-100 rounded-full blur-[60px] sm:blur-[80px] opacity-50 sm:opacity-60 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 text-center relative shadow-lg sm:shadow-xl z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight">
              Ready to <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Modernise Your Campus?</span>
            </h2>
            <p className="text-slate-600 font-light text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              Get in touch with our team to schedule a personalised architectural walkthrough of Neuro Campus.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href="mailto:info@stalight.tech" className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full font-bold uppercase text-xs sm:text-sm tracking-widest shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 w-full sm:w-auto">
                Contact Us <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/" className="flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white border border-slate-300 text-slate-700 rounded-full font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 w-full sm:w-auto">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NeuroCampus;