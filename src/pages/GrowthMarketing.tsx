import React, { useEffect, useState, useRef } from "react";
import { motion, Variants, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { generateWebPageSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/utils/seoUtils";
import {
  Target,
  Users,
  MailCheck,
  FileText,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  Loader2,
  X,
  ChevronRight,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { submitContact } from "@/lib/contactService";

// ==========================================
// REACT BITS ANIMATION COMPONENTS
// ==========================================

/**
 * 1. React Bits: ShinyText
 * Creates a continuous shimmering metallic light sweep across the text.
 */
const ShinyText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-[linear-gradient(110deg,#1c1917,45%,#D32027,55%,#1c1917)] bg-[length:250%_100%] bg-clip-text text-transparent animate-[shimmer_4s_infinite_linear] font-inherit ${className}`}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
};

/**
 * 2. React Bits: BlurText
 * Smoothly resolves text from an initial blur and upward drift.
 */
const BlurText = ({
  text,
  className = "",
  delay = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap gap-x-2 ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, filter: "blur(10px)", y: 16 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/**
 * 3. React Bits: SpotlightCard
 * Sharp architectural card with dynamic mouse-tracking spotlight radial gradient.
 */
interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(211, 32, 39, 0.08)",
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Pointer spotlight gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 75%)`,
        }}
      />
      {children}
    </div>
  );
};

/**
 * 4. React Bits: BorderBeam
 * Clockwise running beam of light travelling around the perimeter of the card.
 */
const BorderBeam = ({
  duration = 6,
  size = 200,
  className = "",
}: {
  duration?: number;
  size?: number;
  className?: string;
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 rounded-none overflow-hidden [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] z-20 ${className}`}
    >
      <div
        className="absolute inset-0 aspect-square w-full h-full bg-[radial-gradient(circle_at_center,#D32027_0%,transparent_70%)] animate-[spin_linear_infinite]"
        style={{
          animationDuration: `${duration}s`,
          transformOrigin: "center center",
          width: `${size}%`,
          height: `${size}%`,
          top: "-50%",
          left: "-50%",
        }}
      />
    </div>
  );
};

/**
 * 5. React Bits: CountUp
 * Smoothly interpolates numeric values when scrolled into view.
 */
const CountUp = ({
  target,
  duration = 2,
  suffix = "",
  decimals = 0,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quint
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      const currentVal = start + (end - start) * easeProgress;
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-inherit">
      {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
      {suffix}
    </span>
  );
};

/**
 * 6. React Bits: Magnet
 * Provides a magnetic tactile pull toward the cursor when hovering over primary actions.
 */
const Magnet = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Subtle magnetic attraction
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// BENEFIT-FOCUSED VALUE PILLARS
// ==========================================

const benefitPillars = [
  {
    id: "quality-leads",
    title: "More Quality Leads",
    category: "Targeted Discovery",
    description: "Identify and connect directly with verified decision-makers who match your exact Ideal Customer Profile (ICP), eliminating wasted outreach cycles.",
    duration: "3.2s",
  },
  {
    id: "customer-engagement",
    title: "Better Customer Engagement",
    category: "Account-Based Focus",
    description: "Surround high-value target accounts with personalized, multi-channel touchpoints designed to engage buying committees and spark meaningful conversations.",
    duration: "2.8s",
  },
  {
    id: "email-campaigns",
    title: "Reliable Email Campaigns",
    category: "Clean Deliverability",
    description: "Dedicated secondary domain infrastructure, mailbox warming, and verified deliverability ensure your emails consistently land in the primary inbox.",
    duration: "3.6s",
  },
  {
    id: "sales-growth",
    title: "Smarter Sales Growth",
    category: "Pipeline Velocity",
    description: "Equip your sales team with competitive battlecards, CRM automation, and lead insights to convert opportunities into revenue faster.",
    duration: "4.0s",
  },
];

const growthServices = [
  {
    id: "b2b-lead-gen",
    number: "01",
    total: "05",
    title: "B2B Lead Generation",
    category: "Outbound Pipeline Architecture",
    desc: "Identify and connect with the right decision-makers through targeted outreach, personalized campaigns, and data-driven strategies to build a stronger sales pipeline.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    badge: "High-Intent Pipeline",
    icon: Target,
    keyMetrics: "3.8x Qualified Pipeline Multiplier",
    deliverables: [
      "Target Addressable Market (TAM) mapping & verified C-suite contact discovery",
      "Multi-channel cold touchpoints across email, phone, and LinkedIn",
      "Algorithmic prospect data cleansing and real-time email verification",
      "Sales-qualified meeting setting directly synced with executive calendars",
      "Weekly cohort deliverability reporting and message-hook testing",
    ],
    deepDive: {
      headline: "Predictable, Scalable B2B Appointment Architecture",
      summary: "Rather than relying on unvetted scrapers and generic scripts, our lead generation system leverages real-world intent data, hiring signals, and technographic triggers to start genuine business conversations with verified budget holders.",
      phases: [
        { phase: "Targeting & Verification", detail: "Exclusion of stale data and dual-verification of active inboxes to protect domain reputation." },
        { phase: "Empathetic Value Hooks", detail: "Short, problem-centric copy tailored to specific executive pain points." },
        { phase: "Handoff to Sales", detail: "Pre-qualified leads booked directly with full background briefs for your reps." },
      ],
    },
  },
  {
    id: "account-based-marketing",
    number: "02",
    total: "05",
    title: "Account-Based Marketing",
    category: "High-Value Enterprise Engagement",
    desc: "Focus your marketing efforts on high-value accounts with personalized, multi-channel campaigns designed to engage key stakeholders and drive meaningful business opportunities.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    badge: "Enterprise Deal Velocity",
    icon: Users,
    keyMetrics: "45%+ Stakeholder Penetration",
    deliverables: [
      "Tiered target account stratification (1:1 hyper-custom, 1:few cluster, 1:many scale)",
      "Buying committee persona alignment (Champion, Influencer, Economic Buyer, Blocker)",
      "Bespoke microsites, tailored decks, and personalized video collateral",
      "Synchronized sales & marketing account-surround activation plays",
      "Real-time stakeholder account surge alerts sent directly to reps",
    ],
    deepDive: {
      headline: "Surround Every Buying Committee Stakeholder",
      summary: "High-ticket deals are never made by one person alone. We coordinate unified messaging across the entire executive committee, building institutional momentum that prevents deals from stalling in procurement.",
      phases: [
        { phase: "Committee Mapping", detail: "Mapping decision makers, influencers, and technical gatekeepers in each target account." },
        { phase: "Multitouch Symphony", detail: "Deploying matched IP-targeted ads, custom collateral, and synchronized executive outreach." },
        { phase: "Deal Acceleration", detail: "Providing objection battlecards to navigate security reviews and board sign-offs." },
      ],
    },
  },
  {
    id: "email-marketing",
    number: "03",
    total: "05",
    title: "Email Marketing",
    category: "Lifecycle Nurturing & Cold Sequences",
    desc: "Create personalized and automated email campaigns that nurture leads, increase engagement, and help move prospects through the sales journey.",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1200&q=80",
    badge: "98.5%+ Primary Inbox",
    icon: MailCheck,
    keyMetrics: "55%+ Open & Engagement Rates",
    deliverables: [
      "Isolated secondary domain architecture with automated mailbox rotation",
      "Strict SPF, DKIM, DMARC, and custom tracking domain configuration",
      "Behavior-triggered drip sequences and customer re-engagement cadences",
      "Continuous A/B variant testing on subject lines, CTAs, and sender profiles",
      "CRM sequence synchronization with automatic pause on prospect reply",
    ],
    deepDive: {
      headline: "Enterprise Deliverability Meets High-Conversion Copy",
      summary: "Email remains the undisputed highest ROI channel when technical hygiene is paired with human, conversational copywriting. We protect your primary domain brand while consistently landing in the primary tab.",
      phases: [
        { phase: "Infrastructure Warming", detail: "Gradual 21-day algorithmic warmup of new domains to achieve neutral-to-high sender score." },
        { phase: "Copy Calibration", detail: "Human, friction-free copy with clear next steps rather than aggressive sales talk." },
        { phase: "Event Orchestration", detail: "Sequences that dynamically fork depending on whether prospects open, click, or visit docs." },
      ],
    },
  },
  {
    id: "content-marketing",
    number: "04",
    total: "05",
    title: "Content Marketing",
    category: "Brand Authority & Inbound Engine",
    desc: "Develop strategic content that builds brand authority, educates your audience, generates interest, and supports your sales and marketing goals.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    badge: "Thought Leadership",
    icon: FileText,
    keyMetrics: "4x Inbound Commercial Intent",
    deliverables: [
      "Data-backed whitepapers, benchmark research, and technical case studies",
      "High-intent commercial SEO pillar articles and competitive tear-downs",
      "Executive LinkedIn ghostwriting and thought-leadership positioning",
      "Interactive ROI calculators and downloadable buyer evaluation frameworks",
      "Omnichannel content repurposing into slide decks, summaries, and infographics",
    ],
    deepDive: {
      headline: "Content Built to Accelerate Revenue, Not Vanity Clicks",
      summary: "Modern enterprise buyers want authoritative proof and actionable insights before booking a call. We research and author technical, authoritative content that answers rigorous enterprise questions and establishes undeniable industry expertise.",
      phases: [
        { phase: "Intent Keyword Research", detail: "Focusing strictly on high-intent buyer queries and pain points over generic top-of-funnel traffic." },
        { phase: "Technical Ghostwriting", detail: "Drafting peer-grade articles with actual engineering and management substance." },
        { phase: "Sales Asset Repurposing", detail: "Transforming articles into customer-facing sales collateral for active deal conversations." },
      ],
    },
  },
  {
    id: "sales-enablement",
    number: "05",
    total: "05",
    title: "Sales Enablement",
    category: "Deal Velocity & Rep Coaching",
    desc: "Equip your sales team with the right processes, content, automation, and insights to improve engagement and convert more opportunities into customers.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
    badge: "Close Rate Boost",
    icon: TrendingUp,
    keyMetrics: "+32% Win Rate Enhancement",
    deliverables: [
      "Competitive battlecards, pricing defense decks, and objection matrices",
      "Standardized sales discovery question templates and demo playback guidelines",
      "CRM pipeline stage automation, task sequencing, and SLA enforcement",
      "Conversation intelligence analysis identifying winning closing patterns",
      "Streamlined proposal templates and accelerated contract onboarding flows",
    ],
    deepDive: {
      headline: "Turn Every Opportunity into a Closed-Won Contract",
      summary: "Generating leads is only half the battle; closing them requires consistency, preparation, and frictionless deal execution. We arm your sales team with the collateral, automation, and coaching required to outposition competitors and protect margins.",
      phases: [
        { phase: "Battlecard Architecture", detail: "Arming reps with instant counterarguments for competitor claims and price hesitations." },
        { phase: "Process Hygiene", detail: "Configuring CRM stages so no deal sits dormant without an active next step." },
        { phase: "Deal Retrospectives", detail: "Analyzing closed-lost patterns each month to refine marketing and sales messaging." },
      ],
    },
  },
];

const executionProcess = [
  {
    step: "01",
    title: "Audit & ICP Alignment",
    summary: "Deep forensic review of historical closed-won accounts, TAM mapping, and firmographic/technographic buyer profiling.",
  },
  {
    step: "02",
    title: "Technical Infrastructure",
    summary: "Domain warming, authenticated DNS handshakes (SPF, DKIM, DMARC), and CRM workflow integrations.",
  },
  {
    step: "03",
    title: "Multi-Touch Activation",
    summary: "Synchronized deployment of personalized outbound sequences, targeted ABM collateral, and content syndication.",
  },
  {
    step: "04",
    title: "Closed-Loop Attribution",
    summary: "Full-funnel pipeline tracking and sales enablement feedback loops ensuring continuous increase in contract value.",
  },
];

const faqs = [
  {
    question: "What does the 3.8x Average Pipeline Lift mean and how is it measured?",
    answer: "Pipeline Lift is measured by comparing the volume of qualified sales pipeline (SQP) generated within 90 days against your historical baseline prior to implementing our multi-channel outbound and ABM system. We track pipeline through your connected CRM (HubSpot, Salesforce, etc.) with full attribution.",
  },
  {
    question: "How does your Account-Based Marketing (ABM) differ from generic B2B outreach?",
    answer: "Generic outreach sends broad templates to arbitrary lists. Our ABM framework identifies your highest-value target accounts, maps out the entire 6-to-10-person buying committee (executives, technical directors, procurement), and surrounds them with coordinated, personalized touchpoints across email, custom landing pages, and direct sales plays.",
  },
  {
    question: "How do you guarantee 98.5%+ inbox deliverability?",
    answer: "We never send high-volume cold outreach from your primary corporate email domain. We build dedicated, isolated secondary domains, configure full SPF, DKIM, DMARC, and custom tracking records, and warm inboxes algorithmically over 21 days before sending. Every recipient address is verified in real-time.",
  },
  {
    question: "What CRMs and sales engagement platforms do you integrate with?",
    answer: "We provide native bidirectional integrations with HubSpot, Salesforce, Pipedrive, Zoho CRM, Apollo, Salesloft, and Outreach. All lead data, conversation notes, and attribution tags sync directly into your existing workflow with zero manual data entry.",
  },
  {
    question: "Can we start with an individual pillar such as Email Marketing or Lead Gen?",
    answer: "Yes. While our clients experience the strongest compounding gains from the unified full-funnel suite, our services are modular. You can engage us specifically for B2B Lead Generation, Account-Based Marketing, Cold Email Architecture, Content Strategy, or Sales Enablement based on your immediate focus.",
  },
];

const GrowthMarketing = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedService, setSelectedService] = useState<typeof growthServices[0] | null>(null);
  const [activeDialogId, setActiveDialogId] = useState<string | null>(null);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<string>("1. B2B Lead Generation");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const smoothScrollTo = (targetId: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 90;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (targetId === "consultation-form") {
        setIsFormOpen(true);
      }
    }
  };

  const handleInquireFromDialog = (serviceNumber: string, serviceTitle: string) => {
    // 1. Immediately close the dialog modal
    setActiveDialogId(null);

    // 2. Map service to match the form dropdown option exactly
    const matchedCategory = `${parseInt(serviceNumber, 10)}. ${serviceTitle}`;
    setSelectedServiceCategory(matchedCategory);

    // 3. Open the inquiry form
    setIsFormOpen(true);

    // 4. Smooth scroll to the consultation form section after modal exit releases body scroll lock
    setTimeout(() => {
      const element = document.getElementById("consultation-form");
      if (element) {
        const navOffset = 90;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navOffset,
          behavior: "smooth",
        });
      }
    }, 120);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const fullName = (form.get("full_name") as string) || "";
    const email = (form.get("email") as string) || "";
    const phone = (form.get("phone") as string) || "";
    const company = (form.get("company_name") as string) || "";
    const serviceRequired = (form.get("service_required") as string) || "B2B Lead Generation";
    const timeline = (form.get("timeline") as string) || "Immediate";
    const details = (form.get("details") as string) || "";

    setIsSubmitting(true);

    try {
      const payload = {
        full_name: fullName,
        email: email,
        phone: phone,
        company_name: company,
        service_required: `Growth & Marketing: ${serviceRequired}`,
        expected_timeline: timeline,
        project_requirements: details,
      };

      const { error } = await supabase.from("project_inquiries").insert([payload]);
      if (error) {
        console.warn("Supabase project_inquiries notice:", error.message);
      }
    } catch (err) {
      console.warn("Supabase insert catch:", err);
    }

    submitContact({
      name: fullName,
      email: email,
      message: `[Growth & Marketing - ${serviceRequired}] Company: ${company} | Phone: ${phone} | Details: ${details}`,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-slate-900 font-sans selection:bg-red-100 selection:text-red-900 scroll-smooth">
      <SEO
        title="B2B Growth & Marketing Services | Stalight Technologies"
        description="Accelerate B2B revenue with Stalight's Growth & Marketing services: B2B Lead Generation, Account-Based Marketing (ABM), Email Marketing, Content Strategy, and Sales Enablement."
        keywords="B2B lead generation Bengaluru, account based marketing India, B2B email marketing services, content marketing agency, sales enablement consulting, Stalight Technologies marketing, B2B pipeline growth"
        jsonLd={[
          generateWebPageSchema(
            "B2B Growth & Marketing Services — Stalight Technologies",
            "Specialized B2B growth and marketing services including lead generation, account-based marketing, automated email nurture, content strategy, and sales enablement.",
            "/growth-marketing"
          ),
          generateBreadcrumbSchema([
            { name: "Home", item: "/" },
            { name: "Services", item: "/services" },
            { name: "Growth & Marketing", item: "/growth-marketing" }
          ]),
          generateFAQSchema(faqs)
        ]}
      />

      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-14 border-b border-stone-200 overflow-hidden">
        {/* React Bits: Interactive Architectural Grid Background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c19170a_1px,transparent_1px),linear-gradient(to_bottom,#1c19170a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[400px] bg-gradient-to-tr from-red-100/40 via-amber-50/25 to-rose-100/20 blur-[130px] rounded-full pointer-events-none" />
        </div>

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            
            {/* React Bits: Shimmering Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-300 shadow-sm mb-4 relative"
            >
              <span className="w-2 h-2 bg-[#D32027] animate-pulse" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-stone-800">
                <ShinyText>B2B Growth Architecture & Demand Generation</ShinyText>
              </span>
            </motion.div>

            {/* Headline with Clean Horizontal Flow & Zero Vertical Stacking */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.65rem] font-light text-stone-950 tracking-tight leading-[1.14] mb-4"
            >
              Ignite Predictable Revenue with{" "}
              <span className="font-extrabold text-[#D32027] inline-block sm:inline whitespace-normal sm:whitespace-nowrap">
                Growth &amp; Marketing.
              </span>
            </motion.h1>

            {/* Sub-Headline Description without excessive blank margins */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-stone-600 font-normal text-base sm:text-lg leading-relaxed mb-7 max-w-2xl mx-auto"
            >
              From hyper-targeted B2B lead generation and precision ABM to high-converting email sequences, content authority, and sales enablement — engineered for scalable enterprise customer acquisition.
            </motion.p>

            {/* React Bits: Magnet CTA Buttons with Tight Alignment */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Magnet>
                <button
                  onClick={(e) => smoothScrollTo("consultation-form", e)}
                  className="group relative inline-flex items-center justify-center px-7 py-3.5 bg-[#D32027] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(211,32,39,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(211,32,39,0.5)] cursor-pointer w-full sm:w-auto"
                >
                  <BorderBeam duration={4} size={150} />
                  <span className="relative z-10 flex items-center justify-center">
                    Book Growth Strategy Session
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Magnet>

              <button
                onClick={(e) => smoothScrollTo("services-pillars", e)}
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs uppercase tracking-[0.15em] border border-stone-300 hover:border-stone-400 transition-colors cursor-pointer w-full sm:w-auto shadow-sm"
              >
                <span>Explore Core Pillars</span>
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- BENEFIT-FOCUSED VALUE PILLARS (REACT BITS SPOTLIGHT + CLOCKWISE GAUGE) --- */}
      <section className="py-12 sm:py-14 border-b border-stone-200 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-5 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#D32027]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
                  Business Impact
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Built for Measurable B2B Growth
              </h2>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm max-w-md mt-2 md:mt-0 font-medium">
              Practical, high-impact advantages engineered to strengthen your sales pipeline at every stage of the buyer journey.
            </p>
          </div>

          {/* Sharp Grid with React Bits SpotlightCard & Clockwise Radial Radar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitPillars.map((pillar) => (
              <SpotlightCard
                key={pillar.id}
                className="group bg-[#FDFCF8] border border-stone-200 p-6 md:p-7 flex flex-col justify-between hover:border-stone-900 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.02)] min-h-[260px]"
              >
                {/* Header: Clockwise Running Radial Gauge */}
                <div className="flex items-start justify-between gap-4 mb-5 relative z-20">
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    {/* SVG Base Track */}
                    <svg className="w-12 h-12 -rotate-90 transform" viewBox="0 0 48 48">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#E7E5E4"
                        strokeWidth="2.5"
                        fill="none"
                      />
                      {/* Clockwise running tracer ring */}
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#D32027"
                        strokeWidth="3"
                        strokeDasharray="32 94"
                        strokeLinecap="round"
                        fill="none"
                        style={{ animationDuration: pillar.duration }}
                        className="animate-[spin_linear_infinite] origin-center"
                      />
                    </svg>

                    {/* Clockwise pulsing center point */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-[#D32027] rounded-full animate-pulse" />
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-white text-stone-700 border border-stone-200">
                    {pillar.category}
                  </span>
                </div>

                {/* Benefit Pillar Title & Description */}
                <div className="relative z-20 mt-auto">
                  <h3 className="text-xl sm:text-[22px] font-extrabold text-stone-950 tracking-tight leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Sharp Center-Expanding Red Hairline on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D32027] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-30" />
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5 CORE GROWTH SERVICES (SHARP CARDS WITH SPOTLIGHT & BALANCED LAYOUT) --- */}
      <section id="services-pillars" className="py-20 md:py-28 relative scroll-mt-24">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-6 h-[2px] bg-[#D32027]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-stone-500">
                Core Capabilities
              </span>
              <span className="w-6 h-[2px] bg-[#D32027]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-stone-950 tracking-tight leading-tight">
              Five Pillars Built for <span className="font-extrabold text-[#D32027]">Scalable Pipeline</span>
            </h2>
            <p className="text-stone-600 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Every phase of your acquisition cycle, engineered with sharp data precision, high-touch personalization, and clean automation.
            </p>
          </div>

          {/* Sharp Alternating Cards List with Spotlight */}
          <div className="space-y-12 sm:space-y-16">
            {growthServices.map((service, index) => {
              const isEven = index % 2 === 1;
              const IconComponent = service.icon;

              return (
                <SpotlightCard
                  key={service.id}
                  className="group bg-white border border-stone-200 overflow-hidden shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                    
                    {/* Visual Image Column (5 Cols) with Sharp Framing */}
                    <div className={`relative min-h-[260px] sm:min-h-[340px] lg:min-h-full lg:col-span-5 overflow-hidden border-b lg:border-b-0 ${isEven ? "lg:order-2 lg:border-l border-stone-200" : "lg:order-1 lg:border-r border-stone-200"}`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>

                    {/* Content Column (7 Cols) with Clean Editorial Balance */}
                    <div className={`p-7 sm:p-9 lg:p-12 lg:col-span-7 flex flex-col justify-between relative z-20 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <div>
                        {/* Category & Title with Sharp Icon Badge */}
                        <div className="flex items-start gap-4 mb-5">
                          <div className="w-12 h-12 bg-stone-900 group-hover:bg-[#D32027] text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                            <IconComponent className="w-6 h-6" strokeWidth={1.75} />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-[#D32027] uppercase tracking-[0.2em] block mb-1">
                              {service.category}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                              {service.number}. {service.title}
                            </h3>
                          </div>
                        </div>

                        {/* Core Exact Description (User-Specified) */}
                        <p className="text-stone-700 text-base sm:text-[17px] leading-relaxed font-normal mb-7 border-l-2 border-[#D32027]/70 pl-4 py-0.5">
                          {service.desc}
                        </p>

                        {/* Deliverables List with Sharp Bullet Checkmarks */}
                        <div className="space-y-3 mb-8">
                          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 block mb-3">
                            Key Deliverables & Execution Scope
                          </span>
                          {service.deliverables.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-stone-700 text-sm sm:text-[14.5px] leading-snug">
                              <div className="w-4 h-4 bg-stone-100 border border-stone-300 text-[#D32027] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                              <span className="font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Sharp Actions Footer */}
                      <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
                        <Dialog
                          open={activeDialogId === service.id}
                          onOpenChange={(open) => {
                            setActiveDialogId(open ? service.id : null);
                            if (open) setSelectedService(service);
                          }}
                        >
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedService(service);
                                setActiveDialogId(service.id);
                              }}
                              className="inline-flex items-center justify-center px-5 py-3 bg-stone-950 hover:bg-[#D32027] text-white font-bold text-xs uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer w-full sm:w-auto"
                            >
                              <span>View Strategy Blueprint</span>
                            </button>
                          </DialogTrigger>

                          <DialogContent className="w-[94vw] sm:w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-white p-5 sm:p-7 md:p-8 border border-stone-300 rounded-none shadow-2xl">
                            <DialogHeader className="pr-8 sm:pr-0 text-left">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-stone-900 text-[#D32027] flex items-center justify-center shrink-0">
                                  <IconComponent className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D32027] block">
                                    Strategy Blueprint · Phase {service.number}
                                  </span>
                                  <DialogTitle className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight leading-tight">
                                    {service.title} Execution Model
                                  </DialogTitle>
                                </div>
                              </div>
                              <DialogDescription className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-1.5">
                                {service.deepDive.summary}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="my-5 sm:my-6 space-y-3">
                              <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400">
                                3-Phase Implementation Framework
                              </h4>
                              {service.deepDive.phases.map((ph, pIdx) => (
                                <div key={pIdx} className="p-3.5 sm:p-4 bg-stone-50 border border-stone-200 hover:border-stone-300 transition-colors">
                                  <div className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-2 mb-1">
                                    <span className="w-2 h-2 bg-[#D32027] shrink-0" />
                                    <span>Phase 0{pIdx + 1}: {ph.phase}</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-stone-600 pl-4 leading-relaxed font-normal">
                                    {ph.detail}
                                  </p>
                                </div>
                              ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-stone-200">
                              <span className="text-xs text-stone-500 text-center sm:text-left">
                                Ready to deploy this framework for your company?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleInquireFromDialog(service.number, service.title)}
                                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-[#D32027] hover:bg-[#b91c1c] text-white text-xs font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                              >
                                <span>Inquire for {service.title}</span>
                              </button>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <button
                          onClick={(e) => smoothScrollTo("consultation-form", e)}
                          className="inline-flex items-center text-stone-700 hover:text-[#D32027] text-xs font-bold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                        >
                          <span>Request Custom Scope</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Sharp Bottom Red Animated Hairline on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D32027] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-30" />
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 4-STEP REVENUE ARCHITECTURE --- */}
      <section className="py-20 md:py-24 bg-stone-900 text-white relative overflow-hidden border-t border-stone-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 bg-stone-800 border border-stone-700 text-red-400 font-bold text-[10px] uppercase tracking-[0.25em] inline-block mb-3">
              Repeatable Execution
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
              The Stalight <span className="font-extrabold text-[#D32027]">B2B Growth Operating System</span>
            </h2>
            <p className="text-stone-300 text-base sm:text-lg mt-4 font-light">
              We replace guesswork and inconsistent outbound with a calibrated four-stage pipeline process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {executionProcess.map((item, i) => (
              <SpotlightCard
                key={i}
                spotlightColor="rgba(255, 255, 255, 0.08)"
                className="p-8 bg-stone-800/90 border border-stone-700 hover:border-red-500/70 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative z-20">
                  <div className="text-3xl font-mono font-bold text-stone-500 group-hover:text-[#D32027] transition-colors mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">{item.summary}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-700/60 flex items-center justify-between text-[11px] text-stone-400 relative z-20">
                  <span className="uppercase tracking-wider">PHASE {item.step}</span>
                  <span className="w-1.5 h-1.5 bg-[#D32027]" />
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONSULTATION / STRATEGY INQUIRY FORM (WITH REACT BITS BORDER BEAM) --- */}
      <section id="consultation-form" className="py-20 md:py-28 bg-[#FDFCF8] scroll-mt-24">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="bg-white border border-stone-300 shadow-[0_16px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
            {/* Top Red Hairline Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D32027]" />

            <AnimatePresence mode="wait">
              {!isFormOpen ? (
                /* Initial CTA State */
                <motion.div
                  key="cta-card"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                  className="p-8 sm:p-14 text-center flex flex-col items-center justify-center min-h-[380px]"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-stone-100 border border-stone-200 text-stone-700 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                    <span className="w-1.5 h-1.5 bg-[#D32027]" />
                    <span>Direct Growth Consultation</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight mb-3">
                    Ready to Scale Your Sales Pipeline?
                  </h2>
                  <p className="text-stone-600 text-base sm:text-lg mb-7 max-w-2xl leading-relaxed">
                    Share your current target accounts and growth bottlenecks. Our B2B growth architects will engineer a custom outreach and revenue blueprint for your company.
                  </p>
                  <Magnet>
                    <button
                      onClick={() => setIsFormOpen(true)}
                      className="group relative inline-flex items-center justify-center px-9 py-4 bg-[#D32027] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-[0.15em] transition-all shadow-sm cursor-pointer"
                    >
                      <BorderBeam duration={5} size={150} />
                      <span className="relative z-10 flex items-center">
                        Request Strategy Session
                      </span>
                    </button>
                  </Magnet>
                </motion.div>
              ) : isSubmitted ? (
                /* Success Confirmation */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="p-10 sm:p-16 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-stone-900 mb-3">Growth Request Received</h3>
                  <p className="text-stone-600 text-base max-w-md mx-auto leading-relaxed">
                    Thank you. Our growth operations team will analyze your market profile and reach out within 1 business day with a tailored strategy roadmap.
                  </p>
                </motion.div>
              ) : (
                /* Form View */
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15, transition: { duration: 0.2 } }}
                  className="p-8 sm:p-12"
                >
                  <div className="flex justify-between items-start mb-8 pb-6 border-b border-stone-200">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D32027]">
                        Direct Consultation
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1 tracking-tight">
                        Tailored Growth Strategy
                      </h3>
                      <p className="text-sm text-stone-500 mt-1">
                        Please provide your business coordinates and primary growth requirements.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsFormOpen(false)}
                      className="p-2 bg-stone-100 hover:bg-stone-200 transition-colors text-stone-500 cursor-pointer"
                      aria-label="Close form"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Full Name <span className="text-[#D32027]">*</span>
                        </label>
                        <input
                          name="full_name"
                          type="text"
                          required
                          placeholder="e.g. Rachel Adams"
                          className="w-full px-4 py-3.5 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Work Email <span className="text-[#D32027]">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="rachel@enterprise.com"
                          className="w-full px-4 py-3.5 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Phone Number <span className="text-[#D32027]">*</span>
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3.5 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Company Name <span className="text-[#D32027]">*</span>
                        </label>
                        <input
                          name="company_name"
                          type="text"
                          required
                          placeholder="Acme Technologies"
                          className="w-full px-4 py-3.5 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Primary Service Pillar <span className="text-[#D32027]">*</span>
                        </label>
                        <select
                          name="service_required"
                          value={selectedServiceCategory}
                          onChange={(e) => setSelectedServiceCategory(e.target.value)}
                          required
                          className="w-full px-4 py-3.5 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm font-medium cursor-pointer"
                        >
                          <option value="1. B2B Lead Generation">1. B2B Lead Generation</option>
                          <option value="2. Account-Based Marketing">2. Account-Based Marketing (ABM)</option>
                          <option value="3. Email Marketing">3. Email Marketing</option>
                          <option value="4. Content Marketing">4. Content Marketing</option>
                          <option value="5. Sales Enablement">5. Sales Enablement</option>
                          <option value="Full-Funnel Suite">Integrated Full-Funnel Growth Suite</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                          Launch Timeline
                        </label>
                        <select
                          name="timeline"
                          defaultValue="immediate"
                          className="w-full px-4 py-3.5 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm font-medium cursor-pointer"
                        >
                          <option value="immediate">Immediate (Next 1-2 weeks)</option>
                          <option value="within-month">Within 30 Days</option>
                          <option value="next-quarter">Next Quarter Planning</option>
                        </select>
                      </div>
                    </div>

                    {/* Details */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                        Target Market & Revenue Objectives <span className="text-[#D32027]">*</span>
                      </label>
                      <textarea
                        name="details"
                        rows={3}
                        required
                        placeholder="Describe your ideal customer profile (e.g., enterprise colleges, fintech SaaS), current ACV, and major sales bottlenecks..."
                        className="w-full px-4 py-3 border border-stone-300 bg-stone-50 focus:bg-white focus:border-[#D32027] outline-none text-sm resize-none font-medium"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#D32027] hover:bg-[#b91c1c] text-white font-bold text-xs uppercase tracking-[0.15em] transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Strategy Request</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION (SHARP ACCORDION) --- */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="container mx-auto px-5 sm:px-6 max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D32027] block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-stone-200 bg-[#FDFCF8] transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 text-left font-bold text-base sm:text-lg text-stone-900 flex items-center justify-between gap-4 hover:text-[#D32027] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className={`text-stone-400 font-bold text-sm transition-transform duration-300 ${isOpen ? "rotate-180 text-[#D32027]" : ""}`}>
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-stone-600 text-sm sm:text-base leading-relaxed border-t border-stone-100 pt-3.5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GrowthMarketing;
