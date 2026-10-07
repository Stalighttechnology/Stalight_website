/**
 * AI Voice Intent & Reasoning Engine for Stalight Assistant
 * Handles natural language comprehension, contextual references, tool triggering, and response generation.
 */

import { AssistantResponse, AssistantToolCall, WebsiteContext, VoiceMessage } from '@/types/voice';
import { STALIGHT_KNOWLEDGE_BASE, KnowledgeItem } from './voiceKnowledge';
import { actionRegistry } from './voiceTools';
import { parseSpokenEmail } from './voicePhonetics';

interface ImportMetaEnv {
  VITE_VOICE_API_URL?: string;
}

export class VoiceIntentEngine {
  /**
   * Main entry point to process a voice/text query
   */
  public async processQuery(
    rawQuery: string,
    context: WebsiteContext,
    history: VoiceMessage[] = []
  ): Promise<AssistantResponse> {
    const cleanQuery = rawQuery.trim().toLowerCase();

    // 1. Check if an external backend API is configured
    const env = (import.meta as unknown as { env?: ImportMetaEnv }).env;
    const apiUrl = env?.VITE_VOICE_API_URL;
    if (apiUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: cleanQuery, context, history: history.slice(-6) }),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data: AssistantResponse = await res.json();
          if (data && data.spokenText) {
            this.executeToolCalls(data.toolCalls);
            return data;
          }
        }
      } catch {
        // Fall back gracefully to built-in semantic reasoning engine
      }
    }

    // 2. Built-in High-Speed Semantic Reasoning & Tool Dispatcher
    return this.evaluateLocalIntent(cleanQuery, context, history, rawQuery);
  }

  /**
   * Evaluates user intent using local knowledge and website context
   */
  private evaluateLocalIntent(
    query: string,
    context: WebsiteContext,
    history: VoiceMessage[],
    rawQuery: string = query
  ): AssistantResponse {
    // --- REPEATED WAKE / GREETING QUERIES ---
    const wakePhrases = [
      'hey stalight',
      'hey starlight',
      'hey stahlight',
      'hey stah light',
      'stah light',
      'stahlight',
      'hi stalight',
      'hi starlight',
      'hi stahlight',
      'hi stah light',
      'hello stalight',
      'hello starlight',
      'hello stahlight',
      'hello stah light',
      'hey stay light',
      'hey star light',
      'stalight',
      'starlight',
      'hey',
      'hello',
      'hi',
    ];

    if (wakePhrases.includes(query)) {
      const greetings = [
        "Hello there",
        "Uh-huh?",
        "Yes?",
        "I'm right here.",
      ];
      const spoken = greetings[Math.floor(Math.random() * greetings.length)];
      return { spokenText: spoken, displayText: "I'm listening! 🎙️" };
    }

    // --- HOME PAGE GUIDANCE ---
    if (
      query === 'home' ||
      query === 'home page' ||
      query.includes('go to home') ||
      query.includes('take me home') ||
      query.includes('open home') ||
      query.includes('go home') ||
      query.includes('navigate to home') ||
      query.includes('take me to home')
    ) {
      actionRegistry.navigate('/');
      return {
        spokenText: "We are on the home page! What would you like to explore? You can check Stalight Campus for college ERP, Stalight Sync for placement training, or explore our Basic, Pro, and Advance access plans. Which one would you like to see?",
        displayText: "Welcome to the Home Page 🏠\nWhat would you like to explore?\n• Stalight Campus (AI College ERP)\n• Stalight Sync (Career & LMS Platform)\n• Access Plans (Basic, Pro, Advance)\nTell me which one you'd like to see!",
        toolCalls: [{ name: 'navigate', args: { path: '/' } }],
      };
    }

    // --- SPECIFIC ACCESS PLANS (Basic, Pro, Advance) ---

    // Basic Plan
    if (
      query.includes('basic plan') ||
      query.includes('basic model') ||
      query.includes('starter plan') ||
      query.includes('tell me about basic') ||
      query.includes('what is basic plan')
    ) {
      actionRegistry.navigate('https://campus.stalight.in/stalightcampus');
      return {
        spokenText: "The Basic Plan is 150 rupees per student per year. It covers core daily operations, personalized student and faculty portals, automated attendance, and core fee management.",
        displayText: "Stalight Campus Basic Plan 📘 (₹150 / student / year)\n• Personalized Student & Faculty Portals\n• Automated Attendance Management\n• Timetables & Syllabus Tracking\n• Core Fee Management & Mobile App Access\n\n🌐 Live Pricing Page: https://campus.stalight.in/stalightcampus",
        toolCalls: [{ name: 'navigate', args: { path: 'https://campus.stalight.in/stalightcampus' } }],
      };
    }

    // Pro Plan
    if (
      query.includes('pro plan') ||
      query.includes('pro model') ||
      query.includes('popular plan') ||
      query.includes('tell me about pro') ||
      query.includes('what is pro plan')
    ) {
      actionRegistry.navigate('https://campus.stalight.in/stalightcampus');
      return {
        spokenText: "The Pro Plan is 200 rupees per student per year. It is our most popular tier, featuring complete examination suites, student marks, full fee management, and multi-dimensional analytics.",
        displayText: "Stalight Campus Pro Plan 🚀 (₹200 / student / year - Most Popular)\n• Complete Exam Suite & Results\n• Student Marks & Study Materials\n• Full Fee & Finance Management\n• Multi-Dimensional Analytics & Compliance\n\n🌐 Live Pricing Page: https://campus.stalight.in/stalightcampus",
        toolCalls: [{ name: 'navigate', args: { path: 'https://campus.stalight.in/stalightcampus' } }],
      };
    }

    // Advance / Enterprise Plan
    if (
      query.includes('advance plan') ||
      query.includes('advanced plan') ||
      query.includes('advance model') ||
      query.includes('enterprise plan') ||
      query.includes('tell me about advance') ||
      query.includes('what is advance plan')
    ) {
      actionRegistry.navigate('https://campus.stalight.in/stalightcampus');
      return {
        spokenText: "The Advance Plan is 250 rupees per student per year. It delivers enterprise capabilities with Hostel Management, Transport fleet tracking, Library administration, and Outcome Based Education.",
        displayText: "Stalight Campus Advance Plan ⚡ (₹250 / student / year - Enterprise)\n• Hostel Management System (HMS)\n• Transportation & Fleet Tracking\n• Full Library Administration\n• Outcome Based Education (CO Attainment)\n• Everything in Pro Included\n\n🌐 Live Pricing Page: https://campus.stalight.in/stalightcampus",
        toolCalls: [{ name: 'navigate', args: { path: 'https://campus.stalight.in/stalightcampus' } }],
      };
    }

    // Custom Plan
    if (
      query.includes('custom plan') ||
      query.includes('custom pricing') ||
      query.includes('tailored plan')
    ) {
      actionRegistry.navigate('https://campus.stalight.in/stalightcampus');
      return {
        spokenText: "Our Custom Plan provides tailored pricing for institutions requiring specialized workflows, bespoke ERP modules, dedicated database hosting, and 24/7 priority support.",
        displayText: "Stalight Campus Custom Plan 🏛️ (Tailored Pricing)\n• Custom ERP Modules & Workflows\n• Dedicated Database & Hosting\n• Institution-Specific Features & Permissions\n• 24/7 Priority Support & SLA\n\n🌐 Live Pricing Page: https://campus.stalight.in/stalightcampus",
        toolCalls: [{ name: 'navigate', args: { path: 'https://campus.stalight.in/stalightcampus' } }],
      };
    }

    // --- DIRECT NAVIGATION & SCROLL ACTIONS ---

    // Scroll Down / Up
    if (query.includes('scroll down') || query === 'down' || query.includes('page down') || query.includes('next section')) {
      actionRegistry.scrollPage('down', 500);
      return { spokenText: 'Scrolling down.', displayText: 'Scrolling down ⬇️' };
    }
    if (query.includes('scroll up') || query === 'up' || query.includes('page up')) {
      actionRegistry.scrollPage('up', 500);
      return { spokenText: 'Scrolling up.', displayText: 'Scrolling up ⬆️' };
    }
    if (query.includes('scroll to top') || query.includes('go to top') || query === 'top') {
      actionRegistry.scrollPage('top');
      return { spokenText: 'Back to the top.', displayText: 'Scrolled to top' };
    }
    if (query.includes('scroll to bottom') || query.includes('go to bottom')) {
      actionRegistry.scrollPage('bottom');
      return { spokenText: 'Scrolled to bottom.', displayText: 'Scrolled to bottom' };
    }

    // Go Back / Forward
    if (query.includes('go back') || query === 'back' || query.includes('previous page')) {
      actionRegistry.goBack();
      return { spokenText: 'Going back.', displayText: 'Navigated back' };
    }
    if (query.includes('go forward') || query === 'forward') {
      actionRegistry.goForward();
      return { spokenText: 'Going forward.', displayText: 'Navigated forward' };
    }

    // Help / Capabilities
    if (
      query === 'help' ||
      query.includes('what can you do') ||
      query.includes('how to use') ||
      query.includes('what can i ask') ||
      query.includes('available commands')
    ) {
      return {
        spokenText: "I can help you navigate the website, explain Stalight Campus ERP and Stalight Sync LMS, show pricing plans, scroll pages, and book a live product demo. Try saying 'Show Campus features', 'What is Pro plan', or 'Book a demo'!",
        displayText: "Stalight Assistant Capabilities 🎙️\n• Explore Products: 'What is Stalight Campus?', 'Tell me about Stalight Sync'\n• Pricing & Plans: 'Show pricing', 'What is Basic/Pro/Advance plan?'\n• Navigation: 'Go to home page', 'Scroll down', 'About us'\n• Book a Demo: 'Book a demo', 'Submit form'\n• Contact: 'What is your contact number?'",
      };
    }

    // Contextual response to "Would you like me to connect you with our team?" or "I can connect you with the Stalight team..."
    const lastAssistantMsg = history.filter((m) => m.sender === 'assistant').slice(-1)[0]?.text || '';
    const wasAskedToConnect =
      lastAssistantMsg.toLowerCase().includes('connect you with') ||
      lastAssistantMsg.toLowerCase().includes('connect with the stalight team') ||
      lastAssistantMsg.toLowerCase().includes('connect with our team');

    if (wasAskedToConnect) {
      if (
        ['yes', 'yeah', 'sure', 'yep', 'please', 'ok', 'okay', 'connect', 'how to connect', 'go to form', 'open form', 'form', 'show form'].some((w) => query.includes(w))
      ) {
        actionRegistry.openContactForm();
        return {
          spokenText: "I've opened the contact form for you! Please provide your name, email, and requirements, or reach out to us directly at support@stalight.in.",
          displayText: "Connect with Stalight 🤝\n• Email: support@stalight.in / business@stalight.in\n• Phone: +91 91105 51102\n• Office: Bengaluru, Karnataka, India\nContact form opened on screen!",
          toolCalls: [{ name: 'openContactForm', args: {} }],
        };
      }
      if (['no', 'nope', 'not now', 'later', 'cancel'].some((w) => query.includes(w))) {
        return {
          spokenText: "No problem! Let me know if there's anything else about Stalight Campus or Sync you'd like to explore.",
          displayText: "No problem! What else would you like to explore?",
        };
      }
    }

    // Form Submission Confirmation
    if (
      query === 'submit' ||
      query === 'confirm' ||
      query.includes('send request') ||
      query.includes('submit form') ||
      query.includes('submit the form') ||
      query.includes('send the request') ||
      query === 'send' ||
      query === 'yes submit' ||
      query === 'submit demo' ||
      query.includes('confirm to send')
    ) {
      actionRegistry.submitContactForm();
      return {
        spokenText: "Your demo request has been submitted! Our team will reach out to schedule your walkthrough.",
        displayText: "Demo Request Submitted! 🎉\nOur team will get in touch with you shortly.",
        toolCalls: [{ name: 'submitContactForm', args: {} }],
      };
    }

    // Demo Request / Booking (Always evaluated before generic slot filling)
    if (
      query.includes('demo') ||
      query.includes('book a demo') ||
      query.includes('schedule a demo') ||
      query.includes('show demo') ||
      query.includes('i want a demo') ||
      query.includes('book for the demo') ||
      query.includes('booker demo') ||
      query.includes('request demo')
    ) {
      actionRegistry.openContactForm();
      return {
        spokenText: "I've opened the demo booking form for you. Please share your name or institution, email address, and your message or phone number, and I will help fill it out, or confirm when you're ready to send the request!",
        displayText: "Demo Booking Form 📝\nPlease provide:\n1. Full Name / Institution\n2. Email Address\n3. Message or Phone Number\nSay 'Submit' or click Send when you are ready.",
        toolCalls: [{ name: 'openContactForm', args: {} }],
      };
    }

    // General Pricing / Access Plans (Always evaluated before generic slot filling)
    if (
      query.includes('pricing') ||
      query.includes('pricings') ||
      query.includes('price') ||
      query.includes('cost') ||
      query.includes('plans') ||
      query.includes('subscription') ||
      query.includes('stalightcampus') ||
      query.includes('rate') ||
      query.includes('rates') ||
      query.includes('how much')
    ) {
      actionRegistry.navigate('https://campus.stalight.in/stalightcampus');
      return {
        spokenText: "Stalight Campus pricing is 150 rupees per student per year for Basic, 200 rupees per student per year for Pro, and 250 rupees per student per year for the Advance Enterprise plan. I have redirected you to the live pricing page at campus.stalight.in/stalightcampus.",
        displayText: "Stalight Campus Pricing & Plans 🏷️\n• Basic: ₹150 / student / year (Core Attendance, Portals & Timetables)\n• Pro: ₹200 / student / year (Exam Suite, Fees & Multi-dimensional Analytics - Most Popular)\n• Advance: ₹250 / student / year (HMS, Transport, Library & OBE)\n• Custom: Tailored pricing for enterprise workflows\n\n🌐 Live Pricing Page: https://campus.stalight.in/stalightcampus",
        toolCalls: [{ name: 'navigate', args: { path: 'https://campus.stalight.in/stalightcampus' } }],
      };
    }

    // Voice Form Data Extraction (Full Name, Email Address, How Can We Help?)
    const isFormPromptActive =
      lastAssistantMsg.includes('Demo Booking Form') ||
      lastAssistantMsg.includes('Send Us a Message') ||
      lastAssistantMsg.includes('Email Address') ||
      lastAssistantMsg.includes('Full Name') ||
      lastAssistantMsg.includes('requirements') ||
      lastAssistantMsg.includes('How can we help');

    const spokenEmailCandidate = parseSpokenEmail(rawQuery) || parseSpokenEmail(query);

    if (
      spokenEmailCandidate ||
      query.includes('@') ||
      query.includes('email') ||
      query.includes('at the rate') ||
      query.includes('at the right') ||
      query.includes('at the red') ||
      query.includes('gmail') ||
      query.includes('yahoo') ||
      query.includes('outlook') ||
      query.includes('name') ||
      query.includes('requirement') ||
      query.includes('message') ||
      query.includes('college') ||
      query.includes('institution') ||
      (query.includes('phone') && !query.includes('what')) ||
      (query.includes('number') && !query.includes('what') && !query.includes('contact')) ||
      (isFormPromptActive && query.length > 2 && !query.includes('scroll') && !query.includes('go to') && !query.includes('what is') && !query.includes('connect'))
    ) {
      let email = spokenEmailCandidate;
      const phoneMatch = query.match(/(?:phone|mobile|number|contact)?\s*(\+?\d[\d\s-]{8,14}\d)/i);
      const nameMatch = query.match(/(?:my name is|name is|name|i am|institution is|college is)\s+([a-zA-Z\s]+?)(?:[,.]|\s+(?:and|with|email|phone|mobile|message|requirement)|$)/i);
      const messageMatch = query.match(/(?:message is|requirement is|requirements are|how can we help|we need|looking for)\s+(.+)/i);

      const phone = phoneMatch ? phoneMatch[1].replace(/\s+/g, '') : undefined;
      let rawName = nameMatch ? nameMatch[1].trim() : undefined;
      let message = messageMatch ? messageMatch[1].trim() : undefined;

      // Reserved keywords that can NEVER be a person's name
      const reservedNameKeywords = ['demo', 'book', 'booking', 'schedule', 'pricing', 'price', 'plans', 'cost', 'stalight', 'campus', 'sync', 'help', 'contact', 'about', 'services', 'scroll', 'yes', 'no', 'hi', 'hello', 'what', 'tell', 'erp', 'lms', 'ok', 'okay', 'cancel'];

      // Conversational slot filling when user answers in context:
      if (isFormPromptActive) {
        if (!email && (lastAssistantMsg.includes('Email Address') || lastAssistantMsg.includes('email'))) {
          email = parseSpokenEmail(query);
        }
        if (!email && !phone && !rawName && !message) {
          if (lastAssistantMsg.includes('How can we help') || lastAssistantMsg.includes('requirements') || lastAssistantMsg.includes('message')) {
            message = rawQuery;
          } else if (lastAssistantMsg.includes('Full Name') || lastAssistantMsg.includes('name')) {
            if (query.split(' ').length <= 4 && !reservedNameKeywords.some((k) => query.toLowerCase().includes(k))) {
              rawName = query;
            }
          }
        }
      }

      if (rawName && reservedNameKeywords.some((k) => rawName!.toLowerCase().includes(k))) {
        rawName = undefined;
      }

      const name =
        rawName && rawName.length > 1 && !['is', 'the', 'a', 'to', 'for', 'of', 'demo', 'email', 'phone'].includes(rawName.toLowerCase())
          ? rawName.replace(/\b\w/g, (c) => c.toUpperCase())
          : undefined;

      if (email || name || message || phone) {
        actionRegistry.fillContactForm({ name, email, message: message || (phone ? `Phone: ${phone}` : undefined) });

        let spokenGuidance = '';
        if (name && !email) {
          spokenGuidance = `I've entered your Full Name as ${name}. What is your Email Address?`;
        } else if (email && !message && !name) {
          spokenGuidance = `Got your Email Address as ${email}. What are your requirements, or how can we help?`;
        } else if (name && email && !message) {
          spokenGuidance = `I've filled your Name as ${name} and Email as ${email}. How can we help, or what are your requirements?`;
        } else {
          spokenGuidance = `I have updated your details. Say 'Submit' or click Send Message when you are ready!`;
        }

        return {
          spokenText: spokenGuidance,
          displayText: `Form Updated ✅\n${name ? `• Full Name: ${name}\n` : ''}${email ? `• Email Address: ${email}\n` : ''}${message ? `• Requirements: ${message}\n` : ''}${phone ? `• Phone: ${phone}\n` : ''}\n${spokenGuidance}`,
          toolCalls: [{ name: 'fillContactForm', args: { name, email, message: message || phone } }],
        };
      }
    }

    // Direct Connect, Contact Info & Location
    if (
      query.includes('connect') ||
      query.includes('contact') ||
      query.includes('touch with') ||
      query.includes('talk to') ||
      query.includes('reach out') ||
      query.includes('how to reach') ||
      query.includes('how to contact') ||
      query.includes('call you') ||
      (query.includes('phone') && (query.includes('what') || query.includes('your') || query.includes('stalight'))) ||
      (query.includes('number') && (query.includes('what') || query.includes('stalight') || query.includes('contact'))) ||
      ((query.includes('what is your email') || query.includes('what is stalight email') || query.includes('support email') || query.includes('contact email') || (query.includes('email address') && (query.includes('what') || query.includes('your') || query.includes('stalight')))) && !isFormPromptActive) ||
      query.includes('where is stalight') ||
      query.includes('stalight location') ||
      query.includes('office address') ||
      query.includes('support team')
    ) {
      actionRegistry.openContactForm();
      return {
        spokenText: "You can connect with the Stalight team in Bengaluru by emailing support@stalight.in, calling +91 91105 51102, or sending a message through the contact form on your screen.",
        displayText: "Connect with Stalight Technologies 📍\n• Email: support@stalight.in / business@stalight.in\n• Phone: +91 91105 51102\n• Office: Bengaluru, Karnataka, India\n• Contact form opened below!",
        toolCalls: [{ name: 'openContactForm', args: {} }],
      };
    }

    // ERP & LMS Definitions
    if (
      query === 'what is erp' ||
      query === 'erp' ||
      query.includes('what is an erp') ||
      query.includes('define erp') ||
      query.includes('meaning of erp')
    ) {
      return {
        spokenText: "An E-R-P is an Enterprise Resource Planning system. Stalight Campus is our AI-powered college E-R-P that automates attendance, examinations, fee collections, timetables, and accreditation compliance.",
        displayText: "What is an ERP? 🏛️\nAn ERP (Enterprise Resource Planning) platform unifies institution-wide operations. Stalight Campus handles AI facial attendance, fee management, exam suites, and NAAC/NBA compliance.",
      };
    }

    if (
      query === 'what is lms' ||
      query === 'lms' ||
      query.includes('what is an lms') ||
      query.includes('define lms')
    ) {
      return {
        spokenText: "An L-M-S is a Learning Management System. Stalight Sync is our intelligent L-M-S that prepares students for campus placements with AI mock interviews and live coding practice labs.",
        displayText: "What is an LMS? 💡\nAn LMS (Learning Management System) facilitates learning and skill development. Stalight Sync offers AI mock interviews, coding labs, and placement tracking.",
      };
    }

    // Products Directory / Products Section
    if (
      query === 'products' ||
      query === 'show products' ||
      query.includes('what products') ||
      query.includes('all products')
    ) {
      actionRegistry.navigate('/', '#products');
      return {
        spokenText: "Stalight offers two flagship products: Stalight Campus for college ERP, and Stalight Sync for career placement training.",
        displayText: "Stalight offers two flagship products: Stalight Campus (AI-powered college ERP) and Stalight Sync (LMS & Career Placement platform).",
        toolCalls: [{ name: 'navigate', args: { path: '/', hash: '#products' } }],
      };
    }

    // Stalight Campus (Product)
    if (
      query.includes('campus') ||
      query.includes('college erp') ||
      query.includes('college management')
    ) {
      actionRegistry.navigate('/Stalight-Campus');
      return {
        spokenText: "Stalight Campus is our AI-driven college ERP, handling facial attendance, timetables, fees, assignments, and NAAC/NBA compliance.",
        displayText: "Stalight Campus is an intelligent college ERP and management platform. It automates AI facial recognition attendance, smart timetables, fee management, assignments, and NAAC/NBA compliance analytics.",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus' } }],
      };
    }

    // Stalight Sync (Product)
    if (
      query.includes('sync') ||
      query.includes('lms') ||
      query.includes('mock interview') ||
      query.includes('placement platform')
    ) {
      actionRegistry.navigate('/Stalight-Sync');
      return {
        spokenText: "Stalight Sync is an intelligent LMS providing AI mock interviews, coding labs, and placement readiness analytics.",
        displayText: "Stalight Sync is an intelligent LMS and career platform featuring AI mock interviews, live coding practice labs, automated assessment scoring, and placement readiness tracking.",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Sync' } }],
      };
    }

    // Attendance / Facial Recognition
    if (
      query.includes('attendance') ||
      query.includes('facial') ||
      query.includes('biometric') ||
      query.includes('proxy')
    ) {
      if (context.pathname !== '/Stalight-Campus') {
        actionRegistry.navigate('/Stalight-Campus', '#features');
      } else {
        actionRegistry.scrollToSection('features');
      }
      return {
        spokenText: "Stalight features AI facial recognition attendance with instant student academic lookups and anti-proxy security.",
        displayText: "Stalight features AI facial recognition attendance with instant student academic lookups, anti-proxy verification, and real-time shortage alerts.",
        toolCalls: [{ name: 'scrollToSection', args: { section: 'features' } }],
      };
    }


    // Career Training / Skill Development
    if (
      query.includes('career training') ||
      query.includes('skill development') ||
      query.includes('bootcamp') ||
      query.includes('courses')
    ) {
      actionRegistry.navigate('/skill-development');
      return {
        spokenText: "We offer career bootcamps in Full Stack, Data Science, and AI/ML with real-world project mentoring.",
        displayText: "Opening Career Training 🚀",
        toolCalls: [{ name: 'navigate', args: { path: '/skill-development' } }],
      };
    }

    // Custom Software Development
    if (
      query.includes('software development') ||
      query.includes('custom software') ||
      query.includes('web development') ||
      query.includes('app development')
    ) {
      actionRegistry.navigate('/software-development');
      return {
        spokenText: "Stalight builds enterprise-grade web, mobile, and cloud software engineered for scale.",
        displayText: "Opening Software Development 💻",
        toolCalls: [{ name: 'navigate', args: { path: '/software-development' } }],
      };
    }

    // IT Services / Cloud
    if (
      query.includes('it services') ||
      query.includes('cloud') ||
      query.includes('devops') ||
      query.includes('infrastructure')
    ) {
      actionRegistry.navigate('/it-services');
      return {
        spokenText: "Our IT services encompass cloud architecture, DevOps, technical assessments, and digital modernization.",
        displayText: "Opening IT Services ☁️",
        toolCalls: [{ name: 'navigate', args: { path: '/it-services' } }],
      };
    }

    // Contextual references ("tell me more", "what about this", "show me that", "how does this work")
    if (
      query.includes('tell me more') ||
      query.includes('what about this') ||
      query.includes('show me that') ||
      query.includes('how does this work') ||
      query.includes('explain this')
    ) {
      return this.handleDeicticReference(context, history);
    }

    // About Us / Company Overview
    if (
      query === 'about' ||
      query.includes('about us') ||
      query.includes('about stalight') ||
      query.includes('who are you') ||
      query.includes('what is stalight') ||
      query.includes('tell me about stalight') ||
      query.includes('tell me about the company')
    ) {
      actionRegistry.navigate('/about');
      return {
        spokenText: "Stalight Technologies is a Bengaluru-based tech company empowering colleges with smart ERP and delivering custom enterprise software.",
        displayText: "About Stalight Technologies 🏢",
        toolCalls: [{ name: 'navigate', args: { path: '/about' } }],
      };
    }

    // Partners / Clients
    if (query.includes('partner') || query.includes('client') || query.includes('colleges using')) {
      actionRegistry.navigate('/about');
      return {
        spokenText: "We partner with AMC Institution, City Engineering College, Dwi Nethra Educational Trust, TONTADARYA College of Engineering, and more.",
        displayText: "Stalight Institutional Partners 🤝",
        toolCalls: [{ name: 'navigate', args: { path: '/about' } }],
      };
    }

    // Search Knowledge Base for most relevant match
    const matched = this.searchKnowledgeBase(query);
    if (matched) {
      if (matched.route && matched.route !== context.pathname) {
        actionRegistry.navigate(matched.route, matched.sectionId ? `#${matched.sectionId}` : undefined);
      } else if (matched.sectionId) {
        actionRegistry.scrollToSection(matched.sectionId);
      }

      return {
        spokenText: matched.summary,
        displayText: `${matched.title}: ${matched.summary}`,
      };
    }

    // Friendly fallback without hallucination
    return {
      spokenText: "I don't have that specific information right now. Would you like me to connect you with our team?",
      displayText: "I can connect you with the Stalight team for more details.",
      followUpSuggestions: ["Book a demo", "View Stalight Campus", "See pricing"],
    };
  }

  /**
   * Resolves contextual "this/that/more" queries based on the active page
   */
  private handleDeicticReference(context: WebsiteContext, _history: VoiceMessage[]): AssistantResponse {
    const path = context.pathname.toLowerCase();

    if (path.includes('campus')) {
      return {
        spokenText: "You're viewing Stalight Campus. It automates student management, AI attendance, exams, timetables, and NAAC/NBA compliance.",
        displayText: "Stalight Campus Overview 🎓",
      };
    }
    if (path.includes('sync')) {
      return {
        spokenText: "You're viewing Stalight Sync. It prepares students for placements with AI mock interviews, coding labs, and readiness scores.",
        displayText: "Stalight Sync Overview ⚡",
      };
    }
    if (path.includes('access') || path.includes('pricing')) {
      return {
        spokenText: "You're viewing our Campus Access Plans. We provide Basic, Pro, and Advance tiers depending on institutional needs.",
        displayText: "Campus Access Tiers 📋",
      };
    }
    if (path.includes('software')) {
      return {
        spokenText: "This is our Custom Software Development division. We build scalable web, mobile, and cloud software.",
        displayText: "Software Engineering 💻",
      };
    }
    if (path.includes('skill')) {
      return {
        spokenText: "This is our Career Training wing offering industry bootcamps in full-stack, data science, and AI.",
        displayText: "Career Training 🚀",
      };
    }

    return {
      spokenText: "Stalight Technologies provides modern education ERP, LMS, and enterprise software solutions.",
      displayText: "Stalight Technologies Overview",
    };
  }

  /**
   * Keyword similarity matching on the verified knowledge base
   */
  private searchKnowledgeBase(query: string): KnowledgeItem | null {
    const words = query.split(/\s+/).filter((w) => w.length > 2);
    let bestMatch: KnowledgeItem | null = null;
    let highestScore = 0;

    for (const item of STALIGHT_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        if (query.includes(kw)) score += 4;
        for (const w of words) {
          if (kw.includes(w)) score += 1;
        }
      }

      if (score > highestScore && score >= 2) {
        highestScore = score;
        bestMatch = item;
      }
    }

    return bestMatch;
  }

  /**
   * Executes tools returned by an external or local intent processor
   */
  private executeToolCalls(toolCalls?: AssistantToolCall[]) {
    if (!toolCalls || !Array.isArray(toolCalls)) return;
    for (const call of toolCalls) {
      if (call.name === 'navigate' && typeof call.args?.path === 'string') {
        const hash = typeof call.args?.hash === 'string' ? call.args.hash : undefined;
        actionRegistry.navigate(call.args.path, hash);
      } else if (call.name === 'scrollToSection' && typeof call.args?.section === 'string') {
        actionRegistry.scrollToSection(call.args.section);
      } else if (call.name === 'openDemoForm') {
        actionRegistry.openDemoForm();
      } else if (call.name === 'openContactForm') {
        actionRegistry.openContactForm();
      } else if (call.name === 'scrollPage' && typeof call.args?.direction === 'string') {
        actionRegistry.scrollPage(call.args.direction as 'up' | 'down' | 'top' | 'bottom');
      }
    }
  }
}

export const voiceIntentEngine = new VoiceIntentEngine();
