import React from 'react';
import { motion } from 'framer-motion';

interface VoiceWaveformProps {
  frequencyData: number[];
  isActive: boolean;
  barCount?: number;
  className?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  frequencyData,
  isActive,
  barCount = 12,
  className = '',
}) => {
  const bars = Array.from({ length: barCount }, (_, i) => {
    const rawVal = frequencyData[i % frequencyData.length] || 0;
    // Base minimal height + reactive height
    const heightPercent = isActive ? Math.max(15, Math.min(100, rawVal * 100)) : 15;
    return heightPercent;
  });

  return (
    <div className={`flex items-center justify-center gap-[3px] h-8 px-2 ${className}`}>
      {bars.map((height, index) => (
        <motion.span
          key={index}
          animate={{ height: `${height}%` }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          className={`w-1 rounded-full ${
            isActive
              ? 'bg-gradient-to-t from-blue-500 via-indigo-400 to-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.5)]'
              : 'bg-slate-300/60'
          }`}
          style={{ minHeight: '4px' }}
        />
      ))}
    </div>
  );
};
