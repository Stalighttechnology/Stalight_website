/**
 * Global Voice Assistant Context & Production State Machine
 * Manages audio lifecycle, on-device wake-word detection, speech pipeline, and website context.
 */

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  VoiceState,
  MicPermissionState,
  WebsiteContext,
  VoiceMessage,
  VoiceAssistantSettings,
} from '@/types/voice';
import { wakeWordService } from '@/services/voice/wakeWordService';
import { speechRecognitionService } from '@/services/voice/speechRecognitionService';
import { textToSpeechService } from '@/services/voice/textToSpeechService';
import { voiceIntentEngine } from '@/services/voice/voiceIntentEngine';
import { actionRegistry } from '@/services/voice/voiceTools';
import { voiceAnalytics } from '@/services/voice/voiceAnalytics';
import { normalizeStalightPhonetics } from '@/services/voice/voicePhonetics';

export interface VoiceAssistantContextValue {
  state: VoiceState;
  permissionState: MicPermissionState;
  currentTranscript: string;
  assistantResponseText: string;
  messages: VoiceMessage[];
  micStream: MediaStream | null;
  isWakeWordSupported: boolean;
  settings: VoiceAssistantSettings;
  updateSettings: (newSettings: Partial<VoiceAssistantSettings>) => void;
  requestPermission: () => Promise<boolean>;
  startListening: () => void;
  stopListening: () => void;
  cancel: () => void;
  toggleMute: () => void;
  sendTextQuery: (text: string) => Promise<void>;
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  lastWakePhrase: string | null;
}

const defaultSettings: VoiceAssistantSettings = {
  wakeWordEnabled: true,
  speechSynthesisEnabled: true,
  soundEffectsEnabled: true,
  autoListenAfterWake: true,
  voiceVolume: 1.0,
  voiceRate: 0.98,
  voicePitch: 1.03,
};

const VoiceAssistantContext = createContext<VoiceAssistantContextValue | null>(null);

