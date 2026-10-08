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

export const isBraveBrowser = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  try {
    // @ts-expect-error - brave is a proprietary navigator property in Brave
    if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
      // @ts-expect-error - brave is a proprietary navigator property in Brave
      return await navigator.brave.isBrave();
    }
  } catch {
    // ignore
  }
  return false;
};

export class WakeWordService {
  private recognition: IWakeWordRecognition | null = null;
  private isListening: boolean = false;
  private isPaused: boolean = false;
  private onWakeCallback: WakeWordCallback | null = null;
  private lastTriggerTime: number = 0;
  private readonly cooldownMs = 150; // Ultra fast re-arm
  private isSupported: boolean = false;
  private restartTimeout: ReturnType<typeof setTimeout> | null = null;
  private watchdogInterval: ReturnType<typeof setInterval> | null = null;
  private isRecognitionRunning: boolean = false;
  private restartDelayMs: number = 150;

  // Regex patterns for high-sensitivity acoustic matching of "Stalight" / "Stahlight" / "Starlight" across all accents & speech engines
  private readonly wakeWordRegex =
    /\b(hey|hi|hello|ok|okay|a|yo|say|tell|please)?\s*(stahlight\s+stalight|stalight\s+stahlight|stahlight\s+stahlight|stalight\s+stalight|starlight\s+starlight|stahlight|stalight|starlight|stah\s*light|star\s*light|sta\s*light|stay\s*light|staylight|stallight|stall\s*light|start\s*light|startlight|star\s*lite|starlite|stah\s*lite|stah\s*lit|star\s*lit|starlet|starlette|sterlite|stilite|straight\s*light|daylight|day\s*light|delight|satellite|the\s*light|stlight|stlite|stlit|st\s*light|sky\s*light|skylight|spot\s*light|spotlight|stop\s*light|stoplight|star\s*like|star\s*life|star\s*line|star\s*night|star\s*late|stalid|staled|stelid)\b/i;

  private readonly singleWordRegex =
    /\b(stahlight|stalight|starlight|stah\s*light|star\s*light|sta\s*light|stay\s*light|staylight|stallight|stall\s*light|start\s*light|startlight|star\s*lite|starlite|stah\s*lite|stah\s*lit|star\s*lit|starlet|starlette|sterlite|stilite|straight\s*light|daylight|day\s*light|delight|satellite|the\s*light|stlight|stlite|stlit|st\s*light|sky\s*light|skylight|spot\s*light|spotlight|stop\s*light|stoplight|star\s*like|star\s*life|star\s*line|star\s*night|star\s*late|stalid|staled|stelid)\b/i;

  constructor() {
    this.initRecognition();
    this.setupLifecycleListeners();
  }

