import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import stalightMainOfficeImg from "@/assets/office/stalightmainoffice.jpg";
import stalightOfficeImg from "@/assets/office/stalightoffice.jpg";
import amcLogo from "@/assets/logos/amclogo.png";
import cityEngineeringLogo from "@/assets/logos/cityenginerring.jpg";
import gleamatorLogo from "@/assets/logos/gleamatorlogo.jpg";
import eduforcarrierLogo from "@/assets/logos/eduforcarrier.png";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
import { OptimizedImage } from "@/components/OptimizedImage";


// --- Premium MNC Easing Curve ---
// This provides a sharp, decisive entry that glides smoothly to a halt
const techEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  { name: "AMC Institution", logo: amcLogo, url: "https://www.amcgroup.edu.in/" },
  { name: "City Engineering College", logo: cityEngineeringLogo, url: "https://cityengineeringcollege.ac.in/" },
  { name: "Gleamator Technologies", logo: gleamatorLogo, url: "https://gleamator.in/" },
  { name: "Eduforcarriers", logo: eduforcarrierLogo, url: "https://eduforcareer.com/" },
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
        title="About Stalight Technologies | Software & AI Solutions Company in Bengaluru"
        description="Stalight Technologies is a Bengaluru-based software and AI solutions company specializing in campus management systems, coding assessment platforms, custom software development, and IT skill training. Serving schools, colleges, and enterprises across India from Rajajinagar, Bengaluru."
        keywords="Stalight Technologies, software company Bengaluru, AI solutions India, Stalight Campus, Stalight Sync, campus management software, coding assessment platform, custom software development Bengaluru, IT training institute Bengaluru, Rajajinagar Bengaluru, software development company Karnataka"
        jsonLd={[
          generateWebPageSchema(
            "About Stalight Technologies — Software & AI Solutions, Bengaluru",
            "Stalight Technologies is a Bengaluru-based software and AI solutions company building campus management systems, coding assessment platforms, custom software, and IT training programs for institutions and enterprises across India.",
            "/about-us"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "About Us", item: "/about-us" }
          ])
        ]}
      />
      <Navbar />


      {/* --- REDESIGNED HERO SECTION (Asymmetric Tech & Grid Design) --- */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-slate-50/50">

        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
            backgroundSize: '32px 32px'
          }}>
        </div>

        {/* Ambient Neon Halos */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-purple-100/40 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none z-0 transform-gpu"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 pointer-events-none z-0 transform-gpu"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >

            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">

              {/* Pulse Indicator Pill */}
              <motion.div
                variants={fadeUpVariants}
                className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-white border border-purple-100 shadow-[0_2px_12px_rgba(168,85,247,0.04)] mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
                <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-purple-600/90">The Architecture of Tomorrow</span>
              </motion.div>

              {/* Elegant Responsive Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] font-light text-slate-900 tracking-tight leading-[1.05] mb-8">
                About <strong>Stalight Technologies</strong> | <br />
                <span className="font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">Software Development</span> Experts in Bengaluru
              </h1>

              {/* Detailed Technical Subtitle */}
              <motion.p
                variants={fadeUpVariants}
                className="text-slate-600 text-lg md:text-[19px] leading-relaxed max-w-xl font-light border-l-2 border-purple-500 pl-5"
              >
                <strong>Stalight Technologies Pvt Ltd</strong> is a <strong>software development company</strong> based in Bengaluru, India. Founded to revolutionize <strong>enterprise software</strong> with AI, we serve clients across academia, workforce management, and campus automation.
              </motion.p>

            </div>

            {/* Right Interactive Composite Media Column */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">

              {/* Behind-image shadow container */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-200/30 to-purple-100/10 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10 border border-slate-200/50"></div>

              {/* Main Masked Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[1.4/1] lg:aspect-[4/5] rounded-[2.5rem] bg-white border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden group">

                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.8, ease: techEase }}
                  className="w-full h-full"
                >
                  <OptimizedImage
                    src={stalightMainOfficeImg}
                    alt="Stalight Technologies software development office building facade in Bengaluru"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.98]"
                    priority
                  />
                </motion.div>

                {/* Ambient Soft Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>

                {/* Floating Micro-data Node Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 1.0, ease: techEase }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-purple-50/80 p-5 rounded-2xl shadow-[0_15px_35px_-8px_rgba(168,85,247,0.06)] flex items-center justify-between z-20 pointer-events-none"
                >
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Active Node</p>
                    <p className="text-sm font-bold text-slate-800 tracking-tight">Bengaluru, KA</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[9px] font-bold text-purple-600 uppercase tracking-widest mb-0.5">Focus</p>
                    <p className="text-sm font-bold text-slate-800 tracking-tight font-sans">Digital Integration</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* --- REDESIGNED & ANIMATED WHO WE ARE SECTION --- */}
      <section className="py-24 md:py-36 relative bg-white overflow-hidden">

        {/* Soft decorative background glows */}
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-50/30 rounded-full blur-[100px] pointer-events-none z-0 transform-gpu"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >

            {/* Left Interactive Animated Image Showcase */}
            <div className="lg:col-span-6 relative flex justify-center items-center">

              {/* Dynamic Breathing Container */}
              <motion.div
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[1.3/1] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-100 group"
              >
                {/* Slow Zoom Parallax Image */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 1.05 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 1.6, ease: techEase } }
                  }}
                  className="w-full h-full"
                >
                  <OptimizedImage
                    src={stalightOfficeImg}
                    alt="Modern interior design of Stalight Technologies software development office in Rajajinagar Bengaluru"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out origin-center"
                  />
                </motion.div>

                {/* Overlaid Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>

                {/* Top Left Tech Floating Tag */}
                <div className="absolute top-6 left-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 px-4 py-2 rounded-full shadow-lg pointer-events-none">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Dev Center / Agile Core
                  </p>
                </div>

                {/* Bottom Right Floating Badge */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md border border-purple-100 px-4 py-2.5 rounded-2xl shadow-xl max-w-[200px] pointer-events-none">
                  <p className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider mb-0.5">Designed For Focus</p>
                  <p className="text-[12px] font-medium text-slate-700 leading-tight">High productivity, collaborative labs.</p>
                </div>
              </motion.div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 relative z-10">

              {/* Category tag */}
              <motion.div variants={fadeUpVariants} className="mb-4">
                <span className="text-[10px] font-extrabold tracking-[0.25em] text-purple-600 uppercase bg-purple-50 border border-purple-100 px-3 py-1 rounded-full">
                  Our Philosophy
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-10 text-slate-950 leading-[1.1]">
                Beyond Software. <br />
                <span className="font-extrabold bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent">Digital Evolution.</span>
              </h2>

              {/* Interactive Advantage Cards */}
              <div className="space-y-6">

                {/* Advantage Card 1 */}
                <motion.div
                  variants={fadeUpVariants}
                  whileHover={{ x: 6, transition: { duration: 0.3 } }}
                  className="group flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all duration-500 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 group-hover:bg-purple-100 transition-colors">
                    <span className="text-purple-600 font-bold text-lg">01</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-900 transition-colors">Rigorous Engineering</h3>
                    <p className="text-slate-600 font-light leading-relaxed text-[15px]">
                      Founded to revolutionize how organizations approach technology, Stalight combines deep software development with an unwavering commitment to architectural precision.
                    </p>
                  </div>
                </motion.div>

                {/* Advantage Card 2 */}
                <motion.div
                  variants={fadeUpVariants}
                  whileHover={{ x: 6, transition: { duration: 0.3 } }}
                  className="group flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all duration-500 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100 group-hover:bg-purple-100 transition-colors">
                    <span className="text-purple-600 font-bold text-lg">02</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-purple-900 transition-colors">Human Empowerment</h3>
                    <p className="text-slate-600 font-light leading-relaxed text-[15px]">
                      We don't just build systems; we build the people who operate them. Our dual focus on high-end software solutions and industry-ready skill training makes us a unique digital partner.
                    </p>
                  </div>
                </motion.div>

              </div>
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
                Bridging the industry-academia gap through intensive training programs in Full Stack Dev, Machine Learning, and Cloud Architecture. We turn students into deployable engineers.
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-red-50 rounded-full blur-[100px] opacity-70 z-0 transform-gpu"></div>

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
                <a href={partner.url ?? "#"} target="_blank" rel="noopener noreferrer" aria-label={`${partner.name} - Official Partner`} className="block">
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
                </a>
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