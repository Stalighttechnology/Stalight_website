/**
 * AI Voice Intent & Reasoning Engine for Stalight Assistant
 * Handles natural language comprehension, contextual references, tool triggering, and response generation.
 */

import { AssistantResponse, AssistantToolCall, WebsiteContext, VoiceMessage } from '@/types/voice';
import { STALIGHT_KNOWLEDGE_BASE, KnowledgeItem } from './voiceKnowledge';
import { searchGeneralKnowledge } from './generalKnowledge';
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
      'stahlight stalight',
      'stahlight, stalight',
      'stalight stalight',
      'stalight, stalight',
      'stahlight stahlight',
      'starlight starlight',
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
      'stalite',
      'stlight',
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

    // --- SPECIFIC ACCESS PLANS (Basic, Pro, Advance, Custom) ---

    // Basic Plan
    if (
      query.includes('basic plan') ||
      query.includes('basic model') ||
      query.includes('starter plan') ||
      query.includes('tell me about basic') ||
      query.includes('what is basic plan')
    ) {
      actionRegistry.navigate('/Stalight-Campus-Access');
      return {
        spokenText: "The Basic Plan is 150 rupees per student per year. It covers dashboards, timetables, real-time attendance, announcements, and core billing with a 14-day free trial.",
        displayText: "Stalight Campus Basic Plan 📘 (₹150 / student / year — Start your journey)\nEssential for daily campus operations with core administrative and academic tools.\n\nWhat's Included:\n• Dashboards & Profiles\n• Timetables & Syllabus Tracking\n• Real-time Attendance (Student, Faculty, HOD)\n• Basic Announcements\n• Organization & Staff Enrollment\n• Core Billing & Plans\n\n✨ Includes 14-day free trial & onboarding support!",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus-Access' } }],
        followUpSuggestions: ["What is Pro plan?", "Compare plans", "Book a demo"],
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
      actionRegistry.navigate('/Stalight-Campus-Access');
      return {
        spokenText: "The Pro Plan is 200 rupees per student per year. It is our most popular tier, featuring complete exam suites, student marks, full fee management, and leave workflows.",
        displayText: "Stalight Campus Pro Plan 🚀 (₹200 / student / year — Most Popular)\nFor scaling institutions with enhanced workflows and deep analytics.\n\nWhat's Included:\n• Complete Exam Suite & Results\n• Student Marks & Study Materials\n• Full Fee & Finance Management\n• Class Scheduling & Assignments\n• Leave Management Workflows\n• Automated Faculty Bulk Uploads\n• Dedicated COE & Fees Roles\n• Everything in Basic included\n\n✨ Includes 14-day free trial & onboarding support!",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus-Access' } }],
        followUpSuggestions: ["What is Advance plan?", "Compare Basic vs Pro", "Book a demo"],
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
      actionRegistry.navigate('/Stalight-Campus-Access');
      return {
        spokenText: "The Advance Plan is 250 rupees per student per year. It delivers enterprise capabilities with Hostel Management, Transport fleet tracking, Library administration, and Outcome Based Education.",
        displayText: "Stalight Campus Advance Plan ⚡ (₹250 / student / year — Enterprise)\nEnterprise-grade capabilities with state-of-the-art intelligence and security.\n\nWhat's Included:\n• Hostel Management System (HMS)\n• Comprehensive Transport System & Fleet Tracking\n• Full Library Administration & Catalog\n• Admissions & Seat Matrix Management\n• Outcome Based Education (CO Attainment)\n• Department Admin Leaves\n• Everything in Pro included\n\n✨ Includes 14-day free trial & onboarding support!",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus-Access' } }],
        followUpSuggestions: ["Tell me about Custom plan", "Book an enterprise demo", "See all features"],
      };
    }

    // Custom Plan
    if (
      query.includes('custom plan') ||
      query.includes('custom pricing') ||
      query.includes('tailored plan')
    ) {
      actionRegistry.navigate('/Stalight-Campus-Access');
      return {
        spokenText: "Our Custom Plan provides tailored pricing for institutions requiring specialized workflows, custom integrations, dedicated hosting, and 24/7 priority support.",
        displayText: "Stalight Campus Custom Plan 🏛️ (Tailored Pricing — Build your perfect system)\nFor institutions requiring specialized workflows, custom integrations, and dedicated hosting.\n\nWhat's Included:\n• Custom ERP Modules & Workflows\n• Institution-Specific Features\n• Custom Roles & Permissions\n• Dedicated Database & Hosting\n• 24/7 Priority Support & SLA\n• Everything in Advance included\n\n✨ Full onboarding support from our expert team!",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus-Access' } }],
        followUpSuggestions: ["Book a demo", "Contact sales", "See Advance plan"],
      };
    }

    // All Plans / Complete Plan Comparison / "All"
    if (
      query === 'all' ||
      query === 'all plans' ||
      query === 'all of them' ||
      query === 'show all' ||
      query === 'tell me all' ||
      query === 'explain all' ||
      query === 'all tiers' ||
      query === 'everything' ||
      query.includes('all plans') ||
      query.includes('all of them') ||
      query.includes('compare all') ||
      query.includes('compare plans') ||
      query.includes('all features') ||
      query.includes('all tiers') ||
      query.includes('show all plans') ||
      query.includes('show all features')
    ) {
      actionRegistry.navigate('/Stalight-Campus-Access');
      return {
        spokenText: "Here are all four Stalight Campus plans. Basic is 150 rupees with attendance and timetables. Pro is 200 rupees with exams and fee management. Advance is 250 rupees with hostel, transport, and Outcome Based Education. We also offer Custom tailored plans. All plans include a 14-day free trial.",
        displayText: "Stalight Campus — Complete Access Plans 📊\n\n1. Basic (₹150 / student / yr):\n• Attendance (Student/Faculty/HOD), Timetables, Profiles, Announcements, Core Billing.\n\n2. Pro (₹200 / student / yr — Most Popular):\n• Complete Exam Suite, Student Marks, Fee & Finance Management, Class Scheduling, Leave Workflows, COE & Fees Roles.\n\n3. Advance (₹250 / student / yr — Enterprise):\n• Hostel (HMS), Transport Fleet Tracking, Library Catalog, Admissions Matrix, Outcome Based Education (CO Attainment).\n\n4. Custom (Tailored Pricing):\n• Custom ERP Modules, Custom Roles, Dedicated Database/Cloud Hosting, 24/7 Priority SLA.\n\n✨ All plans include a 14-day free trial and full onboarding support!",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus-Access' } }],
        followUpSuggestions: ["Tell me about Pro plan", "Tell me about Advance plan", "Book a demo"],
      };
    }

    // Conversational Active Listening & Clarification ("I said", "listen", "can you hear me", "did you hear me")
    if (
      query === 'i said' ||
      query === 'what i said' ||
      query === 'listen' ||
      query === 'listen to me' ||
      query === 'can you hear me' ||
      query.includes('did you hear') ||
      query.includes('can you hear') ||
      query.includes('are you listening') ||
      query.includes('i told you') ||
      query.includes('i just said') ||
      query.includes('i am saying')
    ) {
      return {
        spokenText: "I am listening closely! How can I assist you? You can ask about our pricing plans, Stalight Campus features, Stalight Sync, or book a live demo.",
        displayText: "I'm right here and listening! 👂🎙️\n\nWhat would you like to explore?\n• Pricing Plans (Basic ₹150, Pro ₹200, Advance ₹250)\n• Stalight Campus ERP Features\n• Stalight Sync Placement Training\n• Book a live walkthrough demo",
        followUpSuggestions: ["Show all plans", "What is Stalight Campus?", "Book a demo"],
      };
    }

    // Repeat / Say Again
    if (
      query === 'repeat' ||
      query === 'repeat that' ||
      query === 'say again' ||
      query === 'what did you say' ||
      query === 'pardon' ||
      query.includes('say that again')
    ) {
      const lastMsg = history.filter((m) => m.sender === 'assistant').slice(-1)[0]?.text;
      if (lastMsg) {
        return {
          spokenText: `Here is what I said: ${lastMsg}`,
          displayText: `Previous response:\n\n${lastMsg}`,
        };
      }
      return {
        spokenText: "I'm here! What would you like to know about Stalight?",
        displayText: "How can I help you today? 🎙️",
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

    // --- DEMO / CONTACT FORM MULTI-TURN CONVERSATIONAL STATE MACHINE ---

    const isAskingForName =
      (lastAssistantMsg.includes('what is your full name') ||
        lastAssistantMsg.includes('Full Name or Institution') ||
        lastAssistantMsg.includes('Step 1') ||
        lastAssistantMsg.includes('tell me your Full Name') ||
        lastAssistantMsg.includes('Please provide your Full Name')) &&
      !lastAssistantMsg.includes('Step 2') &&
      !lastAssistantMsg.includes('Step 3') &&
      !lastAssistantMsg.includes('Step 4');

    const isAskingForEmail =
      (lastAssistantMsg.includes('what is your email') ||
        lastAssistantMsg.includes('What is your email') ||
        lastAssistantMsg.includes('What is your Email Address') ||
        lastAssistantMsg.includes('Step 2')) &&
      !lastAssistantMsg.includes('Step 3') &&
      !lastAssistantMsg.includes('Step 4');

    const isAskingForMessage =
      (lastAssistantMsg.includes('how can we help') ||
        lastAssistantMsg.includes('How can we help') ||
        lastAssistantMsg.includes('what are your requirements') ||
        lastAssistantMsg.includes('Step 3')) &&
      !lastAssistantMsg.includes('Step 4');

    const isAskingForSubmit =
      lastAssistantMsg.includes('submit it now') ||
      lastAssistantMsg.includes('submit the demo') ||
      lastAssistantMsg.includes('submit your demo') ||
      lastAssistantMsg.includes('Ready to submit') ||
      lastAssistantMsg.includes('Say \'Submit\'') ||
      lastAssistantMsg.includes('Step 4');

    // --- FORM CANCELLATION / EXIT HATCH ---
    if (
      ['cancel', 'stop', 'dont want', "don't want", 'not now', 'never mind', 'nevermind', 'exit', 'close form', 'forget it', 'leave', 'close', 'no'].includes(query) ||
      query.includes('dont want') ||
      query.includes("don't want") ||
      query.includes('cancel form') ||
      query.includes('stop form') ||
      query.includes('not interested')
    ) {
      return {
        spokenText: "No problem, I've cancelled the demo booking form. What would you like to explore next?",
        displayText: "Form Cancelled ❌\n\nWhat would you like to explore?\n• Stalight Campus (AI College ERP)\n• Stalight Sync (Placement & LMS)\n• Pricing & Access Plans",
        followUpSuggestions: ["Show pricing plans", "What is Stalight Campus?", "Go to home page"],
      };
    }

    // Check if user is issuing an explicit topic or navigation command (allows escaping form flow)
    const isExplicitIntentOrCommand =
      query.includes('pricing') ||
      query.includes('pricings') ||
      query.includes('price') ||
      query.includes('cost') ||
      query.includes('plans') ||
      query.includes('subscription') ||
      query.includes('stalightcampus') ||
      query.includes('go to') ||
      query.includes('take me') ||
      query.includes('open') ||
      query.includes('show') ||
      query.includes('scroll') ||
      query.includes('what is') ||
      query.includes('tell me about') ||
      query.includes('who is') ||
      query.includes('why choose') ||
      query.includes('campus') ||
      query.includes('sync') ||
      query.includes('about') ||
      query.includes('careers') ||
      query.includes('service') ||
      query.includes('home');

    // 1. Multi-Slot / Compound Utterance (e.g., "My name is Pannagaja, email is contact@stalight.in")
    const phoneMatch = query.match(/(?:phone|mobile|number|contact)?\s*(\+?\d[\d\s-]{8,14}\d)/i);
    const nameMatch = query.match(/(?:my name is|name is|i am|institution is|college is)\s+([a-zA-Z\s]+?)(?:[,.]|\s+(?:and|with|email|phone|mobile|message|requirement)|$)/i);
    const messageMatch = query.match(/(?:message is|requirement is|requirements are|how can we help|we need|looking for)\s+(.+)/i);
    const spokenEmailCandidate = parseSpokenEmail(rawQuery) || parseSpokenEmail(query);

    const extractedPhone = phoneMatch ? phoneMatch[1].replace(/\s+/g, '') : undefined;
    let extractedRawName = nameMatch ? nameMatch[1].trim() : undefined;
    let extractedMessage = messageMatch ? messageMatch[1].trim() : undefined;

    const reservedNameKeywords = ['demo', 'book', 'booking', 'schedule', 'pricing', 'price', 'plans', 'cost', 'stalight', 'campus', 'sync', 'help', 'contact', 'about', 'services', 'scroll', 'yes', 'no', 'hi', 'hello', 'what', 'tell', 'erp', 'lms', 'ok', 'okay', 'cancel', 'down', 'up', 'top', 'bottom'];
    if (extractedRawName && reservedNameKeywords.some((k) => extractedRawName!.toLowerCase().includes(k))) {
      extractedRawName = undefined;
    }

    const compoundName =
      extractedRawName && extractedRawName.length > 1 && !['is', 'the', 'a', 'to', 'for', 'of', 'demo', 'email', 'phone'].includes(extractedRawName.toLowerCase())
        ? extractedRawName.replace(/\b\w/g, (c) => c.toUpperCase())
        : undefined;

    if (compoundName && (spokenEmailCandidate || extractedMessage || extractedPhone)) {
      actionRegistry.fillContactForm({ name: compoundName, email: spokenEmailCandidate, message: extractedMessage || (extractedPhone ? `Phone: ${extractedPhone}` : undefined) });

      let spokenGuidance = '';
      if (compoundName && spokenEmailCandidate && !extractedMessage) {
        spokenGuidance = `I've entered your Name as ${compoundName} and Email as ${spokenEmailCandidate}. How can we help, or what are your requirements?`;
      } else if (compoundName && !spokenEmailCandidate) {
        spokenGuidance = `I've entered your Full Name as ${compoundName}. What is your Email Address?`;
      } else {
        spokenGuidance = `I have recorded your details for ${compoundName} with email ${spokenEmailCandidate}. Say 'Submit' or click Send Message when you are ready!`;
      }

      return {
        spokenText: spokenGuidance,
        displayText: `Form Updated ✅\n• Full Name: ${compoundName}\n${spokenEmailCandidate ? `• Email Address: ${spokenEmailCandidate}\n` : ''}${extractedMessage ? `• Requirements: ${extractedMessage}\n` : ''}${extractedPhone ? `• Phone: ${extractedPhone}\n` : ''}\n${spokenGuidance}`,
        toolCalls: [{ name: 'fillContactForm', args: { name: compoundName, email: spokenEmailCandidate, message: extractedMessage || extractedPhone } }],
        followUpSuggestions: ["Submit request", "Yes, submit", "Edit details"],
      };
    }

    // 2. Trigger Demo Booking / Open Contact Form
    if (
      query.includes('demo') ||
      query.includes('book a demo') ||
      query.includes('schedule a demo') ||
      query.includes('show demo') ||
      query.includes('i want a demo') ||
      query.includes('book for the demo') ||
      query.includes('booker demo') ||
      query.includes('request demo') ||
      query.includes('how to book a demo') ||
      query.includes('how to book a live demo') ||
      query === 'demo'
    ) {
      actionRegistry.openContactForm();
      return {
        spokenText: "I've opened the demo booking form for you! To get started, what is your full name or institution name?",
        displayText: "Demo Booking Form 📝\nStep 1 of 3: What is your Full Name or Institution Name?\n\n(e.g., 'Pannaga', 'Dr. Ramesh', 'AMC Engineering College')",
        toolCalls: [{ name: 'openContactForm', args: {} }],
        followUpSuggestions: ["My name is Pannaga", "AMC Engineering College", "Dr. Ramesh"],
      };
    }

    // 3. Submission Confirmation (when explicitly confirmed or when at submit step)
    if (
      query === 'submit' ||
      query === 'confirm' ||
      query === 'send' ||
      query === 'send message' ||
      query === 'yes submit' ||
      query === 'okay submit' ||
      query === 'submit demo' ||
      query.includes('send request') ||
      query.includes('submit form') ||
      query.includes('submit the form') ||
      query.includes('send the request') ||
      query.includes('confirm to send') ||
      (isAskingForSubmit && ['yes', 'yeah', 'sure', 'yep', 'ok', 'okay', 'proceed', 'send it', 'please'].includes(query))
    ) {
      actionRegistry.submitContactForm();
      return {
        spokenText: "Your demo request has been submitted successfully! The Stalight team will reach out to schedule your walkthrough.",
        displayText: "Demo Request Submitted! 🎉\nOur team will get in touch with you shortly to schedule your personalized live demo.",
        toolCalls: [{ name: 'submitContactForm', args: {} }],
        followUpSuggestions: ["Explore Stalight Campus", "See pricing plans", "Go to home page"],
      };
    }

    // 4. Step-by-Step Flow: When Asked For Name (Step 1)
    if (isAskingForName && (!isExplicitIntentOrCommand || nameMatch)) {
      if (['ok', 'okay', 'sure', 'yes', 'yeah', 'alright', 'fine', 'yep'].includes(query)) {
        return {
          spokenText: "Great! What is your full name or institution name?",
          displayText: "Demo Booking Form 📝\nStep 1 of 3: Please provide your Full Name or Institution Name.",
          toolCalls: [{ name: 'openContactForm', args: {} }],
          followUpSuggestions: ["My name is...", "AMC Engineering College"],
        };
      }

      const cleanNameCandidate = query
        .replace(/^(?:my\s+name\s+is|i\s+am|this\s+is|name\s+is|institution\s+is|college\s+is|we\s+are|it\s+is)\s+/i, '')
        .trim();

      if (cleanNameCandidate && !reservedNameKeywords.includes(cleanNameCandidate.toLowerCase()) && cleanNameCandidate.length >= 2) {
        const name = cleanNameCandidate.replace(/\b\w/g, (c) => c.toUpperCase());
        actionRegistry.fillContactForm({ name });
        return {
          spokenText: `Got it, ${name}! What is your email address?`,
          displayText: `Demo Booking Form 📝\n• Full Name: ${name} ✅\n\nStep 2 of 3: What is your Email Address?\n(e.g., 'name@institution.edu' or 'name at gmail dot com')`,
          toolCalls: [{ name: 'fillContactForm', args: { name } }],
          followUpSuggestions: ["name@institution.edu", "name at gmail dot com"],
        };
      }
    }

    // 5. Step-by-Step Flow: When Asked For Email (Step 2) or Email Input
    if (
      isAskingForEmail ||
      spokenEmailCandidate ||
      query.includes('@') ||
      query.includes('gmail') ||
      query.includes('yahoo') ||
      query.includes('outlook') ||
      query.includes('at the rate') ||
      query.includes('at the right') ||
      query.includes('at the red')
    ) {
      let email = spokenEmailCandidate || (query.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i)?.[0]);

      // Smart domain autocomplete if user just says "Gmail.com" or "yahoo.com"
      if (!email && isAskingForEmail) {
        const cleanDomain = query.toLowerCase().replace(/^(?:my\s+email\s+is|email\s+is|it\s+is|at\s+)?/i, '').trim();
        if (['gmail.com', 'gmail', 'yahoo.com', 'outlook.com', 'stalight.in', 'hotmail.com'].includes(cleanDomain)) {
          const lastWithFullName = history.find((m) => m.text.includes('Full Name:'));
          const matchedName = lastWithFullName?.text.match(/Full Name:\s*([a-zA-Z0-9_]+)/i)?.[1];
          if (matchedName) {
            const domainSuffix = cleanDomain.includes('.') ? cleanDomain : `${cleanDomain}.com`;
            email = `${matchedName.toLowerCase()}@${domainSuffix}`;
          }
        }
      }

      if (email) {
        actionRegistry.fillContactForm({ email });
        return {
          spokenText: "Thank you! How can we help you, or what are your campus requirements?",
          displayText: `Demo Booking Form 📝\n• Email Address: ${email} ✅\n\nStep 3 of 3: How can we help you, or what are your requirements?\n(e.g., 'We need ERP for 5000 students with AI attendance and exam suite')`,
          toolCalls: [{ name: 'fillContactForm', args: { email } }],
          followUpSuggestions: ["We need Campus ERP for our college", "Interested in AI attendance and exam suite", "Tell us about Sync LMS"],
        };
      } else if (isAskingForEmail && !isExplicitIntentOrCommand) {
        return {
          spokenText: "Could you please share your full email address (for example, name at gmail dot com)?",
          displayText: "Demo Booking Form 📝\nStep 2 of 3: Please provide your Email Address (e.g., 'name@gmail.com' or 'name at gmail dot com').",
          followUpSuggestions: ["name@institution.edu", "name at gmail dot com"],
        };
      }
    }

    // 6. Step-by-Step Flow: When Asked For Requirements / Message (Step 3)
    if (isAskingForMessage && !isExplicitIntentOrCommand && query.length >= 2) {
      const cleanMessage = rawQuery
        .replace(/^(?:my\s+requirement\s+is|requirements\s+are|we\s+need|looking\s+for|we\s+want|how\s+can\s+we\s+help|message\s+is)\s+/i, '')
        .trim();

      if (cleanMessage) {
        actionRegistry.fillContactForm({ message: cleanMessage });
        return {
          spokenText: "I've recorded your requirements! Would you like me to submit your demo request now? You can say 'Submit' or 'Yes'.",
          displayText: `Demo Booking Form 📝\n• Requirements: ${cleanMessage} ✅\n\nStep 4: Ready to submit! Say 'Submit', 'Yes', or click Send Message.`,
          toolCalls: [{ name: 'fillContactForm', args: { message: cleanMessage } }],
          followUpSuggestions: ["Submit request", "Yes, submit", "Edit details"],
        };
      }
    }

    // General Pricing / Access Plans (Evaluated only if not in form fill flow)
    const isPricingQuery =
      (query.includes('pricing') ||
        query.includes('pricings') ||
        query.includes('price') ||
        query.includes('cost') ||
        query.includes('plans') ||
        query.includes('subscription') ||
        query.includes('stalightcampus') ||
        query.includes('how much') ||
        /\b(rates?)\b/i.test(query)) &&
      !query.includes('at the rate') &&
      !query.includes('at the right') &&
      !query.includes('@') &&
      !query.includes('gmail') &&
      !query.includes('yahoo') &&
      !query.includes('email');

    if (isPricingQuery) {
      actionRegistry.navigate('/Stalight-Campus-Access');
      return {
        spokenText: "Stalight Campus offers three core plans: Basic at 150 rupees per student per year, Pro at 200 rupees per student per year, and Advance Enterprise at 250 rupees per student per year. We also offer tailored Custom plans, and all plans include a 14-day free trial. I've taken you to our access plans page.",
        displayText: "Stalight Campus Pricing & Plans 🏷️\n• Basic: ₹150 / student / year (Core Attendance, Portals & Timetables)\n• Pro: ₹200 / student / year (Exam Suite, Fees & Multi-dimensional Analytics - Most Popular)\n• Advance: ₹250 / student / year (HMS, Transport, Library & OBE)\n• Custom: Tailored pricing for enterprise workflows\n\n✨ All plans include a 14-day free trial and full onboarding support!",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Campus-Access' } }],
        followUpSuggestions: ["Tell me about Pro plan", "Tell me about Advance plan", "Book a demo"],
      };
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
      query.includes('product') ||
      query.includes('products') ||
      query.includes('what do you offer') ||
      query.includes('what do they offer') ||
      query.includes('what do they have') ||
      query.includes('what are the products') ||
      query.includes('what products') ||
      query.includes('show products') ||
      query.includes('all products') ||
      query.includes('what solutions') ||
      query.includes('offerings')
    ) {
      actionRegistry.navigate('/', '#products');
      return {
        spokenText: "Stalight offers two flagship platforms: Stalight Campus for college ERP, and Stalight Sync for career placement training.",
        displayText: "Stalight Flagship Products 🚀\n\n1. Stalight Campus (AI College ERP)\n• Facial Attendance & Anti-Proxy Security\n• Fee Management, Exams, Smart Timetables & NAAC/NBA Accreditation\n\n2. Stalight Sync (LMS & Placement Preparation)\n• AI Voice & Coding Mock Interviews\n• Placement Readiness Index (PRI) & Live Coding Lab\n\nWhich product would you like to explore?",
        toolCalls: [{ name: 'navigate', args: { path: '/', hash: '#products' } }],
        followUpSuggestions: ["Tell me about Stalight Campus", "Tell me about Stalight Sync", "Show pricing"],
      };
    }

    // Stalight Campus (Product)
    if (
      (query.includes('campus') ||
        query.includes('college erp') ||
        query.includes('college management')) &&
      !query.includes('difference') &&
      !query.includes('vs') &&
      !query.includes('compare') &&
      !query.includes('lms')
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
      (query.includes('sync') ||
        query.includes('sink') ||
        query.includes('synk') ||
        query.includes('neurosync') ||
        query.includes('neuro sync') ||
        query.includes('lms') ||
        query.includes('mock interview') ||
        query.includes('placement platform')) &&
      !query.includes('difference') &&
      !query.includes('vs') &&
      !query.includes('compare') &&
      !query.includes('erp')
    ) {
      actionRegistry.navigate('/Stalight-Sync');
      return {
        spokenText: "Stalight Sync is our intelligent LMS providing AI mock interviews, coding labs, and placement readiness analytics.",
        displayText: "Stalight Sync is an intelligent LMS and career platform featuring AI mock interviews, live coding practice labs, automated assessment scoring, and placement readiness tracking.",
        toolCalls: [{ name: 'navigate', args: { path: '/Stalight-Sync' } }],
        followUpSuggestions: ["Tell me about AI mock interviews", "What is Stalight Campus?", "Show pricing"],
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


    // Careers / Life at Stalight / Openings / Jobs / Opportunities
    if (
      query === 'career' ||
      query === 'careers' ||
      query === 'job' ||
      query === 'jobs' ||
      query === 'hiring' ||
      query === 'opportunity' ||
      query === 'opportunities' ||
      query.includes('career') ||
      query.includes('careers') ||
      query.includes('job') ||
      query.includes('opportunity') ||
      query.includes('opportunities') ||
      query.includes('vacancy') ||
      query.includes('vacancies') ||
      query.includes('roles') ||
      query.includes('positions') ||
      query.includes('join stalight') ||
      query.includes('join us') ||
      query.includes('work with us') ||
      query.includes('work at stalight') ||
      query.includes('hiring') ||
      query.includes('openings')
    ) {
      if (query.includes('training') || query.includes('bootcamp') || query.includes('courses') || query.includes('skill')) {
        actionRegistry.navigate('/skill-development');
        return {
          spokenText: "We offer career bootcamps in Full Stack, Data Science, and AI/ML with real-world project mentoring.",
          displayText: "Opening Career Training 🚀\n• Full Stack Web Development\n• Data Science & AI/ML\n• Capstone Projects & Placement Mentorship",
          toolCalls: [{ name: 'navigate', args: { path: '/skill-development' } }],
          followUpSuggestions: ["Full stack bootcamp", "AI and ML courses", "Explore Stalight Sync"],
        };
      } else {
        actionRegistry.scrollToSection('careers');
        return {
          spokenText: "At Stalight, you get opportunities in Full Stack Development, AI and Machine Learning engineering, Cloud architecture, and student technical internships. You can send your resume to business at stalight dot in or explore our open roles in the careers section.",
          displayText: "Career Opportunities at Stalight 💼\n• Software Engineering: Full Stack (React/Node), Backend & Cloud (AWS/GCP)\n• AI & Data Science: Machine Learning Engineering & Intelligent Agents\n• Student & Graduate Programs: Hands-on Technical Internships & Placement Bootcamps\n• High-Impact Culture: Ownership on scalable enterprise and campus products\n\n📩 How to apply: Email your resume & portfolio to business@stalight.in!",
          toolCalls: [{ name: 'scrollToSection', args: { section: 'careers' } }],
          followUpSuggestions: ["Career training bootcamps", "Explore IT Services", "Contact our team"],
        };
      }
    }

    // Services Overview / All Services / IT Services
    if (
      !query.includes('terms') &&
      !query.includes('privacy') &&
      !query.includes('policy') &&
      !query.includes('delete') &&
      (
        query === 'services' ||
        query === 'service' ||
        query === 'it services' ||
        query.includes('services') ||
        query.includes('what services') ||
        query.includes('all services') ||
        query.includes('it services') ||
        query.includes('cloud') ||
        query.includes('devops') ||
        query.includes('infrastructure')
      )
    ) {
      actionRegistry.navigate('/services');
      return {
        spokenText: "Stalight provides enterprise software engineering, IT & cloud infrastructure services, and career training programs. I've opened our services page for you.",
        displayText: "Stalight Enterprise Services 🛠️\n• Software Development: Custom Web, Mobile & Cloud Systems\n• IT Services & Cloud: DevOps, Infrastructure & Modernization\n• Career Training: Skill Bootcamps in AI, Data Science & Full-Stack",
        toolCalls: [{ name: 'navigate', args: { path: '/services' } }],
        followUpSuggestions: ["Custom software development", "Cloud & IT services", "Career training bootcamps"],
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

    // Certificate / Offer Verification
    if (
      query.includes('verify') ||
      query.includes('certificate') ||
      query.includes('offer letter') ||
      query.includes('verification') ||
      query.includes('validate')
    ) {
      actionRegistry.navigate('/verify/sample');
      return {
        spokenText: "I've opened the verification portal where you can authenticate official Stalight internship certificates and offer letters.",
        displayText: "Certificate & Offer Verification 🎓\nAuthenticate official credentials issued by Stalight Technologies.\nEnter your Certificate ID to verify status.",
        toolCalls: [{ name: 'navigate', args: { path: '/verify/sample' } }],
        followUpSuggestions: ["Book a demo", "Explore Stalight Campus", "Contact support"],
      };
    }

    // Privacy Policy
    if (
      query.includes('privacy') ||
      query.includes('privacy policy') ||
      query.includes('data protection')
    ) {
      actionRegistry.navigate('/privacy');
      return {
        spokenText: "I've navigated to our Privacy Policy page. Stalight adheres to strict enterprise encryption to protect student and institutional data.",
        displayText: "Privacy Policy 🔒\nStalight Technologies strictly safeguards all institutional and student data with end-to-end encryption.",
        toolCalls: [{ name: 'navigate', args: { path: '/privacy' } }],
      };
    }

    // Terms of Service
    if (
      query.includes('terms') ||
      query.includes('terms of service') ||
      query.includes('terms and conditions') ||
      query.includes('agreement')
    ) {
      actionRegistry.navigate('/terms');
      return {
        spokenText: "I've opened the Terms of Service page outlining platform usage, licensing, and service commitments.",
        displayText: "Terms of Service 📜\nGoverns software licensing, uptime commitments, and usage guidelines for Stalight platforms.",
        toolCalls: [{ name: 'navigate', args: { path: '/terms' } }],
      };
    }

    // Account Deletion
    if (
      query.includes('delete account') ||
      query.includes('account deletion') ||
      query.includes('erase my data')
    ) {
      actionRegistry.navigate('/account-deletion');
      return {
        spokenText: "I've opened the Account Deletion page with instructions to request permanent removal of your account and personal records.",
        displayText: "Account Deletion 🗑️\nSubmit a request for permanent erasure of your account credentials and personal data.",
        toolCalls: [{ name: 'navigate', args: { path: '/account-deletion' } }],
      };
    }

    // Dynamic Time & Date Queries
    if (
      query.includes('what is the time') ||
      query.includes("what's the time") ||
      query === 'time' ||
      query.includes('current time')
    ) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return {
        spokenText: `It's currently ${timeStr}.`,
        displayText: `Current Time ⏰\n${timeStr}`,
        followUpSuggestions: ["Show products", "What is Stalight Campus?"],
      };
    }

    if (
      query.includes("what's today's date") ||
      query.includes('what is the date') ||
      query.includes("today's date") ||
      query === 'date'
    ) {
      const now = new Date();
      const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      return {
        spokenText: `Today is ${dateStr}.`,
        displayText: `Today's Date 📅\n${dateStr}`,
        followUpSuggestions: ["Show products", "Book a demo"],
      };
    }

    // 1. Search General Human Interaction & Conversational Knowledge Base
    const generalMatch = searchGeneralKnowledge(query);
    if (generalMatch) {
      const toolCalls: AssistantToolCall[] = [];
      if (generalMatch.targetRoute && generalMatch.targetRoute !== context.pathname) {
        actionRegistry.navigate(
          generalMatch.targetRoute,
          generalMatch.targetSection ? `#${generalMatch.targetSection}` : undefined
        );
        toolCalls.push({
          name: 'navigate',
          args: { path: generalMatch.targetRoute, hash: generalMatch.targetSection ? `#${generalMatch.targetSection}` : undefined },
        });
      } else if (generalMatch.targetSection) {
        actionRegistry.scrollToSection(generalMatch.targetSection);
        toolCalls.push({ name: 'scrollToSection', args: { section: generalMatch.targetSection } });
      }

      return {
        spokenText: generalMatch.spokenResponse,
        displayText: generalMatch.displayResponse,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
        followUpSuggestions: generalMatch.followUpSuggestions,
      };
    }

    // 2. Search Verified Website Knowledge Base for Domain Match
    const matched = this.searchKnowledgeBase(query);
    if (matched) {
      const toolCalls: AssistantToolCall[] = [];
      if (matched.route && matched.route !== context.pathname) {
        actionRegistry.navigate(matched.route, matched.sectionId ? `#${matched.sectionId}` : undefined);
        toolCalls.push({
          name: 'navigate',
          args: { path: matched.route, hash: matched.sectionId ? `#${matched.sectionId}` : undefined },
        });
      } else if (matched.sectionId) {
        actionRegistry.scrollToSection(matched.sectionId);
        toolCalls.push({ name: 'scrollToSection', args: { section: matched.sectionId } });
      }

      return {
        spokenText: matched.spokenSummary || matched.summary,
        displayText: `${matched.title}\n\n${matched.details || matched.summary}`,
        toolCalls: toolCalls.length > 0 ? toolCalls : undefined,
        followUpSuggestions: matched.relatedQuestions,
      };
    }

    // Friendly fallback with helpful suggestions
    return {
      spokenText: "I'm here to help you navigate Stalight. You can ask about our pricing plans, Stalight Campus, Stalight Sync, or book a live walkthrough demo. What would you like to explore?",
      displayText: "How can I help you today? 🎙️\n\nTry asking:\n• \"Show all plans\" or \"What is Pro plan?\"\n• \"What is Stalight Campus?\"\n• \"Tell me about Stalight Sync\"\n• \"Book a demo\"\n• \"Contact support\"",
      followUpSuggestions: ["Show all plans", "What is Stalight Campus?", "Book a demo"],
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
   * Keyword similarity matching on the verified knowledge base with strict word boundaries
   */
  private searchKnowledgeBase(query: string): KnowledgeItem | null {
    const cleanQuery = query.toLowerCase().trim();
    const words = cleanQuery.split(/\s+/).filter((w) => w.length > 2);
    let bestMatch: KnowledgeItem | null = null;
    let highestScore = 0;

    for (const item of STALIGHT_KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        const cleanKw = kw.toLowerCase().trim();
        if (cleanKw.length <= 2) continue;

        // 1. Exact full query match
        if (cleanQuery === cleanKw) {
          score += 15;
        } else if (cleanKw.includes(' ') && cleanQuery.includes(cleanKw)) {
          // 2. Multi-word exact phrase match (e.g. "what is stalight campus")
          score += 10;
        } else {
          // 3. Strict word-boundary matching (prevents 'pro' from matching 'products')
          const escaped = cleanKw.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
          const regex = new RegExp(`(^|\\b|\\s)${escaped}($|\\b|\\s)`, 'i');
          if (regex.test(cleanQuery)) {
            score += 5;
          }
        }

        // 4. Word-by-word exact token match
        for (const w of words) {
          if (w === cleanKw) {
            score += 2;
          }
        }
      }

      if (score > highestScore && score >= 4) {
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
