import React, { useState, useEffect, useRef } from 'react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { useAudioVisualizer } from '@/hooks/useAudioVisualizer';
import { VoiceBeam } from 'voice-glow';

import { VoiceOrb } from './VoiceOrb';
import { VoiceHUD } from './VoiceHUD';
import { VoicePermissionModal } from './VoicePermissionModal';
import { AnimatePresence, motion } from 'framer-motion';

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
  const [isHovered, setIsHovered] = useState(false);
  const [showTopBubble, setShowTopBubble] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio stream visualizer
  const isAudioActive = state === 'LISTENING' || state === 'TRANSCRIBING' || state === 'SPEAKING';
  const { volume, frequencyData } = useAudioVisualizer(micStream, isAudioActive);

  // Pop up the top bubble for a few seconds on page load
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShowTopBubble(true);
      timerRef.current = setTimeout(() => {
        setShowTopBubble(false);
      }, 3800);
    }, 1200);

    return () => {
      clearTimeout(showTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Show top bubble when hovering over orb
  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTopBubble(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTopBubble(false);
  };

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

  // Initial gentle permission prompt banner if not granted
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

      {/* Floating Assistant Fixed Anchor */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-none select-none font-sans flex flex-col items-end">
        {/* Expanded HUD / Conversation Card positioned directly above without shifting the orb */}
        <AnimatePresence>
          {isExpanded && (
            <div className="pointer-events-auto absolute bottom-[72px] right-0 z-50">
              <VoiceHUD
                frequencyData={frequencyData}
                onClose={() => setIsExpanded(false)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Floating Orb and Dynamic Top Bubble */}
        <div
          className="relative flex flex-col items-center pointer-events-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Bubble Opening from the Orb Top */}
          <AnimatePresence>
            {!isExpanded && (showTopBubble || isHovered) && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.85, originY: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                className="absolute bottom-full mb-3 z-50 flex flex-col items-center cursor-pointer pointer-events-auto"
                onClick={handleOrbClick}
              >
                <VoiceBeam
                  stream={micStream}
                  processing={state === 'THINKING'}
                  type="pill"
                  colorVariant="ocean"
                  theme="light"
                  reach={1.1}
                >
                  <div className="relative px-3.5 py-1.5 bg-white/95 text-slate-800 backdrop-blur-2xl rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.1)] border border-slate-200/80 whitespace-nowrap text-xs font-medium tracking-tight hover:border-blue-300 transition-colors">
                    {/* Refractive highlight edge */}
                    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none" />

                    <span>
                      Say <strong className="text-blue-600 font-semibold">"Hey Stalight"</strong>
                    </span>
                  </div>
                </VoiceBeam>

                {/* Subtle Caret pointing down to the orb */}
                <div className="w-2.5 h-2.5 -mt-1 bg-white/95 border-r border-b border-slate-200/80 rotate-45 backdrop-blur-2xl shadow-xs" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Liquid Glass Orb Button */}
          <VoiceOrb
            state={state}
            volume={volume}
            size={58}
            onClick={handleOrbClick}
          />
        </div>
      </div>
    </>
  );
};
