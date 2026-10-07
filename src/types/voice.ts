export type VoiceState =
  | 'IDLE'
  | 'INITIALIZING'
  | 'REQUESTING_PERMISSION'
  | 'READY'
  | 'WAKE_DETECTED'
  | 'LISTENING'
  | 'TRANSCRIBING'
  | 'THINKING'
  | 'SPEAKING'
  | 'ERROR'
  | 'DISABLED';

export type MicPermissionState = 'prompt' | 'granted' | 'denied' | 'unsupported';

export interface WebsiteContext {
  url: string;
  pathname: string;
  hash: string;
  title: string;
  activeSection: string | null;
  selectedPlan?: string | null;
}

export interface VoiceMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: number;
  toolCall?: {
    name: string;
    args: Record<string, unknown>;
    status: 'pending' | 'success' | 'failed';
  };
}

export interface AssistantToolCall {
  name: string;
  args: Record<string, unknown>;
}

export interface AssistantResponse {
  spokenText: string;
  displayText?: string;
  toolCalls?: AssistantToolCall[];
  requiresConfirmation?: boolean;
  followUpSuggestions?: string[];
}

export interface VoiceAnalyticsEvent {
  event:
    | 'voice_assistant_loaded'
    | 'microphone_permission_granted'
    | 'microphone_permission_denied'
    | 'wake_word_detected'
    | 'voice_query_started'
    | 'voice_query_completed'
    | 'voice_query_failed'
    | 'tool_called'
    | 'navigation_triggered'
    | 'tts_started'
    | 'tts_completed'
    | 'voice_interrupted';
  details?: Record<string, unknown>;
  timestamp: number;
}

export interface VoiceAssistantSettings {
  wakeWordEnabled: boolean;
  speechSynthesisEnabled: boolean;
  soundEffectsEnabled: boolean;
  autoListenAfterWake: boolean;
  voiceVolume: number;
  voiceRate: number;
  voicePitch: number;
}
