import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Mic, Code, ClipboardList, BarChart3, CheckCircle2, ArrowRight, Star,
  Briefcase, Award, ShieldCheck, Users, Target, Activity, Quote,
  Bell, ScanFace, LayoutDashboard, Calendar, User, Send, Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useLaunchCountdown, TARGET_LAUNCH_DISPLAY } from "@/hooks/useLaunchCountdown";

// Import NeuroSync images
import neurosync1Img from "@/assets/products/neurosync1.jpg";
import neurosync11Img from "@/assets/products/neurosync11.jpg";
import neurosync22Img from "@/assets/products/neurosync22.jpg";
import neurosync33Img from "@/assets/products/neurosync33.jpg";
import leadboardneurosyncImg from "@/assets/screenshots/leadboardneurosync.jpg";

// --- Custom pure React Animated Number Component ---
const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const startTime = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOutQuad = progress * (2 - progress);
          setCount(Math.floor(easeOutQuad * value));
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}</span>;
};

// --- Content for NeuroSync ---
const features = [
  { icon: Mic, title: "NEURA Smart Interview", desc: "Realistic, voice-driven mock interviews powered by advanced LLMs. Get instant feedback on tone, sentiment, and technical accuracy.", imgSrc: neurosync1Img },
  { icon: Code, title: "Multi-Language IDE", desc: "Enterprise-grade cloud editor for Python, Java, and C++. Real-time execution with automated test-suite validation and complexity scoring.", imgSrc: neurosync22Img },
  { icon: Briefcase, title: "Placement Officer Hub", desc: "Dedicated command center to track cohort readiness, manage recruiter drives, and export stakeholder-ready placement reports.", imgSrc: neurosync33Img },
  { icon: ClipboardList, title: "Smart Assessments", desc: "Deploy high-stakes exams with smart proctoring, custom question banks, and automated grading mapped to corporate standards.", imgSrc: neurosync11Img },
  { icon: Award, title: "Skill Certification", desc: "Generate verifiable micro-credentials as students master specific tech stacks, instantly shareable to professional networks.", imgSrc: leadboardneurosyncImg },
  { icon: Users, title: "Batch Admin Controls", desc: "Granular access management to segment students by year, branch, or performance tier for targeted training interventions.", imgSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" },
];

const reviews = [
  { name: "Vijayashree", role: "Final Year CSE", institution: "JIT Bangalore", text: "NeuroSync's smart mock interviews were incredibly realistic. The voice recognition and feedback helped me improve my communication skills tremendously. Got placed at Google!", rating: 5 },
  { name: "Sheetal", role: "Pre-final Year ISE", institution: "JSS", text: "The coding lab interface is exactly like LeetCode but with better explanations. The system design whiteboard feature helped me crack my Amazon interview.", rating: 5 },
  { name: "Poornachandra", role: "Final Year Data Science", institution: "BKIT", text: "The Placement Readiness Index gave me confidence to apply for FAANG roles. The communication scoring helped me understand my weak areas and improve them.", rating: 4 },
  { name: "Sinchana M", role: "Final Year CSE-AIML", institution: "AMC Institution", text: "Mock assessment drills prepared me perfectly for TCS recruitment. The timed rounds and difficulty levels matched exactly what I faced in the actual placement.", rating: 5 },
  { name: "Dr. Ramakrishna", role: "Placement Director", institution: "AMC Engineering", text: "NeuroSync completely automated our screening process. The analytics dashboard gives me a bird's eye view of the entire batch's readiness before campus drives begin.", rating: 5 },
  { name: "Krishna H", role: "3rd Year CSE", institution: "AMC Institution", text: "The personalized learning paths adapted to my speed. I went from struggling with dynamic programming to clearing advanced rounds in just two months.", rating: 5 },
];

const scrollingFeatures = [
  { title: "Live Coding IDE", icon: Code },
  { title: "Mock Interviews", icon: Mic },
  { title: "Student Profiles", icon: Users },
  { title: "Skill Tracking", icon: Target }, 
  { title: "Assessments", icon: ClipboardList },
  { title: "Placement Drives", icon: Briefcase }, 
  { title: "Rank Prediction", icon: BarChart3 },
  { title: "Smart Proctoring", icon: ShieldCheck },
  { title: "Certifications", icon: Award }, 
  { title: "Performance Metrics", icon: Activity },
  { title: "Batch Controls", icon: Users },
];

const NeuroSync = () => {
  const { isLaunched, timeLeft, isReady } = useLaunchCountdown();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Contact area component (inline within CTA card)
  const ContactArea = () => {
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      const fd = new FormData(e.currentTarget as HTMLFormElement);
      
      const payload = {
        full_name: fd.get('full_name')?.toString() || null,
        official_email: fd.get('official_email')?.toString() || null,
        phone: fd.get('phone')?.toString() || null,
        institution: fd.get('institution')?.toString() || null,
        designation: fd.get('designation')?.toString() || null,
        number_of_students: fd.get('number_of_students')?.toString() || null,
        current_process: fd.get('current_process')?.toString() || null,
        preferred_date: fd.get('preferred_date')?.toString() || null,
        preferred_time: fd.get('preferred_time')?.toString() || null,
        message: fd.get('message')?.toString() || null,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase.from('neurosync_inquiries').insert([payload]);
      setIsSubmitting(false);

      if (error) {
        alert("Error: " + error.message);
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 4000);
    };

    if (submitted) {
      return (
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h4 className="text-lg font-bold">Thanks — We received your request</h4>
          <p className="text-sm text-slate-600">Our team will reach out to schedule the walkthrough.</p>
        </div>
      );
    }

    return (
      <div>
        {!open ? (
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button onClick={() => setOpen(true)} className="group flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-full font-bold uppercase text-[11px] sm:text-xs tracking-widest shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300 w-full sm:w-auto">
              Contact Us <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link to="/" className="flex items-center justify-center px-6 sm:px-8 py-4 sm:py-5 bg-white border border-slate-300 text-slate-700 rounded-xl sm:rounded-full font-bold uppercase text-[11px] sm:text-xs tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 w-full sm:w-auto">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[1.5rem] p-6 sm:p-8 border border-slate-100 shadow-sm mt-4 relative text-left">
            <div className="absolute left-0 right-0 top-0 h-1 rounded-t-[1rem] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600" />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">Required Fields</h4>
                  <p className="text-xs text-slate-500">Please fill to schedule a personalised demo</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Full Name</label>
                <input name="full_name" required placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Official Email</label>
                <input name="official_email" type="email" required placeholder="name@institution.edu" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Phone Number</label>
                <input name="phone" type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">College / Institution Name</label>
                <input name="institution" required placeholder="Institution name" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Designation</label>
                <select name="designation" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none">
                  <option value="">Select designation...</option>
                  <option value="tpo">TPO</option>
                  <option value="placement_coordinator">Placement Coordinator</option>
                  <option value="hod">HOD</option>
                  <option value="admin">Admin</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Number of Students</label>
                <input name="number_of_students" type="number" min={1} required placeholder="e.g. 120" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Current Placement Process</label>
                <textarea name="current_process" rows={3} required placeholder="Short description of your current placement workflow" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Preferred Demo Date</label>
                <input name="preferred_date" type="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Preferred Demo Time</label>
                <input name="preferred_time" type="time" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1 ml-1">Additional Notes (optional)</label>
                <textarea name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" placeholder="Any other details you'd like us to know" />
              </div>

              <div className="sm:col-span-2 flex items-center justify-end gap-3 mt-1">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-3 bg-white border border-slate-200 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white rounded-xl font-bold flex items-center gap-2">Request Demo <Send className="w-4 h-4" /></button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };
  
  if (!isReady) return null;

  if (!isLaunched) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <SEO title="Coming Soon | Stalight Sync" description="Stalight Sync is launching soon." />
        <Navbar />
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] [background-size:60px_60px]" />
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-[100px] transform-gpu" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-[100px] transform-gpu" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-20 transition-all duration-500">
          <div className="mb-6 flex items-center justify-center gap-3">
            <h1 className="text-2xl sm:text-3xl tracking-tight text-slate-800 flex flex-wrap justify-center gap-2 uppercase">
              <span className="font-light">STALIGHT</span> <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Sync</span>
            </h1>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
            The ultimate placement readiness platform is almost here. Get ready to sync your success.
          </p>

          <div className="relative inline-flex mb-8 group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 blur-lg opacity-40 group-hover:opacity-75 transition-opacity duration-700 transform-gpu"></div>
            <div className="relative bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 shadow-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{TARGET_LAUNCH_DISPLAY}</span>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-4xl sm:text-5xl font-black text-slate-800 tabular-nums leading-none tracking-tight">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Days</span>
                </div>
                <span className="text-3xl sm:text-4xl font-black text-slate-300 animate-pulse mb-6">:</span>
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-4xl sm:text-5xl font-black text-slate-800 tabular-nums leading-none tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Hours</span>
                </div>
                <span className="text-3xl sm:text-4xl font-black text-slate-300 animate-pulse mb-6">:</span>
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-4xl sm:text-5xl font-black text-slate-800 tabular-nums leading-none tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2">Mins</span>
                </div>
                <span className="text-3xl sm:text-4xl font-black text-slate-300 animate-pulse mb-6">:</span>
                <div className="flex flex-col items-center min-w-[60px]">
                  <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-500 to-purple-600 tabular-nums leading-none tracking-tight">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 mt-2">Secs</span>
                </div>
              </div>
            </div>
          </div>

          <div>
             <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-purple-600 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Home
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden relative">
      <SEO 
        title="Stalight Sync | Stalight Technologies"
        description="Empower your candidates with smart interview simulations and real-time coding assessments. One platform. Total placement readiness."
        jsonLd={[
          generateWebPageSchema(
            "Stalight Sync",
            "Empower your candidates with smart interview simulations and real-time coding assessments.",
            "/neurosync"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Stalight Sync", item: "/neurosync" }
          ])
        ]}
      />
      
      <Navbar />

      {/* --- AMBIENT BACKGROUND GLOWS & BRAND THEMED WAVES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-[-100%] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] opacity-70"
        ></div>
        
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[300px] sm:h-[400px] w-[90%] sm:w-[600px] rounded-full bg-purple-500 opacity-[0.08] blur-[100px] sm:blur-[120px] transform-gpu"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[150%] sm:w-[120%] max-w-6xl h-[400px] sm:h-[600px] bg-gradient-to-b from-pink-50/50 via-white/20 to-transparent rounded-b-[100%] blur-2xl sm:blur-3xl opacity-80 transform-gpu"></div>

        {/* Brand Colored SVG Waves */}
        <svg className="absolute w-full h-full opacity-[0.25]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0" /> 
              <stop offset="50%" stopColor="#a855f7" stopOpacity="1" /> 
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" /> 
            </linearGradient>
          </defs>
          <path d="M0,30 Q25,10 50,30 T100,30" stroke="url(#waveGrad)" strokeWidth="0.15" fill="none" />
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="url(#waveGrad)" strokeWidth="0.2" fill="none" />
        </svg>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 sm:pt-36 md:pt-44 lg:pt-52 xl:pt-56 pb-10 sm:pb-16 md:pb-20 z-10 flex flex-col justify-center items-center md:min-h-[85vh]">
        
        {/* Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.12) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 z-10 w-full text-center">
          <div className="max-w-6xl mx-auto flex flex-col items-center transition-all duration-700 ease-out">
            
            {/* Title */}
            <h1 className="text-[3.25rem] sm:text-6xl md:text-[7rem] lg:text-[8.5rem] font-light text-slate-950 tracking-tighter leading-[0.95] mb-4 sm:mb-6 px-2">
              <div className="overflow-hidden inline-block w-full leading-tight py-1 md:py-2">
                <div className="transition-all duration-700 ease-out">
                  <span className="font-light">Stalight</span>{' '}
                  <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Sync</span>
                </div>
              </div>
            </h1>
            
            <p className="text-slate-600 font-light text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4">
              Empower your candidates with smart interview simulations and real-time coding assessments. One platform. Total placement readiness.
            </p>
            
            <div className="relative z-20 mb-12 sm:mb-20">
              <a href="#contact" className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-slate-950 text-white rounded-xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase">
                  Schedule Demo <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </div>

            {/* Scrolling Features Marquee using hardware-accelerated CSS keyframe */}
            <div className="w-full max-w-full relative overflow-hidden py-4 sm:py-6 border-y border-slate-200/50 bg-white/40 backdrop-blur-xl shadow-sm">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex gap-3 sm:gap-6 px-4 w-max animate-marquee hover:[animation-play-state:paused]">
                {[...scrollingFeatures, ...scrollingFeatures, ...scrollingFeatures].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 bg-white border border-slate-200/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-full shrink-0 hover:border-purple-300 hover:shadow-md transition-all duration-300 cursor-default">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100/50">
                      <feat.icon size={14} className="text-purple-600 w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[11px] sm:text-[13px] font-bold text-slate-700 tracking-wide pr-1 sm:pr-2 whitespace-nowrap">{feat.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- AESTHETIC FEATURES GRID --- */}
      <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[20%] left-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none z-0 transform-gpu"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">Built for</span> Modern Placement Cells
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((f) => (
              <div 
                key={f.title} 
                className="group bg-white border border-slate-200/60 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(103,58,183,0.15)] hover:border-purple-200 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
              >
                <div className="h-40 sm:h-48 md:h-56 overflow-hidden relative border-b border-slate-100">
                  <OptimizedImage src={f.imgSrc} alt={`${f.title} - Stalight Sync Feature`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" />
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-500">
                    <f.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 group-hover:text-white" strokeWidth={2} />
                  </div>
                </div>
                <div className="p-5 sm:p-6 pt-6 sm:pt-8 flex-grow flex flex-col">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">{f.title}</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed flex-grow">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CUTE MINIMALIST REVIEWS MARQUEE --- */}
      <section className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden z-10 relative">
        <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-12 md:mb-16">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3 sm:mb-4">Testimonials</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-950 tracking-tight">What Students Say</h2>
          </div>
        </div>

        <div className="relative w-full flex flex-col overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

          <div className="flex gap-4 sm:gap-5 md:gap-6 px-4 w-max animate-marquee hover:[animation-play-state:paused]">
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
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section id="contact" className="py-12 sm:py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-pink-100 rounded-full blur-[60px] sm:blur-[80px] opacity-60 pointer-events-none transform-gpu"></div>
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 rounded-full blur-[60px] sm:blur-[80px] opacity-60 pointer-events-none transform-gpu"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-24 text-center relative shadow-xl z-10 transition-all duration-500">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 mb-4 sm:mb-6 tracking-tight">Ready to <span className="font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">Sync Your Placements?</span></h2>
            <p className="text-slate-500 font-light text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-xl mx-auto px-2">Get in touch with our team to schedule a personalised architectural walkthrough of Stalight Sync.</p>

            {/* Inline contact form area */}
            <ContactArea />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NeuroSync;