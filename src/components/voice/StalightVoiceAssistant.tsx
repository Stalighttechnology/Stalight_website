import React, { useState, useEffect } from 'react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { useAudioVisualizer } from '@/hooks/useAudioVisualizer';

import { VoiceOrb } from './VoiceOrb';
import { VoiceHUD } from './VoiceHUD';
import { VoicePermissionModal } from './VoicePermissionModal';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';

export const StalightVoiceAssistant: React.FC = () => {
  const {
    state,
    permissionState,
    requestPermission,
    startListening,
    cancel,
    micStream,
    isExpanded,
    setIsExpanded,
    settings,
  } = useVoiceAssistant();

  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);
  const [hasPromptedInitial, setHasPromptedInitial] = useState(false);

  // Audio stream visualizer
  const isAudioActive = state === 'LISTENING' || state === 'TRANSCRIBING' || state === 'SPEAKING';
  const { volume, frequencyData } = useAudioVisualizer(micStream, isAudioActive);

  // Keyboard shortcut: Ctrl + Space or Alt + V to toggle voice listening
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.code === 'Space') || (e.altKey && e.key.toLowerCase() === 'v')) {
        e.preventDefault();
        if (permissionState !== 'granted') {
          setShowPermissionPrompt(true);
        } else if (state === 'LISTENING' || state === 'SPEAKING') {
          cancel();
        } else {
          startListening();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cancel, permissionState, startListening, state]);

  // Initial gentle prompt banner if not granted
  useEffect(() => {
    if (permissionState === 'prompt' && !hasPromptedInitial) {
      const timer = setTimeout(() => {
        const hasSeenPrompt = sessionStorage.getItem('stalight_voice_prompt_shown');
        if (!hasSeenPrompt) {
          setShowPermissionPrompt(true);
          sessionStorage.setItem('stalight_voice_prompt_shown', 'true');
        }
        setHasPromptedInitial(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [permissionState, hasPromptedInitial]);

  const handleOrbClick = () => {
    if (permissionState !== 'granted') {
      setShowPermissionPrompt(true);
      return;
    }

    if (state === 'LISTENING' || state === 'TRANSCRIBING' || state === 'SPEAKING') {
      cancel();
    } else {
      setIsExpanded(true);
      startListening();
    }
  };

  const handleAllowPermission = async () => {
    setShowPermissionPrompt(false);
    const granted = await requestPermission();
    if (granted) {
      setIsExpanded(true);
    }
  };

  return (
    <>
      {/* Micro-permission Onboarding Dialog */}
      <VoicePermissionModal
        isOpen={showPermissionPrompt}
        onAllow={handleAllowPermission}
        onDismiss={() => setShowPermissionPrompt(false)}
      />

      {/* Floating Assistant Widget Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none select-none font-sans">
        {/* Expanded HUD / Conversation Card */}
        <AnimatePresence>
          {isExpanded && (
            <div className="pointer-events-auto">
              <VoiceHUD
                frequencyData={frequencyData}
                onClose={() => setIsExpanded(false)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Pill & Orb */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          {/* Subtle "Hey Stalight" Pill Indicator */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleOrbClick}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200/80 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
              <span>
                Say <strong className="text-blue-600">"Hey Stalight"</strong>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-blue-500 opacity-80" />
            </motion.div>
          )}

          {/* Voice Orb Button */}
          <VoiceOrb
            state={state}
            volume={volume}
            size={54}
            onClick={handleOrbClick}
          />
        </div>
      </div>
    </>
  );
};