export const VoiceAssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<VoiceState>('INITIALIZING');
  const [permissionState, setPermissionState] = useState<MicPermissionState>('prompt');
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [assistantResponseText, setAssistantResponseText] = useState<string>('');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [micStream, setMicStream] = useState<MediaStream | null>(null);
  const [isWakeWordSupported, setIsWakeWordSupported] = useState<boolean>(true);
  const [settings, setSettings] = useState<VoiceAssistantSettings>(() => {
    try {
      const saved = localStorage.getItem('stalight_voice_settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [lastWakePhrase, setLastWakePhrase] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const stateRef = useRef<VoiceState>(state);
  stateRef.current = state;
  const micStreamRef = useRef<MediaStream | null>(null);
  const messagesRef = useRef<VoiceMessage[]>(messages);
  messagesRef.current = messages;
  const settingsRef = useRef<VoiceAssistantSettings>(settings);
  settingsRef.current = settings;
  const permissionStateRef = useRef<MicPermissionState>(permissionState);
  permissionStateRef.current = permissionState;

  // Link router navigate to Action Registry
  useEffect(() => {
    actionRegistry.setNavigate(navigate);
  }, [navigate]);

  // Persist settings
  const updateSettings = useCallback((newSettings: Partial<VoiceAssistantSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('stalight_voice_settings', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  }, []);

  // Compute active website context
  const getWebsiteContext = useCallback((): WebsiteContext => {
    let activeSection: string | null = null;
    const sections = ['features', 'about', 'products', 'services', 'careers', 'contact', 'estimate', 'courses', 'admission'];
    for (const sec of sections) {
      const el = document.getElementById(sec);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3) {
          activeSection = sec;
          break;
        }
      }
    }

    return {
      url: window.location.href,
      pathname: location.pathname,
      hash: location.hash,
      title: document.title,
      activeSection,
    };
  }, [location]);

  /**
   * Safe Cancellation & Barge-In Handler
   */
  const cancel = useCallback(() => {
    textToSpeechService.cancel();
    speechRecognitionService.abort();
    setCurrentTranscript('');
    if (settingsRef.current.soundEffectsEnabled) {
      textToSpeechService.playEarcon('dismiss');
    }

    if (permissionStateRef.current === 'granted') {
      setState('READY');
      if (settingsRef.current.wakeWordEnabled) {
        wakeWordService.resume();
      }
    } else {
      setState('IDLE');
    }
  }, []);

  /**
   * Process a recognized transcript through the AI Intent Engine and speak answer
   */
  const handleQueryProcessing = useCallback(
    async (text: string) => {
      // Abort speech recognition so OS audio routing is completely released for speaker playback
      speechRecognitionService.abort();
      wakeWordService.pause();
      textToSpeechService.unlockAudioEngine();

      setCurrentTranscript('');
      const cleanUserText = normalizeStalightPhonetics(text);

      if (!cleanUserText) {
        setState(permissionStateRef.current === 'granted' ? 'READY' : 'IDLE');
        if (settingsRef.current.wakeWordEnabled) wakeWordService.resume();
        return;
      }

      setState('THINKING');
      voiceAnalytics.track('voice_query_started', { text: cleanUserText });

      const userMsg: VoiceMessage = {
        id: `msg-${Date.now()}-user`,
        sender: 'user',
        text: cleanUserText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev.slice(-15), userMsg]);

      try {
        const context = getWebsiteContext();
        const response = await voiceIntentEngine.processQuery(cleanUserText, context, messagesRef.current);

        const cleanDisplayText = (response.displayText || response.spokenText)
          .replace(/\bstarlight\b/gi, 'Stalight')
          .replace(/\bstar light\b/gi, 'Stalight');

        setAssistantResponseText(cleanDisplayText);

        const assistantMsg: VoiceMessage = {
          id: `msg-${Date.now()}-assistant`,
          sender: 'assistant',
          text: cleanDisplayText,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev.slice(-15), assistantMsg]);
        voiceAnalytics.track('voice_query_completed', { response: response.spokenText });

        // Speak the oral voice response
        if (settingsRef.current.speechSynthesisEnabled && response.spokenText) {
          setState('SPEAKING');
          voiceAnalytics.track('tts_started');
          console.log('[VoiceAssistant] Triggering oral TTS response:', response.spokenText);

          textToSpeechService.speak(response.spokenText, {
            rate: settingsRef.current.voiceRate,
            pitch: settingsRef.current.voicePitch,
            volume: settingsRef.current.voiceVolume,
            onEnd: () => {
              voiceAnalytics.track('tts_completed');
              // Continuous conversational mode: auto-listen for natural follow-up questions
              if (settingsRef.current.autoListenAfterWake) {
                setTimeout(() => {
                  startListening();
                }, 300);
              } else {
                setState('READY');
                if (settingsRef.current.wakeWordEnabled) {
                  wakeWordService.resume();
                }
              }
            },
            onError: () => {
              setState('READY');
              if (settingsRef.current.wakeWordEnabled) {
                wakeWordService.resume();
              }
            },
          });
        } else {
          setState('READY');
          if (settingsRef.current.wakeWordEnabled) wakeWordService.resume();
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error('[VoiceAssistant] Error processing query:', errorMsg);
        voiceAnalytics.track('voice_query_failed', { error: errorMsg });
        setAssistantResponseText("I couldn't complete that. Please try again.");
        setState('ERROR');
        setTimeout(() => {
          setState(permissionStateRef.current === 'granted' ? 'READY' : 'IDLE');
          if (settingsRef.current.wakeWordEnabled) wakeWordService.resume();
        }, 2500);
      }
    },
    [getWebsiteContext]
  );

  /**
   * Start active Speech-To-Text turn
   */
  const startListening = useCallback(() => {
    textToSpeechService.unlockAudioEngine();
    // If speaking, interrupt immediately (barge-in)
    if (stateRef.current === 'SPEAKING') {
      textToSpeechService.cancel();
      voiceAnalytics.track('voice_interrupted');
    }

    wakeWordService.pause();
    setCurrentTranscript('');
    setState('LISTENING');
    setIsExpanded(true);

    speechRecognitionService.startListening({
      onInterim: (interim) => {
        setCurrentTranscript(interim);
        setState('TRANSCRIBING');
      },
      onFinal: (final) => {
        setCurrentTranscript(final);
        handleQueryProcessing(final);
      },
      onError: (err) => {
        console.debug('[VoiceAssistant] STT error:', err);
        setState(permissionStateRef.current === 'granted' ? 'READY' : 'IDLE');
        if (settingsRef.current.wakeWordEnabled) wakeWordService.resume();
      },
      onEnd: () => {
        // If query processing did not take over (state was left in LISTENING or TRANSCRIBING), recover cleanly
        if (stateRef.current === 'LISTENING' || stateRef.current === 'TRANSCRIBING') {
          setState(permissionStateRef.current === 'granted' ? 'READY' : 'IDLE');
          if (settingsRef.current.wakeWordEnabled) wakeWordService.resume();
        }
      },
    });
  }, [handleQueryProcessing]);

  const stopListening = useCallback(() => {
    speechRecognitionService.stopListening();
  }, []);

  /**
   * Wake Word Trigger Callback ("Hey Stalight")
   */
  const handleWakeWordDetected = useCallback(
    (phrase: string, remainingQuery?: string) => {
      console.log(`[VoiceAssistant] Wake phrase detected: "${phrase}"`, remainingQuery ? `Query: "${remainingQuery}"` : '');
      voiceAnalytics.track('wake_word_detected', { phrase, query: remainingQuery });
      setLastWakePhrase(phrase);

      // Barge-in: cancel ongoing TTS immediately
      textToSpeechService.cancel();

      if (settingsRef.current.soundEffectsEnabled) {
        textToSpeechService.playEarcon('wake');
      }

      setState('WAKE_DETECTED');
      setIsExpanded(true);

      // If the user already provided the query in the same breath (e.g., "Hey Stalight, show pricing")
      if (remainingQuery && remainingQuery.trim().length > 1) {
        setTimeout(() => {
          handleQueryProcessing(remainingQuery.trim());
        }, 300);
      } else {
        // Greet the user with requested Siri-style responses, then listen
        const siriGreetings = [
          "Hello there",
          "Uh-huh?",
          "Yes?",
          "I'm right here.",
        ];
        const greeting = siriGreetings[Math.floor(Math.random() * siriGreetings.length)];
        setAssistantResponseText(greeting);

        if (settingsRef.current.speechSynthesisEnabled) {
          setState('SPEAKING');
          textToSpeechService.speak(greeting, {
            rate: settingsRef.current.voiceRate,
            pitch: settingsRef.current.voicePitch,
            volume: settingsRef.current.voiceVolume,
            onEnd: () => {
              startListening();
            },
            onError: () => {
              startListening();
            },
          });
        } else {
          setTimeout(() => {
            startListening();
          }, 350);
        }
      }
    },
    [handleQueryProcessing, startListening]
  );

  /**
   * Request Microphone Permission & Initialize Streams
   */
  const requestPermission = useCallback(async (): Promise<boolean> => {
    textToSpeechService.unlockAudioEngine();
    setState('REQUESTING_PERMISSION');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionState('unsupported');
        setState('DISABLED');
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      micStreamRef.current = stream;
      setMicStream(stream);
      setPermissionState('granted');
      setState('READY');
      voiceAnalytics.track('microphone_permission_granted');

      // Start continuous wake-word detector
      if (settingsRef.current.wakeWordEnabled) {
        wakeWordService.start(handleWakeWordDetected);
      }

      return true;
    } catch (err) {
      const errorName = err instanceof Error ? err.name : 'UnknownError';
      console.warn('[VoiceAssistant] Mic permission denied or unavailable:', err);
      setPermissionState('denied');
      setState('DISABLED');
      voiceAnalytics.track('microphone_permission_denied', { error: errorName });
      return false;
    }
  }, [handleWakeWordDetected]);

  /**
   * Send text-based query directly
   */
  const sendTextQuery = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      setIsExpanded(true);
      await handleQueryProcessing(text);
    },
    [handleQueryProcessing]
  );

  /**
   * Toggle Mute / Disable
   */
  const toggleMute = useCallback(() => {
    if (stateRef.current === 'DISABLED' || permissionStateRef.current !== 'granted') {
      requestPermission();
    } else {
      cancel();
      wakeWordService.stop();
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
        setMicStream(null);
      }
      setPermissionState('prompt');
      setState('DISABLED');
    }
  }, [cancel, requestPermission]);

  // Initial browser capability detection on Mount ONLY
  useEffect(() => {
    voiceAnalytics.track('voice_assistant_loaded');
    const supported = wakeWordService.checkSupport() && speechRecognitionService.isAvailable();
    setIsWakeWordSupported(supported);

    // Check if permission was already granted previously
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'microphone' as PermissionName })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            requestPermission();
          } else if (permissionStatus.state === 'denied') {
            setPermissionState('denied');
            setState('DISABLED');
          } else {
            setPermissionState('prompt');
            setState('IDLE');
          }

          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'granted') {
              requestPermission();
            } else if (permissionStatus.state === 'denied') {
              setPermissionState('denied');
              setState('DISABLED');
            }
          };
        })
        .catch(() => {
          setState('IDLE');
        });
    } else {
      setState('IDLE');
    }

    return () => {
      wakeWordService.stop();
      speechRecognitionService.abort();
      textToSpeechService.cancel();
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VoiceAssistantContext.Provider
      value={{
        state,
        permissionState,
        currentTranscript,
        assistantResponseText,
        messages,
        micStream,
        isWakeWordSupported,
        settings,
        updateSettings,
        requestPermission,
        startListening,
        stopListening,
        cancel,
        toggleMute,
        sendTextQuery,
        isExpanded,
        setIsExpanded,
        lastWakePhrase,
      }}
    >
      {children}
    </VoiceAssistantContext.Provider>
  );
};

export { VoiceAssistantContext };

