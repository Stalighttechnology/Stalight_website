import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, animate, useInView, AnimatePresence } from "framer-motion";
import {
  Mic, Code, ClipboardList, BarChart3, CheckCircle2, ArrowRight, Star,
  Briefcase, Award, ShieldCheck, Users, Target, Activity, Quote,
  Bell, ScanFace, LayoutDashboard, Calendar, User, TrendingUp, Cpu, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import NeuroSync images
import neurosync1Img from "@/assets/products/neurosync1.png";
import neurosync11Img from "@/assets/products/neurosync11.png";
import neurosync22Img from "@/assets/products/neurosync22.png";
import neurosync33Img from "@/assets/products/neurosync33.png";
import leadboardneurosyncImg from "@/assets/screenshots/leadboardneurosync.png";
import neurosynchandsetImg from "@/assets/products/neurosynchandset.png";

// --- Custom Animated Number Component ---
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

// --- Content for NeuroSync ---
const features = [
  { icon: Mic, title: "NEURA Interview AI", desc: "Realistic, voice-driven mock interviews powered by advanced LLMs. Get instant feedback on tone, sentiment, and technical accuracy.", imgSrc: neurosync1Img },
  { icon: Code, title: "Multi-Language IDE", desc: "Enterprise-grade cloud editor for Python, Java, and C++. Real-time execution with automated test-suite validation and complexity scoring.", imgSrc: neurosync22Img },
  { icon: Briefcase, title: "Placement Officer Hub", desc: "Dedicated command center to track cohort readiness, manage recruiter drives, and export stakeholder-ready placement reports.", imgSrc: neurosync33Img },
  { icon: ClipboardList, title: "Smart Assessments", desc: "Deploy high-stakes exams with AI-proctoring, custom question banks, and automated grading mapped to corporate standards.", imgSrc: neurosync11Img },
  { icon: Award, title: "Skill Certification", desc: "Generate verifiable micro-credentials as students master specific tech stacks, instantly shareable to professional networks.", imgSrc: leadboardneurosyncImg },
  { icon: Users, title: "Batch Admin Controls", desc: "Granular access management to segment students by year, branch, or performance tier for targeted training interventions.", imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },
];

const reviews = [
  { name: "Rahul Sharma", role: "Final Year CSE", institution: "JIT Bangalore", text: "NeuroSync's AI mock interviews were incredibly realistic. The voice recognition and feedback helped me improve my communication skills tremendously. Got placed at Google!", rating: 5 },
  { name: "Sheetal", role: "Pre-final Year ISE", institution: "EWIT", text: "The coding lab interface is exactly like LeetCode but with better explanations. The system design whiteboard feature helped me crack my Amazon interview.", rating: 5 },
  { name: "Poornachandra", role: "Final Year Data Science", institution: "BKIT", text: "The Placement Readiness Index gave me confidence to apply for FAANG roles. The communication scoring helped me understand my weak areas and improve them.", rating: 4 },
  { name: "Sinchana M", role: "Final Year CSE-AIML", institution: "AMC Institution", text: "Mock assessment drills prepared me perfectly for TCS recruitment. The timed rounds and difficulty levels matched exactly what I faced in the actual placement.", rating: 5 },
  { name: "Dr. Ramakrishna", role: "Placement Director", institution: "AMC Engineering", text: "NeuroSync completely automated our screening process. The analytics dashboard gives me a bird's eye view of the entire batch's readiness before campus drives begin.", rating: 5 },
  { name: "Krishna H", role: "3rd Year CSE", institution: "AMC Institution", text: "The personalized learning paths adapted to my speed. I went from struggling with dynamic programming to clearing advanced rounds in just two months.", rating: 5 },
];

const dashboardScreenshots = [neurosync11Img, neurosync22Img, neurosync33Img, leadboardneurosyncImg];

const scrollingFeatures = [
  { title: "Live Coding IDE", icon: Code },
  { title: "Mock Interviews", icon: Mic },
  { title: "Student Profiles", icon: Users },
  { title: "Skill Tracking", icon: Target }, 
  { title: "Assessments", icon: ClipboardList },
  { title: "Placement Drives", icon: Briefcase }, 
  { title: "Rank Prediction", icon: BarChart3 },
  { title: "Proctoring AI", icon: ShieldCheck },
  { title: "Certifications", icon: Award }, 
  { title: "Performance Metrics", icon: Activity },
  { title: "Batch Controls", icon: Users },
];

// Data for Interactive Placement Hub
// --- Premium Animation Variants ---
const customEase = [0.19, 1.0, 0.22, 1.0];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: customEase } },
};

const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: customEase } },
};

const textRevealVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: customEase } },
};

const MaskedText = ({ children, className }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1 md:py-2">
    <motion.div variants={textRevealVariants} className={className}>{children}</motion.div>
  </div>
);

