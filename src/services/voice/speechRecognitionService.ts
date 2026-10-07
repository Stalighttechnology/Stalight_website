/**
 * Speech-to-Text Recognition Service for Stalight Assistant
 * Handles real-time streaming speech transcription, silence detection, and error recovery.
 */

import { normalizeStalightPhonetics } from './voicePhonetics';

export interface STTOptions {
  lang?: string;
  interimResults?: boolean;
  onInterim?: (text: string) => void;
  onFinal?: (text: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

interface ISpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface ISpeechRecognitionErrorEvent {
  error: string;
}

interface ISpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export class SpeechRecognitionService {
  private recognition: ISpeechRecognition | null = null;
  private isListening: boolean = false;
  private silenceTimer: ReturnType<typeof setTimeout> | null = null;
  private initialSilenceTimer: ReturnType<typeof setTimeout> | null = null;
  private latestTranscript: string = '';
  private hasDeliveredFinal: boolean = false;
  private readonly postSpeechSilenceTimeoutMs = 1300; // 1.3s natural pause after speaking
  private readonly initialSpeechTimeoutMs = 8000; // 8s patience while waiting for user to start speaking

  constructor() {
    const SpeechRecognitionClass =
      (window as unknown as { SpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-IN';
      this.recognition.maxAlternatives = 1;
    }
  }

  public isAvailable(): boolean {
    return !!this.recognition;
  }

  public startListening(options: STTOptions) {
    if (!this.recognition) {
      options.onError?.('Speech recognition is not supported in this browser.');
      return;
    }

    // Abort any existing STT session cleanly
    this.abort();

    let fullTranscript = '';
    this.latestTranscript = '';
    this.hasDeliveredFinal = false;
    this.isListening = true;

    this.recognition.onstart = () => {
      // Patiently wait up to 8s for user to begin speaking
      this.clearAllTimers();
      this.initialSilenceTimer = setTimeout(() => {
        if (this.isListening && !this.latestTranscript.trim()) {
          this.abort();
          options.onEnd?.();
        }
      }, this.initialSpeechTimeoutMs);
    };

    this.recognition.onresult = (event: ISpeechRecognitionEvent) => {
      // User is actively speaking: clear the initial patience timer
      if (this.initialSilenceTimer) {
        clearTimeout(this.initialSilenceTimer);
        this.initialSilenceTimer = null;
      }

      let interim = '';
      let hasFinalChunk = false;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          fullTranscript += ' ' + event.results[i][0].transcript;
          hasFinalChunk = true;
        } else {
          interim += ' ' + event.results[i][0].transcript;
        }
      }

      const rawActive = (fullTranscript + ' ' + interim).replace(/\s+/g, ' ').trim();
      if (rawActive) {
        this.latestTranscript = rawActive;
        const normalizedActive = normalizeStalightPhonetics(rawActive);
        options.onInterim?.(normalizedActive);

        // Reset post-speech silence timer (e.g. 1000ms if chunk is final, 1300ms for interim)
        const delay = hasFinalChunk && !interim ? 1000 : this.postSpeechSilenceTimeoutMs;
        this.resetPostSpeechTimer(options, delay);
      }
    };

    this.recognition.onerror = (event: ISpeechRecognitionErrorEvent) => {
      this.clearAllTimers();
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.debug('[SpeechRecognition] Event error:', event.error);
        options.onError?.(event.error);
      }
    };

    this.recognition.onend = () => {
      this.clearAllTimers();
      this.isListening = false;

      if (!this.hasDeliveredFinal) {
        const cleanFinal = normalizeStalightPhonetics(this.latestTranscript.trim());
        if (cleanFinal) {
          this.hasDeliveredFinal = true;
          options.onFinal?.(cleanFinal);
        } else {
          options.onEnd?.();
        }
      }
    };

    try {
      this.recognition.start();
    } catch {
      // Ignore start error if already running
    }
  }

  public stopListening() {
    this.clearAllTimers();
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
  }

  public abort() {
    this.clearAllTimers();
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Ignore
      }
    }
  }

  private clearAllTimers() {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.initialSilenceTimer) {
      clearTimeout(this.initialSilenceTimer);
      this.initialSilenceTimer = null;
    }
  }

  private resetPostSpeechTimer(options: STTOptions, timeoutMs = this.postSpeechSilenceTimeoutMs) {
    if (this.silenceTimer) clearTimeout(this.silenceTimer);
    this.silenceTimer = setTimeout(() => {
      if (this.isListening) {
        const textToDeliver = normalizeStalightPhonetics(this.latestTranscript.trim());
        if (textToDeliver) {
          this.hasDeliveredFinal = true;
          this.abort();
          options.onFinal?.(textToDeliver);
        } else {
          this.abort();
          options.onEnd?.();
        }
      }
    }, timeoutMs);
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
