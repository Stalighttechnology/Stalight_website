/**
 * Verified Knowledge Base for Stalight Technologies (stalight.in)
 * Used by the AI Voice Agent to provide accurate, grounded responses without hallucination.
 */

export interface KnowledgeItem {
  id: string;
  category: 'company' | 'product' | 'service' | 'feature' | 'pricing' | 'contact' | 'verification' | 'policy' | 'faq';
  title: string;
  summary: string;
  spokenSummary: string;
  details: string;
  keywords: string[];
  route: string;
  sectionId?: string;
  relatedQuestions?: string[];
}

export const STALIGHT_KNOWLEDGE_BASE: KnowledgeItem[] = [
  // ==========================================
  // 1. COMPANY & INSTITUTION OVERVIEW
  // ==========================================
  {
    id: 'company-overview',
    category: 'company',
    title: 'About Stalight Technologies',
    summary: 'Stalight Technologies is a premier software company headquartered in Bengaluru, India. We engineer AI-powered campus ERP systems (Stalight Campus), placement training platforms (Stalight Sync), custom enterprise software, and industry skill bootcamps.',
    spokenSummary: 'Stalight Technologies is based in Bengaluru. We build smart college ERP systems, placement prep platforms, and custom enterprise software.',
    details: 'Headquarters: Bengaluru, Karnataka, India\nSpecialization: Higher Education ERP & LMS Modernization, Custom Software Engineering, Cloud Architecture & IT Consulting.\nMission: Empower colleges and enterprises with high-performance, AI-driven digital ecosystems that automate operations and accelerate careers.',
    keywords: [
      'stalight', 'stalight technologies', 'company', 'about', 'who are you', 'what is stalight',
      'bengaluru', 'bangalore', 'mission', 'vision', 'location', 'headquarters', 'about us', 'company details'
    ],
    route: '/about',
    sectionId: 'about',
    relatedQuestions: ['What products do you build?', 'Where is Stalight located?', 'Who are your partners?'],
  },
  {
    id: 'company-partners',
    category: 'company',
    title: 'Institutional Partners & Clients',
    summary: 'Stalight partners with prominent universities and colleges including AMC Institution, City Engineering College, Dwi Nethra Educational Trust, TONTADARYA College of Engineering, Gleamator Technologies, Vyomaa, Surya, and Eduforcarriers.',
    spokenSummary: 'We partner with top institutions including AMC Institution, City Engineering College, Dwi Nethra Educational Trust, and TONTADARYA College of Engineering.',
    details: 'Trusted across Karnataka and India for campus digitalization, AI facial attendance, exam grading, NAAC/NBA compliance, and student placement enablement.\nKey Partners:\n• AMC Institution\n• City Engineering College\n• Dwi Nethra Educational Trust\n• TONTADARYA College of Engineering (TCE)\n• Gleamator Technologies\n• Vyomaa\n• Eduforcarriers',
    keywords: [
      'partners', 'clients', 'colleges', 'institutions', 'amc', 'amc institution', 'city engineering',
      'city engineering college', 'tontadarya', 'tce', 'dwinethra', 'dwi nethra', 'gleamator',
      'vyomaa', 'eduforcarrier', 'who uses stalight', 'client list', 'customer list'
    ],
    route: '/about',
    relatedQuestions: ['Tell me about Stalight Campus', 'How can our college partner with Stalight?'],
  },
  {
    id: 'contact-info',
    category: 'contact',
    title: 'Contact Information & Support',
    summary: 'Reach Stalight Technologies at support@stalight.in or business@stalight.in, call +91 91105 51102, or visit our Bengaluru headquarters.',
    spokenSummary: 'You can reach us at support@stalight.in, call plus nine one, nine one one zero five, five one one zero two, or submit a message through the contact form.',
    details: '• Email Support: support@stalight.in\n• Business Inquiries: business@stalight.in\n• Phone: +91 91105 51102\n• Office: Bengaluru, Karnataka, India\n• Working Hours: Monday - Friday, 9:00 AM - 6:00 PM IST',
    keywords: [
      'contact', 'phone', 'email', 'support', 'call', 'number', 'phone number', 'contact number',
      'location', 'office', 'bengaluru office', 'address', 'reach out', 'talk to sales', 'help desk'
    ],
    route: '/#contact',
    sectionId: 'contact',
    relatedQuestions: ['Book a live product demo', 'Where is your office located?'],
  },
  {
    id: 'company-careers',
    category: 'company',
    title: 'Careers & Life at Stalight',
    summary: 'Join Stalight Technologies to build state-of-the-art educational ERP, LMS platforms, and enterprise software. We foster high ownership, cutting-edge tech stacks, and rapid growth.',
    spokenSummary: 'We are always looking for passionate builders, designers, and engineers to join Stalight. Explore our open roles and engineering culture.',
    details: 'Life at Stalight Technologies:\n• High ownership culture building high-scale campus ERP and AI systems\n• Modern tech stacks (React, TypeScript, Next.js, Node.js, AI/ML models)\n• Open roles across Frontend, Backend, AI/ML, and Technical Training\n• Career Bootcamps and industry mentorship for students and graduates\n• Reach out to business@stalight.in to apply or explore opportunities.',
    keywords: [
      'careers', 'career', 'jobs', 'hiring', 'openings', 'work with us', 'join us',
      'join stalight', 'go to careers', 'go to career', 'career page', 'careers page',
      'work at stalight', 'internships', 'job openings', 'apply for job',
      'opportunity', 'opportunities', 'what opportunities', 'what in the opportunities',
      'what opportunities i get', 'what the careers i get', 'roles', 'positions', 'vacancies',
      'fresher jobs', 'internship opportunities'
    ],
    route: '/',
    sectionId: 'careers',
    relatedQuestions: ['Tell me about Career Training', 'What products do you build?', 'Contact support'],
  },

  // ==========================================
  // 2. FLAGSHIP PRODUCTS
  // ==========================================
  {
    id: 'products-overview',
    category: 'product',
    title: 'Stalight Products & Platforms Overview',
    summary: 'Stalight Technologies offers two flagship educational platforms: Stalight Campus (AI College ERP) and Stalight Sync (LMS & Career Preparation).',
    spokenSummary: 'Stalight offers two flagship platforms: Stalight Campus for college ERP, and Stalight Sync for placement training.',
    details: 'Stalight Flagship Products:\n\n1. Stalight Campus (AI College ERP)\n• AI Facial Recognition Attendance & Anti-Proxy Security\n• Dynamic Clash-Free Timetables & Scheduling\n• Semester Fee Management, Online Billing & Receipts\n• Digital Assignments, Exam Suite & NAAC/NBA Accreditation\n• Dedicated Mobile Apps on iOS & Android\n\n2. Stalight Sync (LMS & Career Placement Platform)\n• AI Mock Technical & HR Voice Interviews\n• Live Coding Practice Lab with LeetCode-style Challenges\n• Placement Readiness Index (PRI) & Batch Analytics\n\nWhich product would you like to explore?',
    keywords: [
      'product', 'products', 'what products', 'what are the products', 'all products',
      'show products', 'products list', 'what do you offer', 'what do they have',
      'what are the products they have', 'what products they have', 'flagship products',
      'offerings', 'solutions', 'platforms', 'tools'
    ],
    route: '/',
    sectionId: 'products',
    relatedQuestions: ['Tell me about Stalight Campus', 'Tell me about Stalight Sync', 'Show pricing'],
  },
  {
    id: 'product-campus',
    category: 'product',
    title: 'Stalight Campus — AI College ERP System',
    summary: 'Stalight Campus is an intelligent, all-in-one College ERP platform. It automates facial recognition attendance, smart clash-free timetables, semester fee management, digital assignments, student and faculty portals, and NAAC/NBA accreditation compliance.',
    spokenSummary: 'Stalight Campus is our college ERP platform. It manages facial attendance, timetables, fees, exams, and accreditation all in one place.',
    details: 'Key Modules & Capabilities:\n• AI Facial Recognition Attendance: Real-time scan with anti-proxy verification and instant academic profile lookup.\n• Smart Timetable & Scheduling: Conflict-free scheduling with automated faculty substitution.\n• Fee Management & Billing: Semester-wise invoicing, receipts, installment tracking, and overdue alerts.\n• Examination & Results Suite: Continuous evaluation, internal assessments, and gradebook analytics.\n• Digital Assignments Dashboard: Online submission, deadline reminders, and rubric-based grading.\n• Multi-Level Leave Approvals: Hierarchical request flow for students, faculty, HODs, and principals.\n• NAAC / NBA Accreditation: Automated Course Outcome (CO) and Program Outcome (PO) mapping and audit reporting.\n• Mobile App Access: Native iOS and Android apps for students and professors.',
    keywords: [
      'campus', 'stalight campus', 'college erp', 'erp', 'college management', 'university erp',
      'attendance system', 'facial recognition attendance', 'smart timetable', 'naac', 'nba',
      'fees management', 'student portal', 'faculty portal', 'leave management', 'exam suite'
    ],
    route: '/Stalight-Campus',
    sectionId: 'features',
    relatedQuestions: ['What are the pricing plans for Campus?', 'How does facial recognition attendance work?', 'Book a Campus demo'],
  },
  {
    id: 'product-sync',
    category: 'product',
    title: 'Stalight Sync — LMS & Career Placement Platform',
    summary: 'Stalight Sync is an intelligent LMS and Career Acceleration platform featuring AI-powered voice mock interviews, LeetCode-style live coding practice labs, automated assessment scoring, and Placement Readiness Index analytics.',
    spokenSummary: 'Stalight Sync is our placement platform with AI mock interviews, live coding practice, and skill tracking to get students job-ready.',
    details: 'Core Features of Stalight Sync:\n• AI Mock Interviews: Voice-based technical and HR interview simulations with real-time feedback and speech analysis.\n• Live Coding Practice Lab: Browser IDE supporting multiple programming languages, test cases, and algorithmic benchmarks.\n• Placement Readiness Index (PRI): Comprehensive scoring combining coding ability, communication skills, and aptitude.\n• Assessment & Screening Dashboard: Centralized dashboard for placement directors to automate pre-drive screening.\n• Student Leaderboards & Batches: Gamified skill tracking and batch-wide ranking comparisons.',
    keywords: [
      'sync', 'sink', 'synk', 'stalight sync', 'stalight sink', 'neurosync', 'neuro sync', 'neuro sink',
      'lms', 'placement', 'interview', 'mock interview', 'coding',
      'practice', 'aptitude', 'learning platform', 'jobs', 'career preparation', 'pri',
      'placement readiness index', 'coding lab', 'technical interview'
    ],
    route: '/Stalight-Sync',
    sectionId: 'features',
    relatedQuestions: ['Tell me about AI mock interviews', 'How does Sync help placement directors?'],
  },

  // ==========================================
  // 3. PRICING & ACCESS PLANS
  // ==========================================
  {
    id: 'pricing-campus-overview',
    category: 'pricing',
    title: 'Stalight Campus Pricing & Access Plans',
    summary: 'Scale seamlessly with Enterprise Intelligence. Stalight Campus offers tiered pricing: Basic (₹150/student/year), Pro (₹200/student/year - Recommended), Advance (₹250/student/year - Enterprise), and Custom plans. All plans include a 14-day free trial.',
    spokenSummary: 'Our Campus plans start at 150 rupees per student yearly for Basic, 200 for Pro, and 250 for Advance. All plans include a 14-day free trial.',
    details: 'Scale seamlessly with Enterprise Intelligence 🏷️\n\n• Basic Plan (₹150 / student / year — Start your journey):\n  Dashboards & Profiles, Timetables & Syllabus Tracking, Real-time Attendance (Student, Faculty, HOD), Basic Announcements, Organization & Staff Enrollment, Core Billing & Plans.\n\n• Pro Plan (₹200 / student / year — Elevate your campus — Most Popular):\n  Complete Exam Suite & Results, Student Marks & Study Materials, Full Fee & Finance Management, Class Scheduling & Assignments, Leave Workflows, Automated Faculty Bulk Uploads, Dedicated COE & Fees Roles, Everything in Basic.\n\n• Advance Plan (₹250 / student / year — The future of education — Enterprise):\n  Hostel Management System (HMS), Comprehensive Transport & Fleet Tracking, Full Library Administration, Admissions & Seat Matrix, Outcome Based Education (CO Attainment), Department Admin Leaves, Everything in Pro.\n\n• Custom Plan (Tailored Pricing — Build your perfect system):\n  Custom ERP Modules & Workflows, Institution-Specific Features, Custom Roles & Permissions, Dedicated Database & Hosting, 24/7 Priority Support & SLA.\n\n✨ All plans include a 14-day free trial and full onboarding support from our expert team.',
    keywords: [
      'pricing', 'price', 'pricing page', 'plans', 'cost', 'access plan', 'basic plan', 'pro plan',
      'advance plan', 'custom plan', 'how much', 'subscription', 'rate', 'rates', '150', '200', '250',
      'stalightcampus', 'campus pricing', 'free trial', '14 day free trial', 'trial'
    ],
    route: '/Stalight-Campus-Access',
    relatedQuestions: ['What is included in Pro plan?', 'Tell me about Advance plan', 'Book a demo'],
  },
  {
    id: 'pricing-basic-plan',
    category: 'pricing',
    title: 'Stalight Campus Basic Plan (₹150 / student / year)',
    summary: 'Start your journey with the Basic Plan at ₹150 per student per year. Essential for daily campus operations with core administrative and academic tools.',
    spokenSummary: 'The Basic plan is 150 rupees per student per year. It covers dashboards, timetables, real-time attendance, announcements, and core billing.',
    details: 'Basic Plan 📘 (₹150 / student / year — Start your journey):\nEssential for daily campus operations with core administrative and academic tools.\n\nWhat\'s Included:\n• Dashboards & Profiles\n• Timetables & Syllabus Tracking\n• Real-time Attendance (Student, Faculty, HOD)\n• Basic Announcements\n• Organization & Staff Enrollment\n• Core Billing & Plans\n• Includes 14-day free trial',
    keywords: ['basic plan', 'basic', 'starter plan', '150 plan', '150 rupees', 'basic tier', 'start your journey'],
    route: '/Stalight-Campus-Access',
    relatedQuestions: ['Compare Basic vs Pro plan', 'What is Pro plan?'],
  },
  {
    id: 'pricing-pro-plan',
    category: 'pricing',
    title: 'Stalight Campus Pro Plan (₹200 / student / year — Most Popular)',
    summary: 'Elevate your campus with the Pro Plan at ₹200 per student per year. For scaling institutions with enhanced workflows, exam suites, and deep analytics.',
    spokenSummary: 'The Pro plan is 200 rupees per student per year. It adds the complete exam suite, student marks, full fee management, and leave workflows.',
    details: 'Pro Plan 🚀 (₹200 / student / year — Elevate your campus — Most Popular):\nFor scaling institutions with enhanced workflows and deep analytics.\n\nWhat\'s Included:\n• Complete Exam Suite & Results\n• Student Marks & Study Materials\n• Full Fee & Finance Management\n• Class Scheduling & Assignments\n• Leave Management Workflows\n• Automated Faculty Bulk Uploads\n• Dedicated COE & Fees Roles\n• Everything in Basic included\n• Includes 14-day free trial',
    keywords: ['pro plan', 'pro', 'popular plan', 'most popular', '200 plan', '200 rupees', 'pro tier', 'elevate your campus'],
    route: '/Stalight-Campus-Access',
    relatedQuestions: ['What is the difference between Pro and Advance?', 'Book a Pro demo'],
  },
  {
    id: 'pricing-advance-plan',
    category: 'pricing',
    title: 'Stalight Campus Advance Plan (₹250 / student / year — Enterprise)',
    summary: 'The future of education with the Advance Plan at ₹250 per student per year. Enterprise-grade capabilities with Hostel Management, Transport, Library, and Outcome Based Education (CO).',
    spokenSummary: 'The Advance plan is 250 rupees per student per year. It includes hostel management, fleet transport, library tools, admissions, and outcome based education.',
    details: 'Advance Plan ⚡ (₹250 / student / year — The future of education — Enterprise):\nEnterprise-grade capabilities with state-of-the-art intelligence and security.\n\nWhat\'s Included:\n• Hostel Management System (HMS)\n• Comprehensive Transport System & Fleet Tracking\n• Full Library Administration & Catalog\n• Admissions & Seat Matrix Management\n• Outcome Based Education (CO Attainment)\n• Department Admin Leaves\n• Everything in Pro included\n• Includes 14-day free trial',
    keywords: ['advance plan', 'advance', 'advanced plan', 'enterprise plan', '250 plan', '250 rupees', 'advance tier', 'future of education'],
    route: '/Stalight-Campus-Access',
    relatedQuestions: ['Tell me about Custom plan', 'Book an Advance tier walkthrough'],
  },
  {
    id: 'pricing-custom-plan',
    category: 'pricing',
    title: 'Stalight Campus Custom Plan (Tailored Pricing)',
    summary: 'Build your perfect system with Custom Plan tailored pricing. For institutions requiring specialized workflows, custom integrations, and dedicated hosting.',
    spokenSummary: 'Our Custom plan provides tailored pricing for institutions that need custom workflows, bespoke ERP modules, and dedicated database hosting.',
    details: 'Custom Plan 🏛️ (Custom Tailored Pricing — Build your perfect system):\nFor institutions requiring specialized workflows, custom integrations, and dedicated hosting.\n\nWhat\'s Included:\n• Custom ERP Modules & Workflows\n• Institution-Specific Features\n• Custom Roles & Permissions\n• Dedicated Database & Hosting\n• 24/7 Priority Support & SLA\n• Everything in Advance included\n• Full onboarding support from our expert team',
    keywords: ['custom plan', 'custom', 'custom pricing', 'tailored pricing', 'build your perfect system', 'enterprise hosting'],
    route: '/Stalight-Campus-Access',
    relatedQuestions: ['Book a custom consultation', 'Contact sales'],
  },

  // ==========================================
  // 4. ERP MODULE SPECIFICS & FEATURES
  // ==========================================
  {
    id: 'feature-facial-attendance',
    category: 'feature',
    title: 'AI Facial Recognition Attendance',
    summary: 'Professors and staff can instantly verify attendance and access student academic profiles by scanning a face or uploading an image, complete with anti-proxy security and real-time shortage alerts.',
    spokenSummary: 'Our AI facial attendance lets professors take attendance and look up student profiles in seconds with anti-proxy protection.',
    details: '• Real-Time Face Scan: Instant identification with sub-second latency.\n• Anti-Proxy Security: Liveness detection prevents fraudulent or proxy check-ins.\n• Profile Lookup: Instantly pulls up student marks, past attendance percentage, and pending dues on scan.\n• Shortage Warnings: Automated real-time alerts to students and parents when attendance dips below thresholds.',
    keywords: ['facial recognition', 'face scan', 'attendance', 'proxy', 'biometric', 'scan face', 'anti proxy', 'roll call'],
    route: '/Stalight-Campus',
    sectionId: 'features',
    relatedQuestions: ['Tell me about Fee Management', 'How do smart timetables work?'],
  },
  {
    id: 'feature-fee-management',
    category: 'feature',
    title: 'Smart Fee Management & Billing',
    summary: 'Automated semester fee tracking, online payments, digital receipts, installment scheduling, fine calculations, and parental fee portals.',
    spokenSummary: 'Our smart fee system handles semester billing, online receipts, installment plans, and automatic reminder alerts.',
    details: '• Semester Billing: Customizable fee structures per department, quota, or scholarship category.\n• Payment Gateways: Seamless online payment integration with instant tax-compliant receipts.\n• Overdue Notifications: Automated SMS, email, and app reminders for pending dues.\n• Financial Reporting: Comprehensive ledger summaries for auditors and management.',
    keywords: ['fee', 'fees', 'fee management', 'payment', 'billing', 'semester fees', 'installments', 'receipts', 'finance'],
    route: '/Stalight-Campus',
    sectionId: 'features',
    relatedQuestions: ['Show Campus pricing plans', 'What is Pro plan?'],
  },
  {
    id: 'feature-timetable-assignments',
    category: 'feature',
    title: 'Smart Timetables & Digital Assignments',
    summary: 'Dynamic clash-free timetable generation with faculty substitution alerts, alongside digital assignment submission, deadline reminders, and rubric-based grading.',
    spokenSummary: 'It handles digital assignment submissions, automated grading, and clash-free timetable scheduling for faculty and students.',
    details: '• Clash-Free Scheduling: Automatically detects classroom and lab availability conflicts.\n• Substitution Alerts: One-click reallocation when a faculty member takes leave.\n• Assignment Submissions: Plagiarism-checked digital file uploads with deadline countdowns.\n• Rubric Grading: Faculty can grade assignments directly with custom rubric criteria.',
    keywords: ['timetable', 'schedule', 'assignments', 'homework', 'grading', 'substitution', 'class schedule'],
    route: '/Stalight-Campus',
    sectionId: 'features',
    relatedQuestions: ['How does NAAC accreditation work?', 'Tell me about mobile apps'],
  },
  {
    id: 'feature-accreditation-copo',
    category: 'feature',
    title: 'NAAC & NBA Accreditation Analytics',
    summary: 'Automated Course Outcome (CO) and Program Outcome (PO) mapping, attainment calculations, and one-click compliance reporting for NAAC and NBA audits.',
    spokenSummary: 'It automates course outcome mapping and attainment reports, making NAAC and NBA accreditation audits fast and simple.',
    details: '• CO-PO Mapping: Direct integration of syllabus outcomes with exam and assignment question matrices.\n• Attainment Calculations: Automatic computation of direct and indirect outcome attainment scores.\n• 1-Click Audit Reports: Generates structured, audit-ready PDF and spreadsheet reports for accreditation committees.',
    keywords: ['naac', 'nba', 'accreditation', 'co po', 'attainment', 'compliance', 'audit', 'course outcomes', 'program outcomes'],
    route: '/Stalight-Campus',
    sectionId: 'features',
    relatedQuestions: ['What is Advance plan?', 'Book a demo for accreditation tools'],
  },
  {
    id: 'feature-mobile-apps',
    category: 'feature',
    title: 'Stalight Mobile Applications (iOS & Android)',
    summary: 'Native mobile apps available on Google Play Store and Apple App Store for students, parents, and faculty to track attendance, fees, marks, and timetables on the go.',
    spokenSummary: 'Our mobile apps on the App Store and Google Play allow students and teachers to access attendance, marks, and timetables anywhere.',
    details: '• Available on Google Play Store and Apple App Store.\n• Student Mobile Dashboard: Real-time attendance percentage, timetable, assignment submissions, fee receipts, and examination marks.\n• Faculty Mobile App: On-the-go attendance taking, leave requests, and student communication.\n• Parent Portal: Push notifications for attendance shortage, fee reminders, and announcements.',
    keywords: ['mobile app', 'ios app', 'android app', 'play store', 'app store', 'download app', 'phone app'],
    route: '/Stalight-Campus',
    sectionId: 'features',
    relatedQuestions: ['Tell me about Stalight Sync', 'Show pricing'],
  },

  // ==========================================
  // 5. SERVICES & SOLUTIONS
  // ==========================================
  {
    id: 'services-overview',
    category: 'service',
    title: 'Stalight Enterprise Services Overview',
    summary: 'Stalight provides full-spectrum enterprise technology services: Custom Software Development, IT & Cloud Infrastructure, and Career Training Bootcamps.',
    spokenSummary: 'Stalight offers three core service specializations: Custom Software Development, IT and Cloud Services, and Career Training.',
    details: 'Core Service Capabilities:\n1. Custom Software Development: Bespoke web, mobile, and cloud software engineering for enterprise scalability.\n2. IT Services & Cloud Infrastructure: Cloud migration (AWS/Azure/GCP), DevOps, CI/CD automation, and cybersecurity hardening.\n3. Career Training: Practical industry bootcamps in Full Stack, Data Science, and AI/ML.\n\nWhich service would you like to explore?',
    keywords: [
      'services', 'service', 'our services', 'all services', 'what services',
      'services overview', 'services list', 'go to services', 'show services', 'services page'
    ],
    route: '/services',
    sectionId: 'services',
    relatedQuestions: ['Tell me about Software Development', 'Tell me about IT Services', 'Tell me about Career Training'],
  },
  {
    id: 'service-software-dev',
    category: 'service',
    title: 'Custom Software Development',
    summary: 'End-to-end bespoke software engineering for web, mobile, and cloud platforms engineered for reliability, security, and high scale.',
    spokenSummary: 'We build custom web, mobile, and cloud software engineered to scale for modern businesses.',
    details: 'Services Offered:\n• Full-Stack Web Development: Modern responsive web apps with React, Next.js, and TypeScript.\n• Mobile App Engineering: Native iOS (Swift), Android (Kotlin), and cross-platform (React Native / Flutter).\n• Cloud Backends & APIs: Scalable microservices, GraphQL / REST architectures, and secure databases.\n• UI/UX Design: Intuitive user journey mapping, design systems, and modern glassmorphic interfaces.\n• Cost Estimate Calculator available directly on the page.',
    keywords: [
      'software development', 'custom software', 'web development', 'mobile app development',
      'engineering', 'app building', 'react', 'node', 'mobile app', 'software engineering'
    ],
    route: '/software-development',
    sectionId: 'estimate',
    relatedQuestions: ['Get a software project estimate', 'Tell me about IT services'],
  },
  {
    id: 'service-it-services',
    category: 'service',
    title: 'IT Services & Cloud Infrastructure',
    summary: 'Enterprise cloud setup, DevOps pipelines, cybersecurity hardening, infrastructure monitoring, and IT modernization consulting.',
    spokenSummary: 'Our IT services cover cloud infrastructure, DevOps pipelines, and digital modernization.',
    details: 'Capabilities:\n• Cloud Architecture & Migration (AWS, Azure, Google Cloud)\n• DevOps & CI/CD: Automated deployment pipelines and container orchestration (Docker / Kubernetes)\n• Cybersecurity: Vulnerability assessments, encryption protocols, and compliance auditing\n• 24/7 Monitoring & System Health Support',
    keywords: [
      'it services', 'cloud', 'devops', 'infrastructure', 'security', 'cybersecurity',
      'it consulting', 'aws', 'azure', 'gcp', 'cloud migration'
    ],
    route: '/it-services',
    sectionId: 'services',
    relatedQuestions: ['Tell me about Skill Development', 'Contact IT support'],
  },
  {
    id: 'service-skill-dev',
    category: 'service',
    title: 'Career Training & Skill Development Bootcamps',
    summary: 'Hands-on, industry-aligned career bootcamps covering Full Stack Development, Data Science & Analytics, AI/ML, and placement preparation.',
    spokenSummary: 'We offer hands-on career bootcamps in full-stack development, data science, and AI with real project mentorship.',
    details: 'Bootcamp Tracks:\n• Full Stack Web Development (React, Node.js, Express, Databases)\n• Data Science & Predictive Analytics (Python, Pandas, Machine Learning)\n• AI & Machine Learning Engineering\n• Capstone Projects & Live Mentorship by Senior Industry Engineers\n• Placement Assistance & Resume Reviews',
    keywords: [
      'skill development', 'training', 'courses', 'bootcamp', 'full stack', 'data science',
      'ai ml', 'career training', 'placement training', 'learn coding'
    ],
    route: '/skill-development',
    sectionId: 'courses',
    relatedQuestions: ['Tell me about Stalight Sync', 'How do I enroll in bootcamps?'],
  },

  // ==========================================
  // 6. CERTIFICATE & OFFER VERIFICATION
  // ==========================================
  {
    id: 'verification-portal',
    category: 'verification',
    title: 'Official Certificate & Offer Letter Verification',
    summary: 'Online verification system to authenticate official internship certificates, course completion credentials, and offer letters issued by Stalight Technologies.',
    spokenSummary: 'You can authenticate official internship certificates and offer letters using our online verification portal.',
    details: '• Verify Internship Certificates: Instant validation of student internship credentials, roles, and dates.\n• Verify Offer Letters: Validates official employment offers issued by Stalight Technologies.\n• Instant Cryptographic Status: Checks status (Verified, Revoked, or Expired) and provides secure document downloads.\n• Verification URL format: stalight.in/verify/:certificateId or stalight.in/verify-offer/:certificateId',
    keywords: [
      'verify', 'verification', 'verify certificate', 'verify offer', 'certificate verification',
      'offer letter verification', 'internship certificate', 'validate certificate', 'certificate portal'
    ],
    route: '/verify/sample',
    relatedQuestions: ['How do I contact support for certificate queries?', 'Tell me about skill development'],
  },

  // ==========================================
  // 7. LEGAL, PRIVACY & POLICIES
  // ==========================================
  {
    id: 'policy-privacy',
    category: 'policy',
    title: 'Privacy Policy & Data Security',
    summary: 'Stalight adheres to strict data privacy and encryption standards, ensuring student and institutional data is protected and never sold.',
    spokenSummary: 'Stalight follows strict enterprise encryption standards to safeguard all student and institutional data.',
    details: '• End-to-End Encryption for student academic data and biometric templates.\n• GDPR and Indian Data Protection compliance.\n• Strict zero-reselling policy for customer and student data.\n• Access the full Privacy Policy at /privacy.',
    keywords: ['privacy', 'privacy policy', 'data security', 'security', 'gdpr', 'data protection', 'encryption'],
    route: '/privacy',
    relatedQuestions: ['Show Terms of Service', 'Account deletion policy'],
  },
  {
    id: 'policy-terms',
    category: 'policy',
    title: 'Terms of Service',
    summary: 'Our Terms of Service govern the usage of Stalight Campus ERP, Stalight Sync LMS, and digital services provided by Stalight Technologies.',
    spokenSummary: 'Our Terms of Service govern the usage of Stalight Campus, Sync, and all associated digital platforms.',
    details: 'Covers software licensing, uptime commitments, acceptable use policies, intellectual property rights, and billing guidelines. Full terms available at /terms.',
    keywords: ['terms', 'terms of service', 'terms and conditions', 'sla', 'agreement', 'contract'],
    route: '/terms',
    relatedQuestions: ['View Privacy Policy', 'Campus Access pricing'],
  },
  {
    id: 'policy-account-deletion',
    category: 'policy',
    title: 'User Account & Data Deletion',
    summary: 'Guidelines for students and users requesting permanent account and data deletion in accordance with privacy laws.',
    spokenSummary: 'Users can submit a permanent account deletion request through our account deletion portal or by emailing support.',
    details: 'Users can request permanent erasure of their login credentials, profile info, and personal records by following the account deletion instructions at /account-deletion or writing to support@stalight.in.',
    keywords: ['account deletion', 'delete account', 'erase data', 'delete my data', 'remove profile'],
    route: '/account-deletion',
    relatedQuestions: ['Contact support', 'Privacy Policy'],
  },

  // ==========================================
  // 8. DEMO BOOKING & WALKTHROUGHS
  // ==========================================
  {
    id: 'contact-demo-booking',
    category: 'contact',
    title: 'Book a Live Product Demonstration',
    summary: 'Colleges, universities, and enterprise organizations can schedule a live personalized product demonstration of Stalight Campus or Stalight Sync.',
    spokenSummary: 'You can book a live demo anytime using the demo form on your screen. Just share your details and we will schedule your walkthrough.',
    details: 'How to Book:\n1. Fill in your Name / Institution\n2. Provide your Email Address\n3. Specify your Requirements or Phone Number\nOur technical team responds within 24 business hours to coordinate an interactive screen-share walkthrough.',
    keywords: [
      'demo', 'book demo', 'schedule demo', 'book a demo', 'request demo', 'live walkthrough',
      'product demo', 'show demo', 'i want a demo', 'campus demo', 'sync demo'
    ],
    route: '/#contact',
    sectionId: 'contact',
    relatedQuestions: ['What are the pricing tiers?', 'What is Stalight Campus?'],
  }
];

