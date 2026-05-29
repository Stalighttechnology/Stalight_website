import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import trainImg from "@/assets/products/jobfix.jpg";
import { 
  GraduationCap, 
  Award, 
  Briefcase, 
  Cpu,
  Code, 
  Cloud, 
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Target,
  Star,
  X,
  Send
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { submitAdmissionApplication } from "@/lib/supabaseFormService";
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/utils/seoUtils";
import { OptimizedImage } from "@/components/OptimizedImage";

const courses = [
  {
    icon: <Cpu className="w-8 h-8 text-purple-600" />,
    title: "Applied Machine Learning",
    duration: "12 Weeks",
    desc: "Master modern architectures, from training custom predictive models to building enterprise-scale Retrieval-Augmented Generation (RAG) pipelines and computer vision systems.",
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
  "Stalight Certified ML Practitioner (SCAI)",
  "Enterprise Full-Stack Developer",
  "Cloud Architecture Fundamentals",
  "Modern UI/UX Design Principles"
];

const SkillDevelopment = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      first_name: (form.get("first_name") as string) ?? "",
      last_name: (form.get("last_name") as string) ?? "",
      email: (form.get("email") as string) ?? "",
      phone: (form.get("phone") as string) ?? "",
      interested_track: (form.get("track") as string) ?? "",
      qualification: (form.get("qualification") as string) ?? "",
    };

    const res = await submitAdmissionApplication(payload);
    if (res.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsFormOpen(false);
      }, 4000);
    } else {
      alert(res.message || "Failed to submit application.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 overflow-hidden">
      <SEO 
        title="Professional IT Skill Development | Stalight Technologies"
        description="Intensive, architectural-scale training designed by industry veterans. We provide placement support and hands-on labs to help you transition into top-tier enterprises upon successful completion."
        jsonLd={[
          generateWebPageSchema(
            "Skill Development & Training",
            "Elite engineering tracks in Machine Learning, Full-Stack, and Cloud with placement support and hands-on labs.",
            "/skill-development"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Skill Development", item: "/skill-development" }
          ])
        ]}
      />
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10 mt-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              Master the tech. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600">Secure your career.</span>
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-xl">
              Intensive, architectural-scale training designed by industry veterans. We provide comprehensive training, hands-on projects, and dedicated placement support to help you transition into top-tier enterprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('courses');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 text-white rounded-full font-bold transition-all shadow-[0_12px_40px_rgba(124,58,237,0.18)] hover:-translate-y-1"
              >
                Explore Tracks
              </a>
              <a
                href="#admission"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('admission');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setIsFormOpen(true); // Open the form automatically if clicked from hero
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 hover:border-purple-500 hover:text-purple-700 text-slate-900 rounded-full font-bold transition-all hover:shadow-lg cursor-pointer"
              >
                Apply Now
              </a>
            </div>
          </div>
          
          <div className="relative group perspective-1000">
            {/* Glowing background blur matched to logo colors */}
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 transform-gpu"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-50 rounded-[2rem] transform rotate-3 scale-105 -z-10 transition-transform duration-700 group-hover:rotate-6"></div>

            {/* Subtle campus background image */}
            <div
              className="absolute inset-0 bg-center bg-cover opacity-20 grayscale blur-sm rounded-[2rem] -z-20"
              style={{ backgroundImage: `url(${trainImg})` }}
            />

            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/50 bg-white">
              <div className="p-8 md:p-12">
                <h4 className="text-sm font-bold uppercase text-pink-500 mb-2">Technical training & mentorship</h4>
                <p className="text-slate-700 mb-4">Intensive, architectural-scale training designed by industry veterans. Live projects, enterprise readiness, and direct placement support.</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center"> <GraduationCap className="w-5 h-5 text-pink-600" /> </div>
                    <span className="text-xs font-bold text-slate-700">Career Mentorship</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center"> <Briefcase className="w-5 h-5 text-purple-600" /> </div>
                    <span className="text-xs font-bold text-slate-700">Placement Support</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"> <Code className="w-5 h-5 text-blue-600" /> </div>
                    <span className="text-xs font-bold text-slate-700">Real Projects</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-4">Enrolled students receive complimentary access to NeuroSync labs for hands-on experimentation and extended learning.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Value Grid --- */}
      <section className="py-16 bg-white relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Target />, color: "text-pink-600", bg: "bg-pink-50", title: "Placement Support", desc: "Dedicated placement assistance and employer connections to support your transition into MNC roles upon completing our elite tracks." },
              { icon: <Briefcase />, color: "text-purple-600", bg: "bg-purple-50", title: "Industry-Vetted Curriculum", desc: "Syllabuses strictly aligned with current enterprise requirements, bypassing outdated academics." },
              { icon: <Star />, color: "text-blue-600", bg: "bg-blue-50", title: "Architectural Projects", desc: "Build live, large-scale systems for your portfolio, not just theoretical textbook examples." }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
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

          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="group relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-transparent transition-all duration-300 flex flex-col h-full hover:-translate-y-2 z-10"
              >
                <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[2px] transform-gpu"></div>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Certifications & Admission Section --- */}
      <section id="admission" className="py-24 bg-white text-slate-900 relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-pink-600/8 rounded-full filter blur-[120px] opacity-40 pointer-events-none transform-gpu"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/8 rounded-full filter blur-[120px] opacity-40 pointer-events-none transform-gpu"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content Side */}
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-pink-50">
                <span className="font-bold text-pink-600">
                  Certified Excellence
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Your career, confidently <br/> supported.
              </h2>
              <p className="text-slate-700 text-lg mb-8 leading-relaxed max-w-lg">
                Our certification pathways ensure that every learner is tested against rigorous, real-world architectural standards. We provide dedicated placement support and enterprise connections to help graduates find the right opportunities.
              </p>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                    <Award className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    <span className="font-bold text-slate-900">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form/CTA Side */}
            <div 
              className="bg-white rounded-[2.5rem] p-8 md:p-12 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden min-h-[480px] flex flex-col justify-center transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600"></div>
              
              {!isFormOpen ? (
                /* Initial CTA State */
                <div className="text-center transition-all duration-300">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <ShieldCheck className="w-10 h-10 text-slate-900" />
                  </div>
                  <h3 className="text-3xl font-black mb-4">Secure Your Seat</h3>
                  <p className="text-slate-600 mb-8 text-lg">Enroll in our batches with dedicated placement support. Limited seats available to ensure strict mentorship quality.</p>
                  <button 
                    onClick={() => setIsFormOpen(true)}
                    className="inline-block w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 hover:opacity-95 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_12px_40px_rgba(124,58,237,0.18)] hover:-translate-y-1"
                  >
                    Apply for Admission
                  </button>
                  <p className="text-sm font-bold text-slate-500 mt-6 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Placement Support Included
                  </p>
                </div>
              ) : isSubmitted ? (
                /* Success Message State */
                <div className="text-center py-10 transition-all duration-300">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">Application Received!</h3>
                  <p className="text-slate-600">Our admission team will reach out to you shortly to discuss the next steps.</p>
                </div>
              ) : (
                /* Form State */
                <div className="transition-all duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-black">Application Form</h3>
                      <p className="text-sm text-slate-500">Fast-track your IT career.</p>
                    </div>
                    <button 
                      onClick={() => setIsFormOpen(false)}
                      className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">First Name</label>
                        <input name="first_name" type="text" required placeholder="John" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Last Name</label>
                        <input name="last_name" type="text" required placeholder="Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Email Address</label>
                        <input name="email" type="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Phone Number</label>
                        <input name="phone" type="tel" required placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Interested Track</label>
                      <select name="track" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none cursor-pointer">
                        <option value="" disabled selected>Select a program...</option>
                        <option value="ai">Applied Machine Learning</option>
                        <option value="fullstack">Advanced Full-Stack Engineering</option>
                        <option value="cloud">Cloud Infrastructure & DevOps</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 ml-1">Highest Qualification</label>
                      <select name="qualification" required className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all text-sm appearance-none cursor-pointer">
                        <option value="" disabled selected>Select qualification...</option>
                        <option value="btech">B.Tech / B.E.</option>
                        <option value="bca">BCA / MCA</option>
                        <option value="bsc">B.Sc / M.Sc IT</option>
                        <option value="other">Other / Diploma</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full mt-2 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                      Submit Application <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkillDevelopment;