import { useContext } from 'react';
import { VoiceAssistantContext, VoiceAssistantContextValue } from '@/context/VoiceAssistantContext';

export function useVoiceAssistant(): VoiceAssistantContextValue {
  const ctx = useContext(VoiceAssistantContext);
  if (!ctx) {
    throw new Error('useVoiceAssistant must be used within a VoiceAssistantProvider');
  }
  return ctx;
}

export type { VoiceAssistantContextValue };
