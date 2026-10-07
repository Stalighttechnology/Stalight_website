/**
 * Natural Text-to-Speech (TTS) & Audio Effects Service for Stalight Assistant
 * Provides crystal-clear speech synthesis, natural pronunciation, instant interruption,
 * and rock-solid sentence-by-sentence queueing across Chromium, Safari, and Firefox.
 */

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

// Global retainers to prevent Chromium Garbage Collection bug mid-speech
const activeUtterances: SpeechSynthesisUtterance[] = [];

export class TextToSpeechService {
  private synth: SpeechSynthesis | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private audioCtx: AudioContext | null = null;
  private isAudioUnlocked: boolean = false;
  private resumeInterval: ReturnType<typeof setInterval> | null = null;
  private isCancelled: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }

      // Unlock audio hardware on first user interaction anywhere
      const unlockAudio = () => {
        this.unlockAudioEngine();
        window.removeEventListener('click', unlockAudio);
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };

      window.addEventListener('click', unlockAudio, { passive: true });
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
    }
  }

  public unlockAudioEngine() {
    if (this.isAudioUnlocked) return;
    this.isAudioUnlocked = true;

    try {
      if (this.synth) {
        this.synth.resume();
      }

      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        if (!this.audioCtx || this.audioCtx.state === 'closed') {
          this.audioCtx = new AudioCtxClass();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }
      }
    } catch {
      // Ignore
    }
  }

  private loadVoices() {
    if (this.synth) {
      const voices = this.synth.getVoices();
      if (voices && voices.length > 0) {
        this.cachedVoices = voices;
      }
    }
  }

  public isAvailable(): boolean {
    return !!this.synth;
  }

  /**
   * Speak text orally with sentence queueing, natural pacing, and human-like breathing pauses
   */
  public speak(text: string, options: TTSOptions = {}) {
    if (!this.synth) {
      options.onEnd?.();
      return;
    }

    this.unlockAudioEngine();
    this.isCancelled = false;

    const cleanText = this.cleanMarkdownAndUrls(text);
    if (!cleanText.trim()) {
      options.onEnd?.();
      return;
    }

    // Split text into natural conversational chunks/sentences for human-like pacing
    const sentences = this.splitIntoSentences(cleanText);
    if (sentences.length === 0) {
      options.onEnd?.();
      return;
    }

    // Cancel any previous utterance safely
    this.cancel();
    this.isCancelled = false;

    // Small timeout after cancel ensures Chrome audio engine is ready
    setTimeout(() => {
      if (this.isCancelled || !this.synth) return;

      this.synth.resume();

      let currentIndex = 0;
      let hasStarted = false;

      const speakNextChunk = () => {
        if (this.isCancelled || !this.synth) {
          options.onEnd?.();
          return;
        }

        if (currentIndex >= sentences.length) {
          if (this.resumeInterval) clearInterval(this.resumeInterval);
          activeUtterances.length = 0;
          options.onEnd?.();
          return;
        }

        const sentence = sentences[currentIndex];
        currentIndex++;

        try {
          const utterance = new SpeechSynthesisUtterance(sentence);
          // Human conversational tempo: 0.94 rate allows clear articulation with natural pauses
          utterance.rate = options.rate ?? 0.94;
          utterance.pitch = options.pitch ?? 1.0;
          utterance.volume = options.volume ?? 1.0;
          utterance.lang = 'en-IN';

          const voice = this.selectBestVoice();
          if (voice) {
            utterance.voice = voice;
            utterance.lang = voice.lang;
          }

          utterance.onstart = () => {
            if (!hasStarted) {
              hasStarted = true;
              console.log('[TextToSpeech] Speaking orally:', cleanText);
              options.onStart?.();
            }

            // Chromium heartbeat keep-alive
            if (this.resumeInterval) clearInterval(this.resumeInterval);
            this.resumeInterval = setInterval(() => {
              if (this.synth && this.synth.speaking) {
                this.synth.pause();
                this.synth.resume();
              } else {
                if (this.resumeInterval) clearInterval(this.resumeInterval);
              }
            }, 3000);
          };

          utterance.onend = () => {
            if (this.isCancelled) return;
            // Human-like pause (160ms) between sentences to breathe naturally
            setTimeout(() => {
              if (!this.isCancelled) {
                speakNextChunk();
              }
            }, 160);
          };

          utterance.onerror = (e) => {
            if (this.resumeInterval) clearInterval(this.resumeInterval);
            if (e.error !== 'canceled' && e.error !== 'interrupted') {
              console.warn('[TextToSpeech] Synthesis warning:', e.error);
              speakNextChunk();
            } else if (!this.isCancelled) {
              speakNextChunk();
            }
          };

          // Hold strong reference
          activeUtterances.push(utterance);
          this.synth.speak(utterance);
          this.synth.resume();
        } catch (err) {
          console.warn('[TextToSpeech] Speak chunk error:', err);
          speakNextChunk();
        }
      };

      speakNextChunk();
    }, 50);
  }

  /**
   * Immediately stops any active speaking
   */
  public cancel() {
    this.isCancelled = true;
    if (this.resumeInterval) clearInterval(this.resumeInterval);
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    activeUtterances.length = 0;
  }

  /**
   * Plays a subtle, modern audio chime using Web Audio API synthesis
   */
  public playEarcon(type: 'wake' | 'success' | 'dismiss') {
    try {
      this.unlockAudioEngine();

      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx || this.audioCtx.state === 'closed') {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'wake') {
        // Futuristic two-tone Apple/Siri chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'success') {
        // Soft positive chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.32);
      } else {
        // Dismiss tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(330, now + 0.15);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch {
      // Audio playback ignored if blocked by autoplay policy
    }
  }

  private selectBestVoice(): SpeechSynthesisVoice | null {
    if (!this.cachedVoices || this.cachedVoices.length === 0) {
      this.loadVoices();
    }

    if (!this.cachedVoices || this.cachedVoices.length === 0) {
      return null;
    }

    // Explicit female Siri voices across macOS, iOS, Windows, and Android
    // 1. Apple Indian English Female voices (Veena, Lekha, Neerja)
    const indianFemaleNames = ['Veena', 'Lekha', 'Neerja', 'Sangeeta', 'Kajal', 'Heera'];
    for (const name of indianFemaleNames) {
      const match = this.cachedVoices.find(
        (v) =>
          v.name.toLowerCase().includes(name.toLowerCase()) &&
          v.lang.startsWith('en')
      );
      if (match) return match;
    }

    // 2. Apple Classic Siri Female (Samantha - the definitive Apple US Siri Female voice)
    const siriClassic = this.cachedVoices.find(
      (v) =>
        v.name.toLowerCase().includes('samantha') ||
        (v.name.toLowerCase().includes('siri') && !v.name.toLowerCase().includes('male'))
    );
    if (siriClassic) return siriClassic;

    // 3. Apple International Siri Female voices (Karen, Victoria, Serena, Moira, Tessa, Fiona)
    const siriFemaleVoices = [
      'Samantha',
      'Karen',
      'Victoria',
      'Serena',
      'Moira',
      'Tessa',
      'Fiona',
      'Zira',
      'Jenny',
      'Ava',
    ];

    for (const name of siriFemaleVoices) {
      const match = this.cachedVoices.find(
        (v) =>
          v.name.toLowerCase().includes(name.toLowerCase()) &&
          v.lang.startsWith('en')
      );
      if (match) return match;
    }

    // 4. Any English voice marked with 'Female' or en-IN
    const femaleVoice = this.cachedVoices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.toLowerCase().includes('female') || v.lang.toLowerCase().includes('in'))
    );
    if (femaleVoice) return femaleVoice;

    // 5. Default English local voice
    const defaultVoice = this.cachedVoices.find(
      (v) => v.default && v.lang.startsWith('en')
    );
    if (defaultVoice) return defaultVoice;

    return this.cachedVoices.find((v) => v.lang.startsWith('en')) || null;
  }

  private splitIntoSentences(text: string): string[] {
    const rawMatches = text.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g);
    if (!rawMatches) return [text];
    return rawMatches
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  private cleanMarkdownAndUrls(text: string): string {
    return text
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/\bmm\s*[-–]\s*hmm\b/gi, 'Mmhmm')
      .replace(/\buh\s*[-–]\s*huh\b/gi, 'Uh huh')
      .replace(/\bNAAC\/NBA\b/gi, 'NAAC and NBA')
      .replace(/\bstarlight\b/gi, 'Staylight')
      .replace(/\bstar light\b/gi, 'Staylight')
      .replace(/\bstalight\b/gi, 'Staylight')
      .replace(/([.!?])\s*/g, '$1 ')
      .replace(/,\s*/g, ', ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}

export const textToSpeechService = new TextToSpeechService();
