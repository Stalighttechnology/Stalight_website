import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import stalightMainOfficeImg from "@/assets/office/stalightmainoffice.png";
import stalightOfficeImg from "@/assets/office/stalightoffice.png";
import amcLogo from "@/assets/logos/amclogo.png";
import cityEngineeringLogo from "@/assets/logos/cityenginerring.jpg";
import gleamatorLogo from "@/assets/logos/gleamatorlogo.jpg";
import eduforcarrierLogo from "@/assets/logos/eduforcarrier.png";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
import { OptimizedImage } from "@/components/OptimizedImage";


// --- Premium MNC Easing Curve ---
// This provides a sharp, decisive entry that glides smoothly to a halt
const techEase = [0.16, 1, 0.3, 1] as any;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const textRevealVariants: Variants = {
  hidden: { y: "110%", opacity: 0, rotateX: 20 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 1.4, ease: techEase },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: techEase },
  },
};

// Masked Text Helper for that clean, sliding-up text effect
const MaskedText = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className="overflow-hidden inline-block w-full leading-tight py-1" style={{ perspective: "1000px" }}>
    <motion.div variants={textRevealVariants} className={className} style={{ transformOrigin: "bottom center" }}>
      {children}
    </motion.div>
  </div>
);

const karnatakaPartners = [
  { name: "AMC Institution", logo: amcLogo },
  { name: "City Engineering College", logo: cityEngineeringLogo },
  { name: "Gleamator Technologies", logo: gleamatorLogo },
  { name: "Eduforcarriers", logo: eduforcarrierLogo },
];

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D32027] selection:text-white">
      <SEO 
        title="About Stalight Technologies | Enterprise AI & Software Solutions"
        description="Learn about Stalight Technologies, a leader in AI-first enterprise platforms, custom software development, and professional IT training in Karnataka."
        jsonLd={[
          generateWebPageSchema(
            "About Stalight Technologies",
            "Learn about Stalight Technologies, a leader in AI-first enterprise platforms and software development.",
            "/about-us"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "About Us", item: "/about-us" }
          ])
        ]}
      />
      <Navbar />


      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-[#FAFAFA]">
        {/* Cinematic Slow Zoom Background */}
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: "easeOut" }}
          style={{ opacity: opacityParallax }}
          className="absolute inset-0 z-0 mix-blend-multiply"
        >
           <OptimizedImage src={stalightMainOfficeImg} alt="Stalight Technologies Main Office Building" className="w-full h-full object-cover filter grayscale opacity-40" priority />
           <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA]/40 via-transparent to-[#FAFAFA]"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="text-center max-w-5xl mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
            <MaskedText className="text-[#D32027] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center justify-center gap-4">
              <span className="w-8 h-[2px] bg-[#D32027]"></span>
              The Architecture of Tomorrow
              <span className="w-8 h-[2px] bg-[#D32027]"></span>
            </MaskedText>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] text-slate-950 tracking-tighter leading-[0.95] mb-10">
              <MaskedText className="font-light">Engineering</MaskedText>
              <MaskedText className="font-bold">Sovereign Intelligence.</MaskedText>
            </h1>
            
            <motion.p variants={fadeUpVariants} className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto font-light border-l border-slate-300 pl-6 text-left md:text-center md:border-none md:pl-0">
              Stalight Technology translates rigorous engineering heritage into the digital fabric of modern enterprise. We bridge the gap between human potential and technical excellence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* --- WHO WE ARE --- */}
      <section className="py-24 md:py-36 relative bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
          >
            <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
              <MaskedText>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-8 text-slate-950 leading-[1.1]">
                  Beyond Software. <br/><span className="font-bold">Digital Evolution.</span>
                </h2>
              </MaskedText>
              <motion.div variants={fadeUpVariants} className="space-y-6 text-slate-600 font-light leading-relaxed text-[16px] md:text-[18px]">
                <p>Founded to revolutionize how organizations approach technology, Stalight combines deep software development with a commitment to human skill advancement.</p>
                <p>We don't just build systems; we build the people who operate them. Our dual focus on high-end software solutions and industry-ready skill training makes us a unique partner in the digital age.</p>
              </motion.div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 relative">
              {/* Premium Image Reveal */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.5, ease: techEase as any } }
                }} 
                className="relative h-[450px] lg:h-[650px] bg-slate-100 overflow-hidden shadow-2xl rounded-2xl md:rounded-[2rem]"
              >
                <motion.div style={{ y: yParallax, scale: 1.1 }} className="w-full h-full">
                  <OptimizedImage src={stalightOfficeImg} alt="Modern interior of Stalight Technologies software development center" className="w-full h-full object-cover origin-bottom" />
                </motion.div>
                <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="py-24 md:py-36 bg-[#FAFAFA] relative">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40" 
             style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
            <MaskedText className="text-[#D32027] font-bold tracking-[0.2em] uppercase text-xs mb-4">Core Capabilities</MaskedText>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-950 tracking-tight">Integrated <span className="font-bold">IT Ecosystem</span></h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {/* Card 1: IT Skill & Training */}
            <motion.div 
              variants={fadeUpVariants}
              className="group bg-white border border-slate-200/60 p-10 md:p-14 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden rounded-2xl"
            >
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#D32027] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
              
              <div className="mb-6 inline-flex items-center gap-2 border border-red-100 rounded-full px-4 py-1.5 bg-red-50/50">
                <span className="w-2 h-2 rounded-full bg-[#D32027] animate-pulse"></span>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#D32027] uppercase">Workforce Empowerment</h3>
              </div>
              
              <h4 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight group-hover:text-[#D32027] transition-colors duration-300">IT Skill & Professional Training</h4>
              <p className="text-slate-600 font-light leading-relaxed text-[16px]">
                Bridging the industry-academia gap through intensive training programs in Full Stack Dev, AI/ML, and Cloud Architecture. We turn students into deployable engineers.
              </p>
            </motion.div>

            {/* Card 2: Software Solutions */}
            <motion.div 
              variants={fadeUpVariants}
              className="group bg-white border border-slate-200/60 p-10 md:p-14 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden rounded-2xl"
            >
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#D32027] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
              
              <div className="mb-6 inline-flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5 bg-slate-50">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-slate-700 uppercase">Technical Excellence</h3>
              </div>

              <h4 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight group-hover:text-[#D32027] transition-colors duration-300">Custom Software Solutions</h4>
              <p className="text-slate-600 font-light leading-relaxed text-[16px]">
                End-to-end development of scalable web applications, mobile platforms, and enterprise ERPs designed for high-load environments and seamless UX.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- PARTNERS SECTION (Always in color, Aesthetic Glassmorphism) --- */}
      <section className="py-24 md:py-36 bg-white relative overflow-hidden">
        {/* Deep ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-red-50 rounded-full blur-[100px] opacity-70 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants} className="text-center mb-20 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-light text-slate-900 tracking-tight relative pb-4">
              Trusted by <span className="font-bold relative z-10">Karnataka's Finest</span>
              {/* Animated Red Swoosh Underline */}
              <motion.svg 
                className="absolute bottom-0 left-[30%] w-[70%] h-4 -z-10" 
                viewBox="0 0 200 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M5 15 Q 100 -5, 195 10"
                  stroke="#D32027"
                  strokeWidth="4"
                  strokeLinecap="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 1.5, ease: techEase, delay: 0.5 } }
                  }}
                />
              </motion.svg>
            </h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {karnatakaPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={fadeUpVariants}
                whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
                className="relative group"
              >
                {/* Premium Glass Card */}
                <div className="h-full bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-[0_20px_50px_-15px_rgba(211,32,39,0.15)] group-hover:border-red-100 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 overflow-hidden">
                  
                  {/* Hover Glow Effect behind logo */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-red-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                  {/* Logo Container - Removed grayscale, ALWAYS IN COLOR */}
                  <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center relative z-10 transition-all duration-500">
                    <OptimizedImage
                      src={partner.logo}
                      alt={`${partner.name} Logo - Official Partner of Stalight Technologies`}
                      className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                    />
                  </div>
                  
                  <div className="text-center relative z-10 mt-2">
                    <h3 className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-slate-400 group-hover:text-[#D32027] uppercase transition-colors duration-300">
                      Official Partner
                    </h3>
                    <p className="text-[13px] md:text-sm font-bold text-slate-900 mt-1 tracking-tight leading-tight">{partner.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;