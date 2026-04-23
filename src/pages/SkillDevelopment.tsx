import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import trainImg from "@/assets/products/jobfix.jpg";
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  BrainCircuit, 
  Code, 
  Cloud, 
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Target,
  Star
} from "lucide-react";

// --- High-End Animation Variants ---
const fadeUp = { 
  hidden: { opacity: 0, y: 30 }, 
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } 
};

const staggerContainer = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } } 
};

// --- Mock Data for Courses & Certifications ---
const courses = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-purple-600" />,
    title: "Applied AI & Machine Learning",
    duration: "12 Weeks",
    desc: "Master modern AI architectures, from training custom predictive models to building enterprise-scale Retrieval-Augmented Generation (RAG) pipelines and computer vision systems.",
    tags: ["Python", "TensorFlow", "LangChain"]
  },
  {
    icon: <Code className="w-8 h-8 text-pink-600" />,
    title: "Advanced Full-Stack Engineering",
    duration: "16 Weeks",
    desc: "Build highly responsive, secure, and scalable web applications. Learn modern frontend frameworks, backend microservices, and database architecture for MNC-level projects.",
    tags: ["React", "Node.js", "System Design"]
  },
  {
    icon: <Cloud className="w-8 h-8 text-blue-600" />,
    title: "Cloud Infrastructure & DevOps",
    duration: "10 Weeks",
    desc: "Learn to design, deploy, and manage robust cloud architectures. Focus on CI/CD automation, containerization, and serverless computing environments.",
    tags: ["AWS", "Docker", "Kubernetes"]
  }
];

const certifications = [
  "Stalight Certified AI Practitioner (SCAI)",
  "Enterprise Full-Stack Developer",
  "Cloud Architecture Fundamentals",
  "Modern UI/UX Design Principles"
];

const SkillDevelopment = () => {
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-hidden">
      <Navbar />

      {/* --- Hero Section --- */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer} 
        className="pt-32 pb-20 container mx-auto px-4 lg:px-8 relative"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div variants={fadeUp} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-600/10 border border-purple-200/50 text-slate-800 font-bold tracking-wide text-sm shadow-sm backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              100% Placement Guarantee Program
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Master the tech. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600">Secure your career.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Intensive, architectural-scale training designed by industry veterans. We don't just upskill you; we guarantee your placement in top-tier enterprises upon successful completion.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#courses" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1">
                Explore Guaranteed Tracks
              </a>
              <a href="mailto:info@stalight.tech" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:border-purple-500 hover:text-purple-700 text-slate-900 rounded-full font-bold transition-all hover:shadow-lg">
                Talk to an Advisor
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="relative group perspective-1000">
            {/* Glowing background blur matched to logo colors */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-[2rem] transform rotate-3 scale-105 -z-10 transition-transform duration-700 group-hover:rotate-6"></div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white">
              <img src={trainImg} alt="Technical Training" className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110 opacity-95" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Core Value Grid --- */}
      <section className="py-16 bg-white relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Target />, color: "text-pink-600", bg: "bg-pink-50", title: "100% Placement Assured", desc: "Signed agreements ensuring your transition into MNC roles upon completing our elite tracks." },
              { icon: <Briefcase />, color: "text-purple-600", bg: "bg-purple-50", title: "Industry-Vetted Curriculum", desc: "Syllabuses strictly aligned with current enterprise requirements, bypassing outdated academics." },
              { icon: <Star />, color: "text-blue-600", bg: "bg-blue-50", title: "Architectural Projects", desc: "Build live, large-scale systems for your portfolio, not just theoretical textbook examples." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Specialized Courses Section --- */}
      <section id="courses" className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-slate-900">Elite Engineering Tracks</h2>
              <p className="text-slate-600 text-lg md:text-xl">Rigorous curriculums designed to transition learners into highly capable, high-earning professionals.</p>
            </div>
          </div>

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer} 
            className="grid lg:grid-cols-3 gap-8"
          >
            {courses.map((course, index) => (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className="group relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-transparent transition-all duration-300 flex flex-col h-full hover:-translate-y-2 z-10"
              >
                {/* Hover Gradient Border Effect */}
                <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[2px]"></div>
                <div className="absolute inset-0 bg-white rounded-3xl -z-10"></div>

                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-50 rounded-2xl shadow-inner">
                    {course.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-full shadow-sm">
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{course.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{course.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {course.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Guarantee & Certifications --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Certified Excellence
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Your career, strictly <br/> guaranteed.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-300 text-lg mb-8 leading-relaxed max-w-lg">
                Our certification pathways ensure that every learner is tested against rigorous, real-world architectural standards. We are so confident in our training that we back it with a 100% placement guarantee.
              </motion.p>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div key={index} variants={fadeUp} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                    <Award className="w-6 h-6 text-purple-400 flex-shrink-0" />
                    <span className="font-bold text-slate-100">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white rounded-[2.5rem] p-10 md:p-12 text-slate-900 text-center shadow-2xl relative overflow-hidden"
            >
              {/* Subtle top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600"></div>
              
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <ShieldCheck className="w-10 h-10 text-slate-900" />
              </div>
              <h3 className="text-3xl font-black mb-4">Secure Your Seat</h3>
              <p className="text-slate-600 mb-8 text-lg">Enroll in our placement-guaranteed batches. Limited seats available to ensure strict mentorship quality.</p>
              <a href="mailto:info@stalight.tech" className="inline-block w-full py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-lg transition-all shadow-[0_8px_30px_rgb(0,0,0,0.15)] hover:-translate-y-1">
                Apply for Admission
              </a>
              <p className="text-sm font-bold text-slate-500 mt-6 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" /> 100% Placement Assured
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;