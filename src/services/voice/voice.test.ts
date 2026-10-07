import { describe, it, expect, beforeEach, vi } from 'vitest';
import { voiceIntentEngine } from './voiceIntentEngine';
import { STALIGHT_KNOWLEDGE_BASE } from './voiceKnowledge';
import { actionRegistry } from './voiceTools';
import { WebsiteContext } from '@/types/voice';

describe('Stalight Voice Assistant - Intent Engine & Knowledge Base', () => {
  const dummyContext: WebsiteContext = {
    url: 'https://stalight.in/',
    pathname: '/',
    hash: '',
    title: 'Stalight Technologies',
    activeSection: 'home',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should contain verified knowledge items covering products, services, and pricing', () => {
    expect(STALIGHT_KNOWLEDGE_BASE.length).toBeGreaterThanOrEqual(8);
    const campus = STALIGHT_KNOWLEDGE_BASE.find((k) => k.id === 'product-campus');
    expect(campus).toBeDefined();
    expect(campus?.title).toContain('Stalight Campus');

    const sync = STALIGHT_KNOWLEDGE_BASE.find((k) => k.id === 'product-sync');
    expect(sync).toBeDefined();
    expect(sync?.title).toContain('Stalight Sync');
  });

  it('should accurately handle "What is Stalight Campus?" query', async () => {
    const res = await voiceIntentEngine.processQuery('what is stalight campus', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('campus');
    expect(res.spokenText.toLowerCase()).toContain('erp');
  });

  it('should accurately handle attendance features inquiry', async () => {
    const res = await voiceIntentEngine.processQuery('tell me about attendance features', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('facial recognition');
    expect(res.toolCalls?.[0]?.name).toBe('scrollToSection');
  });

  it('should trigger navigation and provide pricing info for pricing/access plans', async () => {
    const res = await voiceIntentEngine.processQuery('take me to pricing', dummyContext);
    expect(res.spokenText).toContain('150');
    expect(res.spokenText).toContain('200');
    expect(res.spokenText).toContain('250');
    expect(res.spokenText).toContain('14-day free trial');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/Stalight-Campus-Access');
  });

  it('should trigger demo form action and follow step-by-step multi-turn guided flow', async () => {
    // Step 1: User initiates demo booking
    const step1 = await voiceIntentEngine.processQuery('How to book a live demo', dummyContext);
    expect(step1.toolCalls?.[0]?.name).toBe('openContactForm');
    expect(step1.spokenText).toContain('full name or institution name');
    expect(step1.displayText).toContain('Step 1 of 3');

    // Step 1b: User says "Okay" / filler
    const step1b = await voiceIntentEngine.processQuery('Okay', dummyContext, [
      { id: '1', sender: 'assistant', text: step1.displayText, timestamp: Date.now() },
    ]);
    expect(step1b.spokenText).toContain('full name or institution name');

    // Step 2: User provides name
    const step2 = await voiceIntentEngine.processQuery('My name is Pannaga', dummyContext, [
      { id: '2', sender: 'assistant', text: step1b.displayText, timestamp: Date.now() },
    ]);
    expect(step2.spokenText).toContain('Pannaga');
    expect(step2.spokenText).toContain('email address');
    expect(step2.toolCalls?.[0]?.name).toBe('fillContactForm');
    expect(step2.toolCalls?.[0]?.args?.name).toBe('Pannaga');

    // Step 3: User provides email
    const step3 = await voiceIntentEngine.processQuery('pannaga at gmail dot com', dummyContext, [
      { id: '3', sender: 'assistant', text: step2.displayText, timestamp: Date.now() },
    ]);
    expect(step3.spokenText).toContain('requirements');
    expect(step3.toolCalls?.[0]?.name).toBe('fillContactForm');
    expect(step3.toolCalls?.[0]?.args?.email).toBe('pannaga@gmail.com');

    // Step 4: User provides requirements
    const step4 = await voiceIntentEngine.processQuery('We need ERP for 5000 students and biometric attendance', dummyContext, [
      { id: '4', sender: 'assistant', text: step3.displayText, timestamp: Date.now() },
    ]);
    expect(step4.spokenText).toContain('submit your demo request now');
    expect(step4.toolCalls?.[0]?.name).toBe('fillContactForm');
    expect(step4.toolCalls?.[0]?.args?.message).toContain('ERP for 5000 students');

    // Step 5: User confirms submission
    const step5 = await voiceIntentEngine.processQuery('Yes', dummyContext, [
      { id: '5', sender: 'assistant', text: step4.displayText, timestamp: Date.now() },
    ]);
    expect(step5.spokenText).toContain('submitted successfully');
    expect(step5.toolCalls?.[0]?.name).toBe('submitContactForm');
  });

  it('should navigate to home and provide guidance', async () => {
    const res = await voiceIntentEngine.processQuery('go to home page', dummyContext);
    expect(res.spokenText).toContain('home page');
    expect(res.spokenText).toContain('Basic, Pro, and Advance');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/');
  });

  it('should explain specific model plans (Basic, Pro, Advance) with actual prices', async () => {
    const basicRes = await voiceIntentEngine.processQuery('tell me about basic plan', dummyContext);
    expect(basicRes.spokenText).toContain('150');
    expect(basicRes.toolCalls?.[0]?.args?.path).toBe('/Stalight-Campus-Access');

    const proRes = await voiceIntentEngine.processQuery('what is pro plan', dummyContext);
    expect(proRes.spokenText).toContain('200');
    expect(proRes.toolCalls?.[0]?.args?.path).toBe('/Stalight-Campus-Access');

    const advRes = await voiceIntentEngine.processQuery('tell me about advance plan', dummyContext);
    expect(advRes.spokenText).toContain('250');
    expect(advRes.toolCalls?.[0]?.args?.path).toBe('/Stalight-Campus-Access');
  });

  it('should handle demo submission confirmation', async () => {
    const res = await voiceIntentEngine.processQuery('confirm to send the request', dummyContext);
    expect(res.spokenText).toContain('demo request has been submitted');
    expect(res.toolCalls?.[0]?.name).toBe('submitContactForm');
  });

  it('should trigger contact action for "how do I contact you"', async () => {
    const res = await voiceIntentEngine.processQuery('how do I contact you', dummyContext);
    expect(res.toolCalls?.[0]?.name).toBe('openContactForm');
  });

  it('should trigger scroll down for "scroll down"', async () => {
    const res = await voiceIntentEngine.processQuery('scroll down', dummyContext);
    expect(res.spokenText).toBe('Scrolling down.');
  });

  it('should resolve contextual deictic queries on the Campus page', async () => {
    const campusContext: WebsiteContext = {
      url: 'https://stalight.in/Stalight-Campus',
      pathname: '/Stalight-Campus',
      hash: '',
      title: 'Stalight Campus ERP',
      activeSection: 'features',
    };

    const res = await voiceIntentEngine.processQuery('tell me more about this', campusContext);
    expect(res.spokenText.toLowerCase()).toContain('campus');
  });

  it('should accurately normalize acoustic speech variants of Stalight', async () => {
    const { normalizeStalightPhonetics } = await import('./voicePhonetics');
    expect(normalizeStalightPhonetics('open the light campus')).toBe('open Stalight campus');
    expect(normalizeStalightPhonetics('tell me about starlight sync')).toBe('tell me about Stalight sync');
    expect(normalizeStalightPhonetics('what is stay light erp')).toBe('what is Stalight erp');
    expect(normalizeStalightPhonetics('hey stallight show pricing')).toBe('hey Stalight show pricing');
    expect(normalizeStalightPhonetics('light campus features')).toBe('Stalight campus features');
    expect(normalizeStalightPhonetics('bouquet demo')).toBe('book a demo');
    expect(normalizeStalightPhonetics('hey stah light')).toBe('hey Stalight');
    expect(normalizeStalightPhonetics('what is stahlight')).toBe('what is Stalight');
    expect(normalizeStalightPhonetics('stahlight stalight')).toBe('Stalight');
    expect(normalizeStalightPhonetics('stalight, stalight')).toBe('Stalight');
    expect(normalizeStalightPhonetics('what is stalight sink')).toBe('what is Stalight sync');
    expect(normalizeStalightPhonetics('tell me about sink')).toBe('tell me about sync');
    expect(normalizeStalightPhonetics('open neuro sink')).toBe('open Stalight sync');
  });

  it('should accurately handle "What is Stalight sink" and route to Stalight Sync', async () => {
    const res = await voiceIntentEngine.processQuery('what is stalight sink', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('sync');
    expect(res.spokenText.toLowerCase()).toContain('mock interview');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/Stalight-Sync');
  });

  it('should accurately parse spoken emails with speech recognition artifacts', async () => {
    const { parseSpokenEmail } = await import('./voicePhonetics');
    expect(parseSpokenEmail('Email address is Ragu at the right gmail.com')).toBe('ragu@gmail.com');
    expect(parseSpokenEmail('ragu at the rate gmail dot com')).toBe('ragu@gmail.com');
    expect(parseSpokenEmail('ragu at the rate of gmail.com')).toBe('ragu@gmail.com');
    expect(parseSpokenEmail('my email is pannaga dot j at stalight dot in')).toBe('pannaga.j@stalight.in');
    expect(parseSpokenEmail('test123 at the right yahoo.com')).toBe('test123@yahoo.com');
  });

  it('should extract voice form fields for name, email, and phone', async () => {
    const res = await voiceIntentEngine.processQuery('My name is Pannagaja, email is contact@stalight.in', dummyContext);
    expect(res.spokenText).toContain('Pannagaja');
    expect(res.spokenText).toContain('contact@stalight.in');
    expect(res.toolCalls?.[0]?.name).toBe('fillContactForm');

    // Follow-up email after name prompt:
    const emailFollowUp = await voiceIntentEngine.processQuery(
      'Email address is Ragu at the right gmail.com',
      dummyContext,
      [{ id: '1', sender: 'assistant', text: "Form Updated ✅ • Full Name: Paragu. What is your Email Address?", timestamp: Date.now() }]
    );
    expect(emailFollowUp.displayText).toContain('ragu@gmail.com');
    expect(emailFollowUp.toolCalls?.[0]?.args?.email).toBe('ragu@gmail.com');
  });

  it('should provide comprehensive answers for ERP and LMS definitions', async () => {
    const erpRes = await voiceIntentEngine.processQuery('what is erp', dummyContext);
    expect(erpRes.spokenText).toContain('Enterprise Resource Planning');

    const lmsRes = await voiceIntentEngine.processQuery('what is lms', dummyContext);
    expect(lmsRes.spokenText).toContain('Learning Management System');
  });

  it('should answer contact number and location questions', async () => {
    const res = await voiceIntentEngine.processQuery('what is your contact number', dummyContext);
    expect(res.spokenText).toContain('+91 91105 51102');
    expect(res.spokenText).toContain('Bengaluru');
  });

  it('should handle "how to connect" and open contact form with details', async () => {
    const res = await voiceIntentEngine.processQuery('how to connect', dummyContext);
    expect(res.spokenText).toContain('support@stalight.in');
    expect(res.spokenText).toContain('+91 91105 51102');
    expect(res.toolCalls?.[0]?.name).toBe('openContactForm');
  });

  it('should handle contextual connect confirmation when asked by assistant', async () => {
    const mockHistory = [
      {
        id: '1',
        sender: 'assistant' as const,
        text: 'I can connect you with the Stalight team for more details.',
        timestamp: Date.now() - 1000,
      },
    ];
    const res = await voiceIntentEngine.processQuery('yes please', dummyContext, mockHistory);
    expect(res.spokenText).toContain('opened the contact form');
    expect(res.toolCalls?.[0]?.name).toBe('openContactForm');
  });

  it('should navigate to certificate verification portal for verify queries', async () => {
    const res = await voiceIntentEngine.processQuery('how to verify certificate', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('verification portal');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/verify/sample');
  });

  it('should navigate to Privacy Policy page for privacy queries', async () => {
    const res = await voiceIntentEngine.processQuery('show privacy policy', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('privacy policy');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/privacy');
  });

  it('should navigate to Terms of Service page for terms queries', async () => {
    const res = await voiceIntentEngine.processQuery('what are the terms of service', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('terms of service');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/terms');
  });

  it('should navigate to Account Deletion page for delete account queries', async () => {
    const res = await voiceIntentEngine.processQuery('how to delete account', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('account deletion');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/account-deletion');
  });

  it('should accurately handle "what are the products they have" and return products overview instead of pricing', async () => {
    const res = await voiceIntentEngine.processQuery('what are the products they have', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('flagship');
    expect(res.spokenText.toLowerCase()).toContain('campus');
    expect(res.spokenText.toLowerCase()).toContain('sync');
    expect(res.displayText).toContain('Stalight Flagship Products');
    expect(res.displayText).not.toContain('₹200 / student / year');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.hash).toBe('#products');
  });

  it('should answer general human conversational questions from generalKnowledge base', async () => {
    // 1. "How are you?"
    const howAreYou = await voiceIntentEngine.processQuery('how are you', dummyContext);
    expect(howAreYou.spokenText.toLowerCase()).toContain('doing great');

    // 2. "Who made you?"
    const whoMadeYou = await voiceIntentEngine.processQuery('who made you', dummyContext);
    expect(whoMadeYou.spokenText.toLowerCase()).toContain('stalight technologies');

    // 3. "Thank you"
    const thanks = await voiceIntentEngine.processQuery('thank you so much', dummyContext);
    expect(thanks.spokenText.toLowerCase()).toContain('welcome');

    // 4. "Why choose Stalight?"
    const whyStalight = await voiceIntentEngine.processQuery('why should colleges choose stalight', dummyContext);
    expect(whyStalight.spokenText.toLowerCase()).toContain('facial attendance');

    // 5. "Difference between ERP and LMS"
    const erpLms = await voiceIntentEngine.processQuery('difference between erp and lms', dummyContext);
    expect(erpLms.spokenText.toLowerCase()).toContain('campus');
    expect(erpLms.spokenText.toLowerCase()).toContain('sync');

    // 6. "Is my data secure?"
    const security = await voiceIntentEngine.processQuery('is student data safe', dummyContext);
    expect(security.spokenText.toLowerCase()).toContain('encryption');

    // 7. "Tell me a joke"
    const joke = await voiceIntentEngine.processQuery('tell me a joke', dummyContext);
    expect(joke.spokenText.toLowerCase()).toContain('dark mode');
  });

  it('should accurately handle "All" or "all plans" and list all four tiers', async () => {
    const res = await voiceIntentEngine.processQuery('all', dummyContext);
    expect(res.spokenText).toContain('150');
    expect(res.spokenText).toContain('200');
    expect(res.spokenText).toContain('250');
    expect(res.spokenText).toContain('Custom');
    expect(res.displayText).toContain('Complete Access Plans');
    expect(res.toolCalls?.[0]?.args?.path).toBe('/Stalight-Campus-Access');

    const res2 = await voiceIntentEngine.processQuery('all plans', dummyContext);
    expect(res2.spokenText).toContain('150');
    expect(res2.spokenText).toContain('200');
    expect(res2.spokenText).toContain('250');
  });

  it('should handle active listening triggers like "I said" and "can you hear me"', async () => {
    const res = await voiceIntentEngine.processQuery('I said', dummyContext);
    expect(res.spokenText.toLowerCase()).toContain('listening');
    expect(res.displayText).toContain('listening');

    const res2 = await voiceIntentEngine.processQuery('can you hear me', dummyContext);
    expect(res2.spokenText.toLowerCase()).toContain('listening');
  });

  it('should accurately handle "Name at the rate gmail.com" and domain-only email inputs in step 2 without triggering pricing', async () => {
    const mockStep1History = [
      {
        id: '1',
        sender: 'assistant' as const,
        text: "Demo Booking Form 📝 • Full Name: Panaga ✅\n\nStep 2 of 3: What is your Email Address?",
        timestamp: Date.now() - 1000,
      },
    ];

    // 1. "Name at the rate gmail.com"
    const res1 = await voiceIntentEngine.processQuery('Name at the rate gmail.com', dummyContext, mockStep1History);
    expect(res1.spokenText).not.toContain('₹150');
    expect(res1.spokenText).not.toContain('Basic at 150');
    expect(res1.spokenText.toLowerCase()).toContain('requirements');
    expect(res1.displayText).toContain('name@gmail.com');
    expect(res1.toolCalls?.[0]?.name).toBe('fillContactForm');
    expect(res1.toolCalls?.[0]?.args?.email).toBe('name@gmail.com');

    // 2. "Gmail.com" after Panaga
    const res2 = await voiceIntentEngine.processQuery('Gmail.com', dummyContext, mockStep1History);
    expect(res2.spokenText).not.toContain('₹150');
    expect(res2.displayText).toContain('panaga@gmail.com');
    expect(res2.toolCalls?.[0]?.args?.email).toBe('panaga@gmail.com');
  });

  it('should allow user to break out of form loop or cancel with "Go to pricings" or "Don\'t want"', async () => {
    const mockStep2History = [
      {
        id: '1',
        sender: 'assistant' as const,
        text: "Demo Booking Form 📝\nStep 2 of 3: Please provide your Email Address (e.g., 'name@gmail.com' or 'name at gmail dot com').",
        timestamp: Date.now() - 1000,
      },
    ];

    // 1. User says "Go to pricings" instead of email
    const pricingRes = await voiceIntentEngine.processQuery('Go to pricings', dummyContext, mockStep2History);
    expect(pricingRes.spokenText).toContain('150');
    expect(pricingRes.displayText).toContain('Pricing & Plans');
    expect(pricingRes.toolCalls?.[0]?.name).toBe('navigate');
    expect(pricingRes.toolCalls?.[0]?.args?.path).toBe('/Stalight-Campus-Access');

    // 2. User says "Don't want"
    const cancelRes = await voiceIntentEngine.processQuery("Don't want", dummyContext, mockStep2History);
    expect(cancelRes.spokenText.toLowerCase()).toContain('cancelled');
    expect(cancelRes.displayText).toContain('Form Cancelled');

    // 3. User says "cancel"
    const cancelRes2 = await voiceIntentEngine.processQuery("cancel", dummyContext, mockStep2History);
    expect(cancelRes2.spokenText.toLowerCase()).toContain('cancelled');
    expect(cancelRes2.displayText).toContain('Form Cancelled');
  });

  it('should accurately handle "go to services" and "services" and navigate to /services', async () => {
    const res1 = await voiceIntentEngine.processQuery('go to services', dummyContext);
    expect(res1.spokenText.toLowerCase()).toContain('services');
    expect(res1.toolCalls?.[0]?.name).toBe('navigate');
    expect(res1.toolCalls?.[0]?.args?.path).toBe('/services');

    const res2 = await voiceIntentEngine.processQuery('services', dummyContext);
    expect(res2.spokenText.toLowerCase()).toContain('services');
    expect(res2.toolCalls?.[0]?.name).toBe('navigate');
    expect(res2.toolCalls?.[0]?.args?.path).toBe('/services');
  });

  it('should accurately handle "go to career" and "careers" and navigate to careers section', async () => {
    const res1 = await voiceIntentEngine.processQuery('go to career', dummyContext);
    expect(res1.spokenText.toLowerCase()).toContain('career');
    expect(res1.toolCalls?.[0]?.name).toBe('scrollToSection');
    expect(res1.toolCalls?.[0]?.args?.section).toBe('careers');

    const res2 = await voiceIntentEngine.processQuery('careers', dummyContext);
    expect(res2.spokenText.toLowerCase()).toContain('career');
    expect(res2.toolCalls?.[0]?.name).toBe('scrollToSection');
    expect(res2.toolCalls?.[0]?.args?.section).toBe('careers');
  });

  it('should accurately answer "What in the opportunities I get" and "What the careers I get in Stalight Technologies"', async () => {
    const res1 = await voiceIntentEngine.processQuery('What in the opportunities I get', dummyContext);
    expect(res1.spokenText.toLowerCase()).toContain('opportunities');
    expect(res1.displayText).toContain('Career Opportunities at Stalight');
    expect(res1.toolCalls?.[0]?.name).toBe('scrollToSection');
    expect(res1.toolCalls?.[0]?.args?.section).toBe('careers');

    const res2 = await voiceIntentEngine.processQuery('What the careers I get in Stalight Technologies', dummyContext);
    expect(res2.spokenText.toLowerCase()).toContain('stalight');
    expect(res2.displayText).toContain('Career Opportunities at Stalight');
  });
});