  private getPreferredLanguage(): string {
    if (typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.toLowerCase().startsWith('en')) {
        return navigator.language;
      }
    }
    return 'en-US';
  }

  private initRecognition() {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => IWakeWordRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => IWakeWordRecognition }).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      this.isSupported = true;
      try {
        if (this.recognition) {
          try {
            this.recognition.abort();
          } catch {
            // ignore
          }
        }

        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.getPreferredLanguage();
        this.recognition.maxAlternatives = 10; // Max alternatives for low-voice / whisper / accent detection sensitivity

        this.recognition.onresult = (event: IWakeWordRecognitionEvent) => {
          this.handleSpeechResult(event);
        };

        this.recognition.onerror = (event: IWakeWordRecognitionErrorEvent) => {
          this.isRecognitionRunning = false;
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            console.warn('[WakeWord] Mic permission not allowed:', event.error);
            this.isListening = false;
            return;
          }
          if (event.error === 'network') {
            // In Brave, Google Speech Services are off by default which returns 'network' error
            console.debug('[WakeWord] Speech recognition network unreachable (in Brave, enable "Google services for voice recognition" in brave://settings/extensions).');
            this.restartDelayMs = 5000;
            return;
          }
          if (event.error !== 'no-speech' && event.error !== 'aborted') {
            console.debug('[WakeWord] Recognition event:', event.error);
          }
        };

        this.recognition.onend = () => {
          this.isRecognitionRunning = false;
          if (this.isListening && !this.isPaused) {
            const delay = this.restartDelayMs;
            this.restartDelayMs = 150; // reset to fast re-arm
            this.scheduleRestart(delay);
          }
        };
      } catch (e) {
        console.warn('[WakeWord] Initialization failed:', e);
        this.isSupported = false;
      }
    }
  }

  private setupLifecycleListeners() {
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && this.isListening && !this.isPaused) {
          this.scheduleRestart(100);
        }
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', () => {
        if (this.isListening && !this.isPaused) {
          this.scheduleRestart(100);
        }
      });
    }
  }

  private startWatchdog() {
    this.stopWatchdog();
    this.watchdogInterval = setInterval(() => {
      if (this.isListening && !this.isPaused && !this.isRecognitionRunning) {
        this.safeStart();
      }
    }, 3500);
  }

  private stopWatchdog() {
    if (this.watchdogInterval) {
      clearInterval(this.watchdogInterval);
      this.watchdogInterval = null;
    }
  }

  public checkSupport(): boolean {
    return this.isSupported;
  }

  public start(onWake: WakeWordCallback) {
    this.onWakeCallback = onWake;
    if (!this.isSupported) return;

    this.isListening = true;
    this.isPaused = false;
    this.startWatchdog();
    this.safeStart();
  }

  public stop() {
    this.isListening = false;
    this.isPaused = false;
    this.isRecognitionRunning = false;
    this.stopWatchdog();
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
    this.isRecognitionRunning = false;
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
    if (!this.isSupported || !this.isListening || this.isPaused) return;

    if (!this.recognition) {
      this.initRecognition();
    }

    try {
      this.recognition?.start();
      this.isRecognitionRunning = true;
    } catch (err: unknown) {
      const errStr = String(err);
      if (errStr.includes('already started')) {
        this.isRecognitionRunning = true;
        return;
      }
      // Re-create instance on zombie state
      this.initRecognition();
      try {
        this.recognition?.start();
        this.isRecognitionRunning = true;
      } catch {
        this.isRecognitionRunning = false;
        this.scheduleRestart(400);
      }
    }
  }

  private handleSpeechResult(event: IWakeWordRecognitionEvent) {
    if (this.isPaused) return;

    const now = Date.now();
    if (now - this.lastTriggerTime < this.cooldownMs) return;

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const result = event.results[i];
      for (let j = 0; j < result.length; ++j) {
        const raw = result[j].transcript;
        if (!raw) continue;
        const rawTranscript = raw.trim().toLowerCase();

        console.debug('[WakeWord] Listening stream:', rawTranscript);

        // Normalize punctuation, hyphens, and whitespace
        const cleanTranscript = rawTranscript
          .replace(/[–—_\-]/g, ' ')
          .replace(/[^a-z0-9\s]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        // High-sensitivity regex match for "Hey Stalight" or "Stalight"
        const match =
          cleanTranscript.match(this.wakeWordRegex) ||
          cleanTranscript.match(this.singleWordRegex) ||
          rawTranscript.match(this.wakeWordRegex) ||
          rawTranscript.match(this.singleWordRegex);

        if (match) {
          this.lastTriggerTime = now;
          this.isPaused = true; // Prevent duplicate interim triggers for the same phrase
          console.log('[WakeWord] WAKE MATCH:', match[0]);

          // Extract any query spoken in the same breath
          const matchedPhrase = match[0];
          const phraseIndex = cleanTranscript.indexOf(matchedPhrase);
          const rawRemaining =
            phraseIndex >= 0
              ? cleanTranscript.substring(phraseIndex + matchedPhrase.length).trim()
              : '';

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

