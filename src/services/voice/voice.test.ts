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

  it('should trigger navigation and provide pricing URL for pricing/access plans', async () => {
    const res = await voiceIntentEngine.processQuery('take me to pricing', dummyContext);
    expect(res.spokenText).toContain('150');
    expect(res.spokenText).toContain('200');
    expect(res.spokenText).toContain('250');
    expect(res.displayText).toContain('https://campus.stalight.in/stalightcampus');
    expect(res.toolCalls?.[0]?.name).toBe('navigate');
    expect(res.toolCalls?.[0]?.args?.path).toBe('https://campus.stalight.in/stalightcampus');
  });

  it('should trigger demo form action for "I want a demo", "book a demo", and "booker demo"', async () => {
    const res1 = await voiceIntentEngine.processQuery('I want a demo', dummyContext);
    expect(res1.toolCalls?.[0]?.name).toBe('openContactForm');
    expect(res1.spokenText).toContain('demo booking form');

    const res2 = await voiceIntentEngine.processQuery('book a demo', dummyContext);
    expect(res2.toolCalls?.[0]?.name).toBe('openContactForm');
    expect(res2.toolCalls?.[0]?.name).not.toBe('fillContactForm');

    const res3 = await voiceIntentEngine.processQuery('booker demo', dummyContext);
    expect(res3.toolCalls?.[0]?.name).toBe('openContactForm');
    expect(res3.toolCalls?.[0]?.name).not.toBe('fillContactForm');
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
    expect(basicRes.toolCalls?.[0]?.args?.path).toBe('https://campus.stalight.in/stalightcampus');

    const proRes = await voiceIntentEngine.processQuery('what is pro plan', dummyContext);
    expect(proRes.spokenText).toContain('200');
    expect(proRes.toolCalls?.[0]?.args?.path).toBe('https://campus.stalight.in/stalightcampus');

    const advRes = await voiceIntentEngine.processQuery('tell me about advance plan', dummyContext);
    expect(advRes.spokenText).toContain('250');
    expect(advRes.toolCalls?.[0]?.args?.path).toBe('https://campus.stalight.in/stalightcampus');
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
});
