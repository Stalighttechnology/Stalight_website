/**
 * General Knowledge & Conversational Intelligence Base for Stalight Assistant
 * Contains verified knowledge, human-like dialogue responses, FAQs, educational concepts,
 * and conversational intelligence for all general and technical interactions.
 */

export interface GeneralKnowledgeItem {
  id: string;
  category: 'chitchat' | 'identity' | 'technology' | 'education' | 'career' | 'security' | 'faq';
  queryPatterns: string[];
  spokenResponse: string;
  displayResponse: string;
  followUpSuggestions?: string[];
  targetRoute?: string;
  targetSection?: string;
}

export const GENERAL_KNOWLEDGE_BASE: GeneralKnowledgeItem[] = [
  // ==========================================
  // 1. HUMAN INTERACTION & CHITCHAT
  // ==========================================
  {
    id: 'chitchat-how-are-you',
    category: 'chitchat',
    queryPatterns: [
      'how are you', 'how are you doing', 'how do you do', 'how is it going',
      'how are things', 'how is your day', 'are you doing good', 'whats up', "what's up"
    ],
    spokenResponse: "I'm doing great, thank you for asking! How can I assist you with Stalight today?",
    displayResponse: "I'm doing fantastic, thanks for asking! 😊\n\nHow can I help you today? You can ask me about:\n• Stalight Campus (AI College ERP)\n• Stalight Sync (Placement & Mock Interviews)\n• Pricing & Access Plans\n• Booking a live demo",
    followUpSuggestions: ["Show products", "What is Stalight Campus?", "Book a demo"],
  },
  {
    id: 'identity-who-are-you',
    category: 'identity',
    queryPatterns: [
      'who are you', 'what is your name', 'introduce yourself', 'tell me about yourself',
      'what are you', 'are you an ai', 'are you human or ai', 'what can you do'
    ],
    spokenResponse: "I am the Stalight AI Assistant. I help you navigate the website, explore our college ERP and LMS platforms, check pricing, and book product demos.",
    displayResponse: "Hello! I am the Stalight AI Voice Assistant 🎙️\n\nI can help you:\n• Explore Stalight Campus ERP & Stalight Sync LMS\n• View transparent pricing tiers (Basic, Pro, Advance)\n• Navigate pages and sections hands-free\n• Fill out demo booking requests\n• Answer questions about our technology and company",
    followUpSuggestions: ["What is Stalight Campus?", "Show pricing plans", "Book a demo"],
  },
  {
    id: 'identity-who-made-you',
    category: 'identity',
    queryPatterns: [
      'who made you', 'who created you', 'who built you', 'who is your creator',
      'who developed you', 'who owns stalight', 'who is the founder', 'founder of stalight'
    ],
    spokenResponse: "I was built by the engineering team at Stalight Technologies in Bengaluru to give you a seamless voice-first experience.",
    displayResponse: "Built by Stalight Technologies 🚀\n\nDeveloped by our engineering and AI innovation team in Bengaluru, Karnataka, India to provide an intelligent, hands-free experience for exploring our platforms.",
    targetRoute: '/about',
    followUpSuggestions: ["About Stalight Technologies", "View our institutional partners"],
  },
  {
    id: 'chitchat-greetings',
    category: 'chitchat',
    queryPatterns: [
      'good morning', 'good afternoon', 'good evening', 'good day', 'morning', 'afternoon', 'evening'
    ],
    spokenResponse: "Good day! Welcome to Stalight Technologies. What would you like to explore today?",
    displayResponse: "Good day! ☀️ Welcome to Stalight Technologies.\n\nHow can I assist you today? Let me know if you'd like a tour of Stalight Campus, Sync, or our pricing plans.",
    followUpSuggestions: ["What is Stalight Campus?", "Show pricing", "Book a demo"],
  },
  {
    id: 'chitchat-thanks',
    category: 'chitchat',
    queryPatterns: [
      'thank you', 'thanks', 'thanks a lot', 'thank you so much', 'appreciate it',
      'many thanks', 'great help', 'awesome thanks', 'thank u'
    ],
    spokenResponse: "You're very welcome! Let me know if there's anything else I can help you with.",
    displayResponse: "You're very welcome! Glad I could help. 😊\n\nFeel free to ask more questions anytime, or say 'Hey Stalight' whenever you need assistance.",
    followUpSuggestions: ["Book a demo", "Explore Stalight Sync", "Go to home page"],
  },
  {
    id: 'chitchat-goodbye',
    category: 'chitchat',
    queryPatterns: [
      'bye', 'goodbye', 'see you', 'see you later', 'take care', 'talk to you later', 'have a good day', 'exit'
    ],
    spokenResponse: "Goodbye! Have a wonderful day, and feel free to reach out anytime.",
    displayResponse: "Goodbye! Have a great day ahead! 👋\n\nReach out to us anytime at support@stalight.in or call +91 91105 51102.",
    followUpSuggestions: ["Contact support", "Book a demo"],
  },
  {
    id: 'chitchat-joke',
    category: 'chitchat',
    queryPatterns: [
      'tell me a joke', 'tell me something funny', 'make me laugh', 'tech joke', 'programming joke'
    ],
    spokenResponse: "Why do programmers prefer dark mode? Because light attracts bugs!",
    displayResponse: "Here's one for you 😄:\n\n*Why do programmers prefer dark mode?*\n*Because light attracts bugs!* 🐛💻\n\nCan I help you explore our ERP or LMS features next?",
    followUpSuggestions: ["What is Stalight Campus?", "What is Stalight Sync?"],
  },
  {
    id: 'chitchat-languages',
    category: 'chitchat',
    queryPatterns: [
      'what languages do you speak', 'can you speak hindi', 'can you speak kannada',
      'languages supported', 'do you know kannada', 'do you know hindi'
    ],
    spokenResponse: "I am optimized for English with specialized support for Indian accents and local institution terminology. We are also expanding multilingual voice models!",
    displayResponse: "Language Support 🌐\n\nCurrently optimized for Indian and Global English with accent tolerance for South Asian dialects. Native Kannada and Hindi voice models are coming soon to Stalight Campus!",
    followUpSuggestions: ["What is Stalight Campus?", "Explore Stalight Sync"],
  },

  // ==========================================
  // 2. EDUCATION & ERP COMPARISON INTELLIGENCE
  // ==========================================
  {
    id: 'edu-why-stalight',
    category: 'education',
    queryPatterns: [
      'why choose stalight', 'why stalight', 'why should colleges choose stalight',
      'advantages of stalight', 'why stalight over others', 'benefits of stalight campus',
      'why is stalight better'
    ],
    spokenResponse: "Colleges choose Stalight because we combine AI facial attendance, automated accreditation analytics, and modern mobile apps into a unified, high-speed platform.",
    displayResponse: "Why Colleges Choose Stalight 🏆\n\n1. AI-First Architecture: Instant facial recognition attendance with anti-proxy security.\n2. Accreditation Automation: Automated NAAC & NBA CO-PO mapping and 1-click audit reports.\n3. Modern UX: Lightning-fast cloud platform with zero legacy bloat and native mobile apps.\n4. Integrated Ecosystem: ERP for college operations + LMS (Sync) for placement preparation in one place.\n5. Transparent Pricing: Starting at just ₹150 per student/year.",
    targetRoute: '/Stalight-Campus',
    followUpSuggestions: ["See pricing plans", "Book a live demo", "What is Stalight Campus?"],
  },
  {
    id: 'edu-erp-vs-lms',
    category: 'education',
    queryPatterns: [
      'difference between erp and lms', 'erp vs lms', 'what is difference between campus and sync',
      'compare erp and lms', 'how is erp different from lms'
    ],
    spokenResponse: "An ERP like Stalight Campus manages college administration like attendance, fees, and timetables. An LMS like Stalight Sync manages student learning, mock interviews, and placement prep.",
    displayResponse: "ERP vs LMS Comparison 🏛️ ↔️ 💡\n\n• Stalight Campus (ERP): Handles institutional governance — AI facial attendance, fee collection, semester exams, smart timetables, and NAAC/NBA compliance.\n\n• Stalight Sync (LMS): Focuses on student skill advancement — AI voice mock interviews, live coding practice labs, assessment tests, and Placement Readiness scores.",
    targetRoute: '/',
    sectionId: 'products',
    followUpSuggestions: ["Explore Stalight Campus", "Explore Stalight Sync", "Show pricing"],
  },
  {
    id: 'edu-facial-recognition-tech',
    category: 'technology',
    queryPatterns: [
      'how does facial recognition work', 'how does face attendance work', 'is face recognition accurate',
      'how does facial attendance work', 'biometric accuracy', 'proxy attendance prevention'
    ],
    spokenResponse: "Our AI facial attendance uses computer vision with liveness detection to verify student faces in under a second and prevent proxy check-ins.",
    displayResponse: "AI Facial Recognition Technology 👤⚡\n\n• Sub-Second Recognition: High-speed neural embeddings match faces in real time.\n• Liveness & Anti-Proxy: Prevents fraud using 2D/3D liveness detection and photo-spoof filtering.\n• Instant Student Profile: Scanning a face immediately brings up attendance history, academic marks, and fee status.\n• Shortage Warnings: Automated alerts when a student falls below required attendance thresholds.",
    targetRoute: '/Stalight-Campus',
    sectionId: 'features',
    followUpSuggestions: ["What is Stalight Campus?", "Book a demo"],
  },
  {
    id: 'edu-accreditation-obe',
    category: 'education',
    queryPatterns: [
      'what is obe', 'what is outcome based education', 'what is co po mapping',
      'how does naac reporting work', 'nba accreditation tool', 'what is co attainment'
    ],
    spokenResponse: "Outcome Based Education links classroom assessments to Course Outcomes and Program Outcomes. Stalight Campus calculates attainment scores automatically for NAAC and NBA audits.",
    displayResponse: "Outcome Based Education (OBE) & Accreditation 🎓\n\n• Course Outcome (CO) Mapping: Maps exam questions and assignments directly to syllabus goals.\n• Program Outcome (PO) Attainment: Automatically computes direct and indirect attainment formulas.\n• 1-Click Audit Reports: Produces audit-ready tables and compliance charts for NAAC & NBA committees in minutes instead of weeks.",
    targetRoute: '/Stalight-Campus',
    sectionId: 'features',
    followUpSuggestions: ["Show Advance plan pricing", "Book an accreditation walkthrough"],
  },
  {
    id: 'edu-data-security',
    category: 'security',
    queryPatterns: [
      'is data safe', 'is student data secure', 'how secure is stalight', 'data privacy security',
      'gdpr compliance', 'data encryption stalight', 'is my data protected'
    ],
    spokenResponse: "Yes, Stalight uses enterprise AES-256 encryption, role-based access control, and strict zero-reselling policies to keep student and college data safe.",
    displayResponse: "Enterprise Data Security & Privacy 🛡️\n\n• End-to-End Encryption: Sensitive records and facial biometric templates are encrypted with AES-256.\n• Role-Based Access: Strict access boundaries between Students, Faculty, HODs, and Principals.\n• Zero Data Reselling: Your institutional data belongs to you and is never shared or commercialized.\n• Data Localization: Compliant with Indian Data Protection Regulations and GDPR principles.",
    targetRoute: '/privacy',
    followUpSuggestions: ["View Privacy Policy", "Terms of Service"],
  },
  {
    id: 'edu-hardware-integration',
    category: 'technology',
    queryPatterns: [
      'can stalight integrate with biometric', 'biometric machine integration', 'rfid integration',
      'hardware integration', 'integrate existing systems', 'excel import data'
    ],
    spokenResponse: "Yes, Stalight integrates seamlessly with existing biometric hardware, RFID smart cards, and legacy database Excel exports via our open API connectors.",
    displayResponse: "Hardware & System Integration 🔌\n\n• Biometric & RFID Devices: Connects with existing fingerprint and smart card readers.\n• Legacy Migration: 1-click import of existing student rosters and historical marks from Excel or SQL databases.\n• RESTful APIs: Open webhooks for library turnstiles, payment gateways, and university portals.",
    targetRoute: '/Stalight-Campus',
    followUpSuggestions: ["Book a technical demo", "Contact support"],
  },
  {
    id: 'career-hiring-internships',
    category: 'career',
    queryPatterns: [
      'how to apply for job', 'internship at stalight', 'hiring at stalight', 'careers stalight',
      'work at stalight', 'job openings', 'how to join stalight'
    ],
    spokenResponse: "You can apply for engineering, AI, and design roles or internships by emailing your resume to careers@stalight.in or support@stalight.in.",
    displayResponse: "Careers & Internships at Stalight 💼\n\nWe are always looking for passionate software engineers, AI researchers, and UI/UX designers!\n\n• Email your resume/portfolio to: careers@stalight.in or support@stalight.in\n• Locations: Bengaluru, Karnataka (On-site & Hybrid)\n• Roles: Full Stack Developers, AI/ML Engineers, Product Designers, Campus Relations",
    targetRoute: '/about',
    followUpSuggestions: ["Verify certificate or offer letter", "Contact support"],
  },
  {
    id: 'tech-stack-stalight',
    category: 'technology',
    queryPatterns: [
      'what tech stack do you use', 'technologies used in stalight', 'what technology is stalight built with',
      'architecture of stalight', 'is stalight cloud based'
    ],
    spokenResponse: "Stalight is built with modern cloud-native technologies including React, TypeScript, Node.js, Python AI microservices, and high-performance PostgreSQL.",
    displayResponse: "Stalight Technology Stack 💻⚡\n\n• Frontend: React 18, TypeScript, TailwindCSS, Framer Motion\n• Backend & Cloud: Node.js, Python AI Services, Serverless APIs\n• Database: PostgreSQL with Supabase real-time subscriptions\n• Mobile: Native iOS (Swift) & Android (Kotlin)\n• AI & Vision: Computer Vision face recognition models, Web Audio synthesis, and NLP Intent Engines",
    targetRoute: '/software-development',
    followUpSuggestions: ["Tell me about custom software development", "IT Services"],
  },

  // ==========================================
  // 3. FAQS & BILLING POLICIES
  // ==========================================
  {
    id: 'faq-upgrade-downgrade',
    category: 'faq',
    queryPatterns: [
      'can i upgrade or downgrade my plan anytime', 'can i upgrade anytime', 'upgrade plan', 'downgrade plan',
      'change plan', 'switch plan', 'can we change plans later'
    ],
    spokenResponse: "Yes, you can upgrade or downgrade your plan at any time. Adjustments are seamlessly prorated to your billing cycle.",
    displayResponse: "Plan Upgrades & Downgrades 🔄\n\nYes! You can upgrade from Basic to Pro or Advance anytime your institution needs additional modules. Price adjustments are automatically prorated to your academic year billing cycle.",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["Show Basic plan", "Show Pro plan", "Show Advance plan"],
  },
  {
    id: 'faq-custom-plans',
    category: 'faq',
    queryPatterns: [
      'do you offer custom plans for enterprise institutions', 'custom plans for enterprise',
      'enterprise plan details', 'custom pricing for university', 'bespoke erp'
    ],
    spokenResponse: "Yes! Our Custom plan is designed for large institutions requiring tailored ERP workflows, custom role permissions, dedicated database hosting, and 24/7 priority SLAs.",
    displayResponse: "Custom Enterprise Solutions 🏛️\n\nFor universities and group institutions needing bespoke capabilities:\n• Custom ERP Modules & Workflows\n• Institution-Specific Features & Portals\n• Custom Roles & Permissions\n• Dedicated Database & Private Cloud Hosting\n• 24/7 Priority Support & Enterprise SLA",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["Contact Sales", "Book a demo"],
  },
  {
    id: 'faq-payment-methods',
    category: 'faq',
    queryPatterns: [
      'what payment methods do you accept', 'payment methods', 'how to pay', 'payment options',
      'can we pay via neft', 'do you accept upi or po'
    ],
    spokenResponse: "We accept all standard institutional payment methods including Net Banking, NEFT, RTGS, UPI, Corporate Credit Cards, and official Purchase Orders.",
    displayResponse: "Accepted Payment Methods 💳\n\n• Bank Transfer: NEFT / RTGS / IMPS\n• Institutional Purchase Orders (PO) & Invoices\n• Corporate Cards & Net Banking\n• Instant UPI for quick renewals",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["View pricing tiers", "Contact sales"],
  },
  {
    id: 'faq-contract-length',
    category: 'faq',
    queryPatterns: [
      'is there a minimum contract length', 'contract length', 'contract duration', 'minimum commitment',
      'is it annual or monthly', 'annual billing'
    ],
    spokenResponse: "Our plans are billed on an annual per-student basis to match the academic calendar. Multi-year enterprise agreements with volume discounts are also available.",
    displayResponse: "Contract Terms & Duration ⏱️\n\n• Standard Term: Annual billing (per student / year) aligned with the academic calendar.\n• Flexible Scaling: Add new student seats or departments mid-year with prorated billing.\n• Multi-Year Contracts: Available with locked pricing and enterprise volume discounts.",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["See pricing plans", "Book a demo"],
  },
  {
    id: 'faq-training-support',
    category: 'faq',
    queryPatterns: [
      'do you provide training and support', 'training and support', 'onboarding support',
      'staff training', 'faculty training', 'customer support'
    ],
    spokenResponse: "Yes, all plans include complete onboarding support from our team, along with dedicated training sessions for faculty, administrators, and students.",
    displayResponse: "Training & Onboarding Support 🤝\n\n• Full Onboarding: Guided setup for student rosters, faculty roles, and timetables.\n• Staff & Faculty Training: Interactive training sessions and quick-start video guides.\n• Dedicated Support: Multi-channel support via email, phone, and priority enterprise ticketing.",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["Book a demo", "Contact support"],
  },
  {
    id: 'faq-free-trial',
    category: 'faq',
    queryPatterns: [
      'free trial', 'is there a free trial', 'trial period', '14 day trial', 'test before buying',
      'can i try for free'
    ],
    spokenResponse: "Yes, all Stalight Campus plans come with a 14-day free trial and full onboarding support so your institution can test all features risk-free.",
    displayResponse: "14-Day Free Trial ✨\n\nEvery Stalight Campus plan (Basic, Pro, Advance) includes a 14-day risk-free trial with full onboarding support from our expert team. Start with any plan and upgrade anytime!",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["Start free trial", "Explore Pro plan", "Book a demo"],
  },
  {
    id: 'faq-feature-comparison',
    category: 'faq',
    queryPatterns: [
      'feature comparison', 'compare all plans', 'compare plans', 'difference between plans',
      'matrix comparison', 'which plan is right for me'
    ],
    spokenResponse: "Basic covers attendance and timetables at 150 rupees. Pro adds exams, marks, and fees at 200 rupees. Advance adds hostel, transport, library, and OBE at 250 rupees per student per year.",
    displayResponse: "Plan Comparison Matrix 📊\n\n• Basic (₹150): Dashboards, Attendance (Student/Faculty/HOD), Timetables, Announcements, Staff Enrollment, Core Billing.\n• Pro (₹200 - Most Popular): Everything in Basic + Exam Suite, Student Marks, Fee & Finance Management, Class Scheduling, Leave Workflows, COE & Fees Roles.\n• Advance (₹250 - Enterprise): Everything in Pro + Hostel Management (HMS), Transport & Fleet Tracking, Library Catalog, Admissions Matrix, Outcome Based Education (CO Attainment).\n• Custom: Bespoke ERP Modules, Dedicated Hosting & 24/7 SLA.",
    targetRoute: '/Stalight-Campus-Access',
    followUpSuggestions: ["Show Basic plan", "Show Pro plan", "Show Advance plan", "Book a demo"],
  },

  // ==========================================
  // 4. CONVERSATIONAL REPAIR & ACTIVE LISTENING
  // ==========================================
  {
    id: 'chitchat-active-listening',
    category: 'chitchat',
    queryPatterns: [
      'i said', 'what i said', 'did you hear me', 'can you hear me', 'listen to me', 'listen',
      'are you listening', 'i just said', 'i am saying', 'i told you'
    ],
    spokenResponse: "I am listening closely! How can I assist you? You can ask about our pricing plans, Stalight Campus features, Stalight Sync, or book a live demo.",
    displayResponse: "I'm right here and listening! 👂🎙️\n\nWhat would you like to explore?\n• Pricing Plans (Basic ₹150, Pro ₹200, Advance ₹250)\n• Stalight Campus ERP Features\n• Stalight Sync Placement Training\n• Book a live walkthrough demo",
    followUpSuggestions: ["Show pricing plans", "What is Stalight Campus?", "Book a demo"],
  },
];

/**
 * Searches the general knowledge base for human interaction queries
 */
export function searchGeneralKnowledge(query: string): GeneralKnowledgeItem | null {
  const cleanQuery = query.toLowerCase().trim();
  const words = cleanQuery.split(/\s+/).filter((w) => w.length > 2);
  let bestMatch: GeneralKnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of GENERAL_KNOWLEDGE_BASE) {
    let score = 0;
    for (const pattern of item.queryPatterns) {
      const cleanPattern = pattern.toLowerCase().trim();

      // Exact phrase match
      if (cleanQuery === cleanPattern) {
        score += 15;
      } else if (cleanQuery.includes(cleanPattern)) {
        score += 10;
      } else {
        // Token overlap
        const patternWords = cleanPattern.split(/\s+/);
        let matchCount = 0;
        for (const pw of patternWords) {
          if (pw.length > 2 && words.includes(pw)) {
            matchCount++;
          }
        }
        if (matchCount >= 2 && matchCount >= patternWords.length - 1) {
          score += 6;
        }
      }
    }

    if (score > highestScore && score >= 6) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}
