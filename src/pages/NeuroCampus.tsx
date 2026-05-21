import React, { useRef, useEffect, useState } from "react";
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
import campusImg from "@/assets/screenshots/mobileloginpage1.jpg";
import loginpageImg from "@/assets/screenshots/loginpageimage.jpg";
import leavereqImg from "@/assets/screenshots/leavereqimage.jpg";
import timetableImg from "@/assets/screenshots/timetable dash.jpg";
import neurocampus11Img from "@/assets/products/neurocampus11.jpg";
import nebulaaiImg from "@/assets/products/nebulaai.jpg";
import facerecognImg from "@/assets/products/facerecogn.jpg";
import resultsImg from "@/assets/screenshots/results.jpg";

// --- Custom Animated Number Component ---
const AnimatedNumber = ({ value, duration = 2.5 }: { value: number; duration?: number }) => {
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
// Condensed, image-free feature list for sticky-scroll UI
const tourFeatures = [
  {
    title: "Nebula AI Insights",
    icon: Brain,
    desc: "AI-driven cognitive recommendations and student growth profiling.",
    img: nebulaaiImg,
    caption: "Stalight Nebula AI Student Growth & Insights Panel"
  },
  {
    title: "Smart Timetables",
    icon: Calendar,
    desc: "Automated schedule planners with conflict checking and active sync.",
    img: timetableImg,
    caption: "Interactive Conflict-Free Academic Timetable & Scheduling"
  },
  {
    title: "Facial Attendance",
    icon: ScanFace,
    desc: "Biometric face scans for seamless and proxy-free verification.",
    img: facerecognImg,
    caption: "High-Precision Biometric Face Scan Attendance Verification"
  },
  {
    title: "Leave Workflows",
    icon: ClipboardCheck,
    desc: "Hierarchical request paths with immediate notifications.",
    img: leavereqImg,
    caption: "Multi-Level Institutional Leave Request & Approvals Dashboard"
  },
  {
    title: "Academic Results",
    icon: BarChart3,
    desc: "Full gradebook analytics and outcome tracking visualisations.",
    img: resultsImg,
    caption: "Detailed Gradebook Performance Analysis & CO/PO Analytics"
  },
  {
    title: "Student Profiling",
    icon: User,
    desc: "Instantly surface complete information on quick biometric scans.",
    img: campusImg,
    caption: "Instantly Surface Complete Student Profiles on Quick Biometric Scans"
  },
  {
    title: "Institutional Analytics",
    icon: LayoutDashboard,
    desc: "High-level administrative reporting for executive decision making.",
    img: neurocampus11Img,
    caption: "Stalight Campus Master Command Center Admin Dashboard"
  },
  {
    title: "Secure Portal Gateway",
    icon: ShieldCheck,
    desc: "Enterprise-grade authentication with role filtering.",
    img: loginpageImg,
    caption: "Role-Based Secure Portal Login Gateway"
  }
];

const institutionalPillars = [
  {
    title: "Intelligent Core & Automation",
    subtitle: "AI-driven biometric and off-campus verification systems.",
    gradient: "from-pink-500/10 via-purple-500/5 to-transparent",
    borderHover: "group-hover:border-pink-300",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
    icon: Zap,
    features: [
      { key: "stalight-ai", icon: Brain, title: "Stalight AI", desc: "AI-driven insights and personalised recommendations for students and faculty." },
      { key: "facial-recognition-attendance", icon: ScanFace, title: "Facial Recognition Attendance", desc: "High-precision facial recognition to automate attendance and prevent proxy marking." },
      { key: "student-info-face-scan", icon: User, title: "Student Info on Face Scan", desc: "Instantly surface student profile and academic info on face-based scan." },
      { key: "location-based-attendance", icon: MapPin, title: "Location Based Attendance", desc: "Geo-fenced attendance options for off-campus activities and fieldwork." }
    ]
  },
  {
    title: "Academic Lifecycle",
    subtitle: "End-to-end administration of academic schedules and content.",
    gradient: "from-purple-500/10 via-blue-500/5 to-transparent",
    borderHover: "group-hover:border-purple-300",
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    icon: GraduationCap,
    features: [
      { key: "timetable-scheduling", icon: Calendar, title: "Timetable & Scheduling", desc: "Automated timetable management with conflict detection and real-time updates." },
      { key: "exam-scheduling", icon: Bell, title: "Exam Scheduling", desc: "Schedule exams, publish timetables and send notifications to stakeholders." },
      { key: "assignment-workflow", icon: FileText, title: "Assignment Workflow", desc: "Creation, submission tracking, grading and deadline enforcement for assignments." },
      { key: "study-material-hub", icon: BookOpen, title: "Study Material Hub", desc: "Centralised digital library for faculty-uploaded resources and student access." }
    ]
  },
  {
    title: "Workflows & Operations",
    subtitle: "Smooth routing of internal requests and security permissions.",
    gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    borderHover: "group-hover:border-blue-300",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    icon: ShieldCheck,
    features: [
      { key: "leave-approvals", icon: ClipboardCheck, title: "Leave & Approvals", desc: "Structured leave requests with multi-level approvals, tracking, and notifications." },
      { key: "role-based-dashboards", icon: LayoutDashboard, title: "Role-Based Dashboards", desc: "Personalised interfaces for students, faculty, and administrators with relevant data at-a-glance." },
      { key: "question-paper-workflow", icon: Printer, title: "Question Paper Workflow System", desc: "Secure question paper creation, review and distribution workflow." }
    ]
  },
  {
    title: "Institutional Management",
    subtitle: "Strategic analytics, assets, and financial flows.",
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    borderHover: "group-hover:border-amber-300",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    icon: Activity,
    features: [
      { key: "copo-attainment", icon: BarChart3, title: "CO/PO Attainment", desc: "Monitor and report course and program outcomes with analytics and visualisations." },
      { key: "hostel-management", icon: Home, title: "Hostel Management", desc: "Manage hostel allocations, requests, and student housing workflows." },
      { key: "fees-collections", icon: Activity, title: "Fees Collections", desc: "Track fee payments, receipts, and automated reminders for outstanding dues." }
    ]
  }
];

const featurePills = [
  { title: "Exam Announcements", icon: Bell },
  { title: "Live Attendance", icon: ScanFace },
  { title: "Timetable Sync", icon: Calendar },
  { title: "Leave Approvals", icon: ClipboardCheck },
  { title: "Role Filters", icon: ShieldCheck },
  { title: "IA Marks", icon: BarChart3 },
];

// --- Animations ---
const customEase = [0.16, 1.0, 0.3, 1.0];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: customEase } },
};

const textRevealVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.0, ease: customEase } },
};

const MaskedText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1 md:py-2">
    <motion.div variants={textRevealVariants} className={className}>{children}</motion.div>
  </div>
);

const NeuroCampus = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden relative">
      <SEO
        title="Stalight Campus | Stalight Technologies"
        description="A next-generation academic management platform unifying AI-driven analytics, blockchain security, and automated operations."
        jsonLd={[
          generateWebPageSchema(
            "Stalight Campus",
            "A next-generation academic management platform unifying AI-driven analytics, blockchain security, and automated operations.",
            "/neuro-campus"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Stalight Campus", item: "/neuro-campus" }
          ])
        ]}
      />
      <Navbar />

      {/* --- AMBIENT BACKGROUND GLOWS & BRAND THEMED WAVES (from Stalight Sync) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, 24] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-[-100%] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] opacity-70"
        ></motion.div>

        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[300px] sm:h-[400px] w-[90%] sm:w-[600px] rounded-full bg-purple-500 opacity-[0.08] blur-[100px] sm:blur-[120px]"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[150%] sm:w-[120%] max-w-6xl h-[400px] sm:h-[600px] bg-gradient-to-b from-pink-50/50 via-white/20 to-transparent rounded-b-[100%] blur-2xl sm:blur-3xl opacity-80"></div>

        {/* Brand Colored SVG Waves */}
        <svg className="absolute w-full h-full opacity-[0.25]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path d="M0,30 Q25,10 50,30 T100,30" stroke="url(#waveGrad)" strokeWidth="0.15" fill="none" animate={{ d: ["M0,30 Q25,10 50,30 T100,30", "M0,30 Q25,50 50,30 T100,30", "M0,30 Q25,10 50,30 T100,30"] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
          <motion.path d="M0,50 Q25,30 50,50 T100,50" stroke="url(#waveGrad)" strokeWidth="0.2" fill="none" animate={{ d: ["M0,50 Q25,30 50,50 T100,50", "M0,50 Q25,70 50,50 T100,50", "M0,50 Q25,30 50,50 T100,50"] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        </svg>
      </div>

      {/* --- HERO SECTION (Stalight Sync style) --- */}
      <section className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-52 pb-8 sm:pb-12 md:pb-16 z-10 w-full flex flex-col items-center min-h-[85vh]">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full text-center mb-8 sm:mb-12">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto flex flex-col items-center">
            <h1 className="text-[3.25rem] sm:text-6xl md:text-[7rem] lg:text-[8.5rem] font-light text-slate-950 tracking-tighter leading-[0.95] mb-4 sm:mb-6 px-2 whitespace-nowrap">
                <MaskedText>
                  <span className="font-light">Stalight</span>{' '}
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Campus.</span>
                </MaskedText>
            </h1>

            <motion.p variants={fadeUpVariants} className="text-slate-600 font-light text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-6 px-2">
              A next-generation academic management platform unifying AI-driven analytics, blockchain security, and automated operations.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="relative z-20 mb-8 sm:mb-12">
              <a
                href="https://wa.me/918660144040?text=Hello%20Stalight%20Team%2C%20I%20would%20like%20to%20schedule%20a%20personalized%20live%20demo%20of%20the%20Stalight%20Campus%20platform.%20Please%20let%20me%20know%20the%20available%20time%20slots.%20Thank%20you%21"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase">
                  Schedule Demo <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* FULL WIDTH Infinite Feature Marquee (Moved outside the container constraint) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full relative overflow-hidden py-4"
        >
          {/* Edge gradients seamlessly blending into the #FAFAFA background */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

          <motion.div
            className="flex gap-3 sm:gap-4 w-max px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          >
            {/* Duplicated 4 times to ensure no blank spaces on ultra-wide monitors */}
            {[...featurePills, ...featurePills, ...featurePills, ...featurePills].map((pill, idx) => (
              <div key={idx} className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-sm rounded-full shrink-0 hover:border-purple-200 hover:shadow-md transition-all duration-300">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center">
                  <pill.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-600" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-wide whitespace-nowrap">{pill.title}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </section>

      {/* --- DASHBOARD SHOWCASE (Infinite Premium Auto-Scrolling Carousel) --- */}
      <section id="features" className="py-20 sm:py-28 bg-[#FAFAFC] overflow-hidden relative z-10">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px)', backgroundSize: '60px 100%' }}></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-950 tracking-tight leading-[1.15] mb-5">
              One Dashboard. <br className="sm:hidden" />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                Infinite Insights.
              </span>
            </h2>
            <div className="w-12 h-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full mb-6"></div>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Take a tour of our insights section to see how our unified view turns raw academic metrics into actionable intelligence in real-time.
            </p>
          </div>
        </div>

        {/* Full-width scrolling wrapper with edge gradients */}
        <div className="w-full relative overflow-hidden py-10">
          {/* Edge gradients blending into background */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#FAFAFC] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#FAFAFC] to-transparent z-20 pointer-events-none"></div>

          {/* Marquee track */}
          <motion.div
            className="flex gap-8 w-max px-8"
            style={{ willChange: "transform" }}
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {/* Duplicate list 2 times to ensure infinite wrap-around on ultra-wide screens */}
            {[...tourFeatures, ...tourFeatures].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[400px] md:w-[480px] shrink-0 group relative bg-white/90 border border-slate-200/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl hover:border-purple-200 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle hover background glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Browser Header Bar */}
                  <div className="bg-slate-50/80 border-b border-slate-200/60 px-4 py-3 flex items-center justify-between relative z-10">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]"></span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-0.5 bg-slate-100/80 border border-slate-200/40 rounded-full text-[9px] sm:text-[10px] text-slate-500 font-mono tracking-tight select-none">
                      <Icon className="w-2.5 h-2.5 text-purple-600 shrink-0" />
                      <span>{feat.title.toLowerCase().replace(/\s+/g, '-')}.stalight.in</span>
                    </div>

                    <div className="w-8"></div> {/* Spacer to keep URL centered */}
                  </div>

                  {/* Screenshot Viewport */}
                  <div className="relative h-[180px] sm:h-[260px] md:h-[300px] bg-slate-950/5 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    <OptimizedImage
                      src={feat.img}
                      alt={feat.caption}
                      className="w-full h-full object-contain rounded-lg drop-shadow-md group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>

                  {/* Card Bottom Caption Info */}
                  <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 border-t border-slate-100 relative z-10 flex flex-col items-start gap-1">
                    <span className="inline-block text-[9px] text-pink-600 font-bold uppercase tracking-widest px-2 py-0.5 bg-pink-50 border border-pink-100 rounded-md mb-1">
                      {feat.title}
                    </span>
                    <h4 className="text-slate-900 text-xs sm:text-sm font-bold tracking-tight leading-snug truncate w-full">
                      {feat.caption}
                    </h4>
                    <p className="text-slate-500 text-[10px] sm:text-xs font-normal leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* --- FEATURE BLOCKS (Structured Pillars for Modern Institutions) --- */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600">Built for</span> Modern Institutions
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-4 max-w-2xl mx-auto font-light leading-relaxed">
              Core campus capabilities presented as organised, professional blocks — concise, readable, and structured for modern education.
            </p>
          </div>

          {/* Pillars Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {institutionalPillars.map((pillar, pillarIdx) => (
              <motion.div
                key={pillarIdx}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: pillarIdx * 0.08 }}
                className="group relative bg-white border border-slate-200/70 hover:border-slate-300 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Dynamic Subtle Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                {/* Pillar Header */}
                <div className="relative z-10 mb-6 flex flex-col items-start">
                  <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} ${pillar.iconColor} flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(pillar.icon, { className: "w-6 h-6" })}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-purple-900 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1.5 font-light leading-relaxed">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-100 mb-6 relative z-10 group-hover:bg-slate-200/80 transition-colors"></div>

                {/* Features List */}
                <div className="relative z-10 flex flex-col gap-5 flex-1">
                  {pillar.features.map((feat) => {
                    const FeatIcon = feat.icon;
                    return (
                      <div key={feat.key} className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-white transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-800 leading-tight">
                            {feat.title}
                          </h4>
                          <p className="text-slate-500 text-xs mt-1 font-light leading-relaxed">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Card Footer Indicator */}
                <div className="mt-8 pt-4 border-t border-slate-50 text-[10px] font-bold text-purple-500 uppercase tracking-widest relative z-10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Active Module
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
              Get in touch with our team to schedule a personalised architectural walkthrough of Stalight Campus.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href="https://campus.stalight.in/stalightcampus" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white rounded-full font-bold uppercase text-xs sm:text-sm tracking-widest shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 w-full sm:w-auto">
                Get Access <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
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