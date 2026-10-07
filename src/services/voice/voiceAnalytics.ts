/**
 * Anonymous Privacy-Compliant Voice Analytics for Stalight Assistant
 * Does NOT collect or transmit raw audio recordings or sensitive PII.
 */

import { VoiceAnalyticsEvent } from '@/types/voice';

export class VoiceAnalyticsService {
  private events: VoiceAnalyticsEvent[] = [];

  public track(event: VoiceAnalyticsEvent['event'], details?: Record<string, unknown>) {
    const payload: VoiceAnalyticsEvent = {
      event,
      details,
      timestamp: Date.now(),
    };

    this.events.push(payload);
    if (this.events.length > 50) {
      this.events.shift();
    }

    // Optional console log for development debugging
    if (process.env.NODE_ENV === 'development') {
      console.debug('[VoiceAnalytics]', event, details || '');
    }

    // If window.gtag exists, bridge events safely
    const win = window as unknown as { gtag?: (type: string, name: string, params: Record<string, unknown>) => void };
    if (typeof window !== 'undefined' && win.gtag) {
      try {
        win.gtag('event', event, {
          event_category: 'voice_assistant',
          ...details,
        });
      } catch {
        // Ignore analytics delivery errors
      }
    }
  }

  public getRecentEvents(): VoiceAnalyticsEvent[] {
    return [...this.events];
  }
}

export const voiceAnalytics = new VoiceAnalyticsService();
