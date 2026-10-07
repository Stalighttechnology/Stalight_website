/**
 * Verified Knowledge Base for Stalight Technologies (stalight.in)
 * Used by the AI Voice Agent to provide accurate, grounded responses without hallucination.
 */

export interface KnowledgeItem {
  id: string;
  category: 'company' | 'product' | 'service' | 'feature' | 'pricing' | 'contact' | 'faq';
  title: string;
  summary: string;
  details: string;
  keywords: string[];
  route?: string;
  sectionId?: string;
}

export const STALIGHT_KNOWLEDGE_BASE: KnowledgeItem[] = [
  // --- Company ---
  {
    id: 'company-overview',
    category: 'company',
    title: 'About Stalight Technologies',
    summary: 'Stalight Technologies is a Bengaluru-based premier technology firm providing college ERP software, placement training platforms, custom software development, and IT solutions.',
    details: 'Based in Bengaluru, Karnataka, Stalight Technologies specializes in modernizing higher education institutions with AI-driven ERP and LMS platforms (Stalight Campus & Stalight Sync), while offering custom enterprise software engineering and career skill training.',
    keywords: ['stalight', 'company', 'about', 'who are you', 'what is stalight', 'bengaluru', 'bangalore', 'mission', 'vision', 'location'],
    route: '/about',
    sectionId: 'about',
  },
  {
    id: 'company-partners',
    category: 'company',
    title: 'Partner Institutions & Clients',
    summary: 'Stalight partners with prominent educational institutions including AMC Institution, City Engineering College, Dwi Nethra Educational Trust, TONTADARYA College of Engineering, Gleamator Technologies, Vyomaa, and Eduforcarriers.',
    details: 'Trusted by top colleges and organizations across Karnataka for campus digitalization, AI attendance, academic analytics, and student placement enablement.',
    keywords: ['partners', 'clients', 'colleges', 'institutions', 'amc', 'city engineering', 'tontadarya', 'dwinethra', 'gleamator', 'vyomaa', 'eduforcarrier', 'who uses'],
    route: '/about',
  },

  // --- Products ---
  {
    id: 'product-campus',
    category: 'product',
    title: 'Stalight Campus (College ERP)',
    summary: 'Stalight Campus is an all-in-one AI-driven College ERP and administration system featuring facial recognition attendance, fee management, academic analytics, NAAC/NBA compliance, and smart timetables.',
    details: 'Stalight Campus unifies institutional workflows. Key modules include AI Facial Recognition Attendance for instant student profiles, automated semester fee tracking, multi-level leave approvals, digital assignments, CO/PO outcome tracking for NAAC/NBA accreditation, and dedicated mobile apps on iOS and Android.',
    keywords: ['campus', 'stalight campus', 'college erp', 'erp', 'college management', 'university', 'attendance system', 'facial recognition', 'smart timetable', 'naac', 'nba', 'fees'],
    route: '/Stalight-Campus',
    sectionId: 'features',
  },
  {
    id: 'product-sync',
    category: 'product',
    title: 'Stalight Sync (LMS & Career Placement Platform)',
    summary: 'Stalight Sync is an intelligent LMS and Career Preparation platform providing AI-powered voice and coding mock interviews, LeetCode-style practice, assessment dashboards, and placement analytics.',
    details: 'Stalight Sync bridges academic learning with corporate readiness. It features AI-generated technical and HR voice interviews, live coding IDE challenges, automated score evaluation, Placement Readiness Index, and student leaderboards.',
    keywords: ['sync', 'stalight sync', 'lms', 'placement', 'interview', 'mock interview', 'coding', 'practice', 'aptitude', 'learning platform', 'jobs'],
    route: '/Stalight-Sync',
    sectionId: 'features',
  },

  // --- Features: Campus ---
  {
    id: 'feature-facial-attendance',
    category: 'feature',
    title: 'AI Facial Recognition Attendance',
    summary: 'Faculty and staff can instantly capture attendance and retrieve complete student academic records simply by scanning a face or uploading an image.',
    details: 'Our AI facial recognition provides anti-proxy security, instant student identification, real-time sync with master academic records, and automated shortage warnings.',
    keywords: ['facial recognition', 'face scan', 'attendance', 'proxy', 'biometric', 'scan face', 'instant attendance'],
    route: '/Stalight-Campus',
    sectionId: 'features',
  },
  {
    id: 'feature-fee-management',
    category: 'feature',
    title: 'Smart Fee Management',
    summary: 'Automated semester-wise billing, payment tracking, instant receipts, installment plans, and overdue alert notifications.',
    details: 'Integrated student billing with comprehensive financial reports, fine management, and parental fee portals.',
    keywords: ['fee', 'fees', 'fee management', 'payment', 'billing', 'semester fees', 'installments', 'receipts'],
    route: '/Stalight-Campus',
    sectionId: 'features',
  },
  {
    id: 'feature-assignments-timetable',
    category: 'feature',
    title: 'Assignments & Smart Timetable',
    summary: 'Digital assignment submission, automated deadline alerts, gradebooks, and dynamic conflict-free timetable scheduling.',
    details: 'Empowers faculty with rubric-based grading and offers students a mobile dashboard for assignment tracking and class timetables.',
    keywords: ['assignments', 'timetable', 'schedule', 'homework', 'submission', 'grading'],
    route: '/Stalight-Campus',
    sectionId: 'features',
  },
  {
    id: 'feature-accreditation-copo',
    category: 'feature',
    title: 'NAAC & NBA Accreditation Analytics',
    summary: 'Automated Course Outcome (CO) and Program Outcome (PO) mapping, attainment calculations, and one-click compliance reporting.',
    details: 'Reduces accreditation audit prep time from weeks to hours by dynamically compiling audit-ready criteria datasets.',
    keywords: ['naac', 'nba', 'accreditation', 'co po', 'attainment', 'compliance', 'audit'],
    route: '/Stalight-Campus',
    sectionId: 'features',
  },

  // --- Features: Sync ---
  {
    id: 'feature-mock-interviews',
    category: 'feature',
    title: 'AI Mock Interviews & Coding Lab',
    summary: 'Realistic AI voice, coding, and aptitude interview simulations with instant behavioral and technical feedback.',
    details: 'Students practice standard technical questions, system design concepts, and soft skills with real-time AI scoring and speech analysis.',
    keywords: ['mock interview', 'coding lab', 'ai interview', 'leetcode', 'voice interview', 'aptitude', 'technical round'],
    route: '/Stalight-Sync',
  },

  // --- Services ---
  {
    id: 'service-software-dev',
    category: 'service',
    title: 'Custom Software Development',
    summary: 'End-to-end bespoke web, mobile, and cloud software engineering tailored for businesses and institutions.',
    details: 'From scalable architectures and UI/UX design to modern full-stack web and cross-platform mobile apps.',
    keywords: ['software development', 'custom software', 'web development', 'mobile app', 'engineering', 'react', 'node', 'app building'],
    route: '/software-development',
    sectionId: 'estimate',
  },
  {
    id: 'service-it-services',
    category: 'service',
    title: 'IT Services & Cloud Infrastructure',
    summary: 'Enterprise cloud setup, DevOps pipelines, cybersecurity, IT assessments, and technical infrastructure support.',
    details: 'Stalight provides robust cloud management, continuous deployment, and digital transformation consulting.',
    keywords: ['it services', 'cloud', 'devops', 'infrastructure', 'security', 'it consulting', 'enterprise'],
    route: '/it-services',
    sectionId: 'services',
  },
  {
    id: 'service-skill-dev',
    category: 'service',
    title: 'Career Training & Skill Development',
    summary: 'Intensive, industry-aligned career bootcamps covering Full Stack Development, Data Science, AI/ML, and placement training.',
    details: 'Hands-on practical training taught by senior engineers with interview prep and direct recruitment pipeline access.',
    keywords: ['skill development', 'training', 'courses', 'bootcamp', 'full stack', 'data science', 'ai ml', 'placement training'],
    route: '/skill-development',
    sectionId: 'courses',
  },

  // --- Pricing / Access Plans ---
  {
    id: 'pricing-campus-plans',
    category: 'pricing',
    title: 'Stalight Campus Access Plans & Pricing',
    summary: 'Basic plan is ₹150 per student/year, Pro plan is ₹200 per student/year, and Advance enterprise plan is ₹250 per student/year. Custom plans are available for custom workflows.',
    details: 'Basic (₹150/student/year) covers core dashboards, timetables, and attendance. Pro (₹200/student/year) includes full exam suites, fee management, and assignments. Advance (₹250/student/year) adds Hostel (HMS), Transport, Library, and Outcome Based Education. Visit the live pricing page at https://campus.stalight.in/stalightcampus.',
    keywords: ['pricing', 'pricing page', 'plans', 'cost', 'access plan', 'basic', 'pro', 'advance', 'custom', 'how much', 'subscription', 'quote', 'stalightcampus', 'campus pricing', '150', '200', '250'],
    route: 'https://campus.stalight.in/stalightcampus',
  },

  // --- Contact & Demo ---
  {
    id: 'contact-demo-booking',
    category: 'contact',
    title: 'Book a Demo & Contact Stalight',
    summary: 'Institutions and businesses can schedule a live product demonstration or submit project inquiries directly through the website.',
    details: 'Fill out the demo request form on the Campus page or reach out via our contact section. We respond within 24 business hours.',
    keywords: ['demo', 'book demo', 'schedule demo', 'contact', 'reach out', 'call', 'email', 'get in touch', 'talk to sales'],
    route: '/#contact',
    sectionId: 'contact',
  }
];
