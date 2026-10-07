import React from 'react';
import { motion } from 'framer-motion';
import { VoiceState } from '@/types/voice';
import { Mic, MicOff, Sparkles, Volume2, AlertCircle } from 'lucide-react';

interface VoiceOrbProps {
  state: VoiceState;
  volume?: number;
  size?: number;
  onClick?: () => void;
  className?: string;
}

export const VoiceOrb: React.FC<VoiceOrbProps> = ({
  state,
  volume = 0,
  size = 56,
  onClick,
  className = '',
}) => {
  // Scale dynamically with sound level during active recording/speaking
  const dynamicScale = 1 + Math.min(volume * 0.9, 0.45);

  const getGradientColors = () => {
    switch (state) {
      case 'WAKE_DETECTED':
        return 'from-cyan-400 via-indigo-500 to-purple-500';
      case 'LISTENING':
      case 'TRANSCRIBING':
        return 'from-blue-500 via-sky-400 to-indigo-600';
      case 'THINKING':
        return 'from-purple-600 via-pink-500 to-indigo-500';
      case 'SPEAKING':
        return 'from-indigo-500 via-blue-400 to-teal-400';
      case 'ERROR':
        return 'from-amber-500 to-rose-500';
      case 'DISABLED':
        return 'from-slate-400 to-slate-600';
      case 'READY':
      default:
        return 'from-blue-600 via-indigo-600 to-purple-600';
    }
  };

  const getShadowColor = () => {
    switch (state) {
      case 'LISTENING':
      case 'TRANSCRIBING':
        return 'shadow-[0_0_35px_rgba(56,189,248,0.65)]';
      case 'THINKING':
        return 'shadow-[0_0_40px_rgba(168,85,247,0.7)]';
      case 'SPEAKING':
        return 'shadow-[0_0_35px_rgba(99,102,241,0.65)]';
      case 'WAKE_DETECTED':
        return 'shadow-[0_0_45px_rgba(34,211,238,0.85)]';
      case 'DISABLED':
        return 'shadow-none';
      case 'READY':
      default:
        return 'shadow-[0_4px_25px_rgba(99,102,241,0.4)]';
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Pulsing Glow Aura */}
      {(state === 'LISTENING' || state === 'SPEAKING' || state === 'WAKE_DETECTED' || state === 'THINKING') && (
        <motion.div
          animate={{
            scale: [1, 1.35 + volume * 0.5, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: state === 'THINKING' ? 1.2 : 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute rounded-full bg-gradient-to-r ${getGradientColors()} blur-xl pointer-events-none`}
          style={{ width: size * 1.5, height: size * 1.5 }}
        />
      )}

      {/* Secondary Dynamic Halo Ring */}
      {state === 'THINKING' && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full p-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 pointer-events-none"
          style={{ width: size + 16, height: size + 16 }}
        />
      )}

      {/* Main Core Orb Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={{
          scale: state === 'LISTENING' || state === 'SPEAKING' ? dynamicScale : 1,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        onClick={onClick}
        aria-label={`Stalight Voice Assistant (${state})`}
        style={{ width: size, height: size }}
        className={`relative z-10 flex items-center justify-center rounded-full bg-gradient-to-tr ${getGradientColors()} ${getShadowColor()} text-white transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50 cursor-pointer overflow-hidden`}
      >
        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-white/15 mix-blend-overlay rounded-full" />

        {/* State Icons */}
        {state === 'DISABLED' ? (
          <MicOff className="w-5 h-5 text-white/80" />
        ) : state === 'THINKING' ? (
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        ) : state === 'SPEAKING' ? (
          <Volume2 className="w-5 h-5 text-white animate-bounce" />
        ) : state === 'ERROR' ? (
          <AlertCircle className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-white" />
        )}
      </motion.button>
    </div>
  );
};
