/**
 * Real-time High-Sensitivity On-Device Wake Word Detection Service ("Hey Stalight")
 * Ultra-responsive, modular, zero audio upload.
 */

import { normalizeStalightPhonetics } from './voicePhonetics';

export type WakeWordCallback = (phrase: string, fullTranscript?: string) => void;

interface IWakeWordRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      length: number;
      isFinal: boolean;
      [subIndex: number]: {
        transcript: string;
      };
    };
  };
}

interface IWakeWordRecognitionErrorEvent {
  error: string;
}

interface IWakeWordRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: IWakeWordRecognitionEvent) => void) | null;
  onerror: ((event: IWakeWordRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export class WakeWordService {
  private recognition: IWakeWordRecognition | null = null;
  private isListening: boolean = false;
  private isPaused: boolean = false;
  private onWakeCallback: WakeWordCallback | null = null;
  private lastTriggerTime: number = 0;
  private readonly cooldownMs = 150; // Ultra fast re-arm
  private isSupported: boolean = false;
  private restartTimeout: ReturnType<typeof setTimeout> | null = null;

  // Regex patterns for high-sensitivity acoustic matching of "Stalight"
  private readonly wakeWordRegex =
    /\b(hey|hi|hello|ok|a|yo|say)?\s*(stahlight\s*,?\s*stalight|stalight\s*,?\s*stahlight|stahlight\s*,?\s*stahlight|stalight\s*,?\s*stalight|stalight|starlight|stahlight|stah\s*light|stah\s*lite|stah\s*lit|staylight|stallight|stay\s*light|star\s*light|start\s*light|stall\s*light|sta\w*light|daylight|satellite|the\s*light|stalite|stlight|stlite|delight)\b/i;
  private readonly singleWordRegex =
    /\b(stahlight\s*,?\s*stalight|stalight\s*,?\s*stahlight|stahlight\s*,?\s*stahlight|stalight\s*,?\s*stalight|stalight|starlight|stahlight|stah\s*light|stah\s*lite|stah\s*lit|staylight|stallight|stalite|stlight|stlite|delight)\b/i;

  constructor() {
    this.initRecognition();
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => IWakeWordRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => IWakeWordRecognition }).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      this.isSupported = true;
      try {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-IN';
        this.recognition.maxAlternatives = 10; // Max alternatives for low-voice / whisper detection sensitivity

        this.recognition.onresult = (event: IWakeWordRecognitionEvent) => {
          this.handleSpeechResult(event);
        };

        this.recognition.onerror = (event: IWakeWordRecognitionErrorEvent) => {
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            console.debug('[WakeWord] Recognition event:', event.error);
          }
        };

        this.recognition.onend = () => {
          if (this.isListening && !this.isPaused) {
            this.scheduleRestart(100);
          }
        };
      } catch (e) {
        console.warn('[WakeWord] Initialization failed:', e);
        this.isSupported = false;
      }
    }
  }

  public checkSupport(): boolean {
    return this.isSupported;
  }

  public start(onWake: WakeWordCallback) {
    this.onWakeCallback = onWake;
    if (!this.isSupported) return;

    if (!this.recognition) {
      this.initRecognition();
    }

    this.isListening = true;
    this.isPaused = false;
    this.safeStart();
  }

  public stop() {
    this.isListening = false;
    this.isPaused = false;
    if (this.restartTimeout) clearTimeout(this.restartTimeout);
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
  }

  public pause() {
    this.isPaused = true;
    if (this.restartTimeout) clearTimeout(this.restartTimeout);
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Ignore
      }
    }
  }

  public resume() {
    if (!this.isSupported) return;
    this.isPaused = false;
    if (this.isListening) {
      this.scheduleRestart(150);
    }
  }

  private scheduleRestart(delayMs = 150) {
    if (this.restartTimeout) clearTimeout(this.restartTimeout);
    this.restartTimeout = setTimeout(() => {
      if (this.isListening && !this.isPaused) {
        this.safeStart();
      }
    }, delayMs);
  }

  private safeStart() {
    if (!this.recognition) return;
    try {
      this.recognition.start();
    } catch {
      // Ignore start errors when transitioning
    }
  }

  private handleSpeechResult(event: IWakeWordRecognitionEvent) {
    if (this.isPaused) return;

    const now = Date.now();
    if (now - this.lastTriggerTime < this.cooldownMs) return;

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const result = event.results[i];
      for (let j = 0; j < result.length; ++j) {
        const rawTranscript = result[j].transcript.trim().toLowerCase();
        if (!rawTranscript) continue;

        console.debug('[WakeWord] Listening stream:', rawTranscript);

        // High-sensitivity regex match for "Hey Stalight" or "Stalight"
        const match = rawTranscript.match(this.wakeWordRegex) || rawTranscript.match(this.singleWordRegex);

        if (match) {
          this.lastTriggerTime = now;
          this.isPaused = true; // Prevent duplicate interim triggers for the same phrase
          console.log('[WakeWord] WAKE MATCH: "Hey Stalight"');

          // Extract any query spoken in the same breath
          const matchedPhrase = match[0];
          const phraseIndex = rawTranscript.indexOf(matchedPhrase);
          const rawRemaining = rawTranscript.substring(phraseIndex + matchedPhrase.length).trim();
          
          // Clean up and normalize "Stalight" in the query
          const remainingQuery = normalizeStalightPhonetics(rawRemaining);

          if (this.recognition) {
            try {
              this.recognition.abort();
            } catch {
              // Ignore
            }
          }

          if (this.onWakeCallback) {
            this.onWakeCallback('Hey Stalight', remainingQuery);
          }
          return;
        }

      }
    }
  }
}

export const wakeWordService = new WakeWordService();
