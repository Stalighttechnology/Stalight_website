import React from 'react';
import { VoiceBeam, useMicrophone } from 'voice-glow';
import type { VoiceBeamProps, VoiceBeamColorVariant, VoiceBeamType } from 'voice-glow';

export interface VoiceBeamGlowProps extends Omit<VoiceBeamProps, 'children'> {
  children: React.ReactNode;
  colorVariant?: VoiceBeamColorVariant;
  type?: VoiceBeamType;
  theme?: 'dark' | 'light' | 'auto';
  processing?: boolean;
}

/**
 * Reusable VoiceBeam wrapper component with standard Stalight design presets.
 */
export const VoiceBeamGlow: React.FC<VoiceBeamGlowProps> = ({
  children,
  colorVariant = 'colorful',
  type = 'default',
  theme = 'light',
  processing = false,
  ...props
}) => {
  return (
    <VoiceBeam
      type={type}
      colorVariant={colorVariant}
      theme={theme}
      processing={processing}
      {...props}
    >
      {children}
    </VoiceBeam>
  );
};

export { useMicrophone, VoiceBeam };
