import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// --- Sophisticated Easing ---
// A highly polished, snappy ease-out curve for a "powerful" feel
const powerEase = [0.19, 1.0, 0.22, 1.0];

const QuoteSection = () => {
  const quoteText = "Stalight Technology represents the definitive convergence of deep-intellect engineering and the next frontier of computational intelligence.";
  const words = quoteText.split(" ");

  // --- Animation Orchestration ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      // Faster stagger for a fluid, powerful read
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  // Crisp, fast blur reveal for words
  const wordVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: powerEase } 
    },
  };

  const quoteMarkVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { duration: 1, ease: powerEase } 
    },
  };

  const signatureRevealVariants = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, x: -10 },
    visible: { 
      clipPath: "inset(0 0% 0 0)", 
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: powerEase, delay: 0.6 } 
    }
  };

  const underlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeOut", delay: 1.0 } 
    }
  };

  const metaVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, delay: 1.4, ease: powerEase } 
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');
          
          .font-editorial { font-family: 'Playfair Display', serif; }
          .font-tech { font-family: 'Inter', sans-serif; }
          .font-signature { font-family: 'Alex Brush', cursive; }
        `}
      </style>

      {/* Reduced massive min-height and padding for better mobile framing */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-[#FAFAFC] overflow-hidden flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] selection:bg-purple-200 selection:text-purple-900 border-y border-slate-200/60">
        
        {/* Layer 1: Architectural Grid */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.5]" 
          style={{ backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.03) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
        ></div>

        {/* Layer 2: Brand Ambient Glows (Scaled for mobile) */}
        <div className="absolute top-0 right-[-10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-purple-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-[-10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-500/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none z-0"></div>

        {/* Layer 3: Massive Floating Quote Mark (Scaled down on mobile) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 0.03, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: powerEase }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
        >
          <Quote className="text-purple-600 fill-purple-600 w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]" strokeWidth={0} />
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl md:max-w-4xl mx-auto flex flex-col items-center text-center">
            
            {/* The Main Editorial Quote */}
            <motion.blockquote 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-slate-900 leading-[1.5] sm:leading-[1.4] tracking-tight mb-12 sm:mb-16 md:mb-20 relative z-10"
            >
              {/* Mobile-safe inline quote marks */}
              <motion.span variants={quoteMarkVariants} className="absolute -top-6 sm:-top-8 -left-2 sm:-left-6 text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-500 font-serif text-5xl sm:text-7xl opacity-40 select-none">
                “
              </motion.span>
              
              {/* Staggered Words */}
              <div className="relative z-10">
                {words.map((word, index) => (
                  <motion.span 
                    key={index} 
                    variants={wordVariants} 
                    className="inline-block mr-[0.25em] mb-1 sm:mb-0"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              
              <motion.span variants={quoteMarkVariants} className="absolute -bottom-10 sm:-bottom-12 -right-2 sm:-right-6 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-blue-500 font-serif text-5xl sm:text-7xl opacity-40 rotate-180 select-none">
                “
              </motion.span>
            </motion.blockquote>

            {/* Signature & Identity Block */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center mt-4 sm:mt-0"
            >
              <div className="relative mb-6 sm:mb-8 flex justify-center w-full">
                
                {/* The "Handwritten" Signature */}
                <motion.div 
                  variants={signatureRevealVariants}
                  className="font-signature text-4xl sm:text-5xl md:text-6xl text-slate-900 relative z-10 px-4"
                >
                  Alistair Vance
                </motion.div>
                
                {/* Animated Gradient Ink Underline */}
                <svg 
                  className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 w-[110%] sm:w-[120%] max-w-[280px] sm:max-w-[320px] h-8 sm:h-10 overflow-visible z-0 opacity-90 pointer-events-none" 
                  viewBox="0 0 300 30" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="sigGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ec4899" /> {/* Pink */}
                      <stop offset="50%" stopColor="#a855f7" /> {/* Purple */}
                      <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M5 15 C 80 -5, 180 25, 290 10"
                    stroke="url(#sigGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    variants={underlineVariants}
                  />
                </svg>
              </div>

              {/* Crisp, ultra-minimalist Metadata */}
              <motion.div 
                variants={metaVariants}
                className="flex flex-col items-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 font-tech"
              >
                <p className="text-[11px] sm:text-xs tracking-[0.2em] font-bold uppercase text-slate-950">
                  Dr. Alistair Vance
                </p>
                <div className="h-1 w-6 sm:w-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 my-0.5 sm:my-1"></div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-slate-500 font-medium text-center">
                  Director, Global Institutional Governance
                </p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default QuoteSection;