const NeuroSync = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // State for the Interactive Placement Overview Section
  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden relative">
      
      {/* --- AMBIENT BACKGROUND GLOWS & BRAND THEMED WAVES --- */}
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

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-48 md:pb-24 z-10 flex flex-col justify-center items-center min-h-[85vh]">
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.12) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 z-10 w-full text-center">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-6xl mx-auto flex flex-col items-center">
            
            {/* Title */}
            <h1 className="text-[3.25rem] sm:text-6xl md:text-[7rem] lg:text-[8.5rem] font-light text-slate-950 tracking-tighter leading-[0.95] mb-4 sm:mb-6 px-2">
              <MaskedText>
                Neuro <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Sync</span>
              </MaskedText>
            </h1>
            
            <motion.p variants={fadeUpVariants} className="text-slate-600 font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4">
              Empower your candidates with AI-driven interview simulations and real-time coding assessments. One platform. Total placement readiness.
            </motion.p>
            
            <motion.div variants={fadeUpVariants} className="relative z-20 mb-12 sm:mb-20">
              <a href="#contact" className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase">
                  Schedule Demo <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>

            {/* Scrolling Features Marquee */}
            <motion.div variants={fadeUpVariants} className="w-full max-w-full relative overflow-hidden py-4 sm:py-6 border-y border-slate-200/50 bg-white/40 backdrop-blur-xl shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
              
              <motion.div className="flex gap-3 sm:gap-6 px-4 w-max" animate={{ x: ["0%", "-50%"] }} transition={{ ease: "linear", duration: 40, repeat: Infinity }}>
                {[...scrollingFeatures, ...scrollingFeatures, ...scrollingFeatures].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-full shrink-0 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-default">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50">
                      <feat.icon size={14} className="text-purple-600 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[11px] sm:text-[13px] font-bold text-slate-700 tracking-wide pr-1 sm:pr-2 whitespace-nowrap">{feat.title}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* --- AESTHETIC FEATURES GRID --- */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[20%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              <span className="font-black">Built for</span> Modern Placement Cells
            </h2>
          </div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {features.map((f, i) => (
              <motion.div 
                key={f.title} 
                variants={fadeUpVariants} 
                className="group bg-white border border-slate-200/60 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(103,58,183,0.15)] hover:border-purple-200 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
              >
                <div className="h-40 sm:h-48 md:h-56 overflow-hidden relative border-b border-slate-100">
                  <img src={f.imgSrc} alt={f.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy" />
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500">
                    <f.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 group-hover:text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="p-5 sm:p-6 pt-6 sm:pt-8 flex-grow flex flex-col">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{f.title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-grow">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CUTE MINIMALIST REVIEWS MARQUEE --- */}
      <section className="py-20 sm:py-24 md:py-32 bg-white overflow-hidden z-10 relative">
        <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-12 md:mb-16">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="text-center max-w-3xl mx-auto relative z-10">
            <MaskedText className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4">Testimonials</MaskedText>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight">What Students Say</h2>
          </motion.div>
        </div>

        <div className="relative w-full flex flex-col overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          <motion.div 
            className="flex gap-4 sm:gap-5 md:gap-6 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...reviews, ...reviews, ...reviews].map((review, idx) => (
              <div key={`review-${idx}`} className="relative w-[280px] sm:w-[320px] md:w-[350px] shrink-0 bg-slate-50/50 p-6 md:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_15px_40px_-15px_rgba(168,85,247,0.15)] hover:border-purple-100 transition-all duration-500 cursor-default">
                
                <Quote className="absolute top-5 right-5 sm:top-6 sm:right-6 w-6 h-6 sm:w-8 sm:h-8 text-purple-100 rotate-180 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 font-light text-[13px] sm:text-[14px] italic leading-relaxed mb-5 sm:mb-6 line-clamp-4">"{review.text}"</p>
                </div>
                
                <div className="pt-4 sm:pt-5 border-t border-slate-200/60 relative z-10 flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-pink-50 to-blue-50 flex items-center justify-center border border-purple-100 shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-[12px] sm:text-[13px] tracking-tight leading-tight">{review.name}</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">{review.role}</p>
                    <p className="text-[8px] sm:text-[9px] text-purple-600 tracking-widest uppercase mt-1 font-bold line-clamp-1">{review.institution}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section id="contact" className="py-20 sm:py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-pink-100 rounded-full blur-[60px] sm:blur-[80px] opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 rounded-full blur-[60px] sm:blur-[80px] opacity-60 pointer-events-none"></div>
        
        <div className="container mx-auto px-4">
          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 40 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-24 text-center relative shadow-xl z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight">Ready to <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Sync Your Placements?</span></h2>
            <p className="text-slate-500 font-light text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto px-2">Get in touch with our team to schedule a personalised architectural walkthrough of Neuro Sync.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a href="mailto:info@stalight.tech" className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-full font-bold uppercase text-[11px] sm:text-xs tracking-widest shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 w-full sm:w-auto">
                Contact Us <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/" className="flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-white border border-slate-300 text-slate-700 rounded-xl sm:rounded-full font-bold uppercase text-[11px] sm:text-xs tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 w-full sm:w-auto">
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

export default NeuroSync;