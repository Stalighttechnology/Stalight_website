import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VoiceState } from '@/types/voice';

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
  size = 64,
  onClick,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef(state);
  const volumeRef = useRef(volume);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let smoothVol = 0;

    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    const canvasWidth = size * dpr;
    const canvasHeight = size * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const render = () => {
      time += 0.022;

      // Target volume smoothing
      const targetVol = volumeRef.current;
      smoothVol += (targetVol - smoothVol) * 0.15;

      const currentState = stateRef.current;
      const isListening = currentState === 'LISTENING' || currentState === 'TRANSCRIBING';
      const isThinking = currentState === 'THINKING';
      const isSpeaking = currentState === 'SPEAKING';
      const isWakeDetected = currentState === 'WAKE_DETECTED';

      const speedMultiplier = isThinking ? 2.6 : isListening ? 1.6 : isSpeaking ? 1.4 : isWakeDetected ? 2.2 : 1.0;
      const effectiveTime = time * speedMultiplier;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const cx = canvasWidth / 2;
      const cy = canvasHeight / 2;
      const outerRadius = (canvasWidth / 2) * 0.94;
      const innerRadius = outerRadius * (0.76 + (isListening || isSpeaking ? smoothVol * 0.16 : Math.sin(effectiveTime * 1.5) * 0.02));

      // 1. Ambient Glass Outer Drop Shadow & Soft Glow
      ctx.save();
      const glowGrad = ctx.createRadialGradient(cx, cy, innerRadius * 0.5, cx, cy, outerRadius * 1.25);
      if (isThinking) {
        glowGrad.addColorStop(0, 'rgba(192, 132, 252, 0.45)');
        glowGrad.addColorStop(0.7, 'rgba(147, 51, 234, 0.2)');
        glowGrad.addColorStop(1, 'rgba(147, 51, 234, 0)');
      } else if (isListening || isSpeaking || isWakeDetected) {
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.5)');
        glowGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.25)');
        glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
        glowGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.12)');
        glowGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw Organic Morphing Liquid Core
      ctx.save();
      ctx.beginPath();
      const numPoints = 64;
      const waveAmplitude = innerRadius * (0.07 + (isListening || isSpeaking ? smoothVol * 0.22 : 0.035));

      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        // Multi-harmonic fluid wave deformations
        const offset =
          Math.sin(theta * 3 + effectiveTime * 1.8) * waveAmplitude * 0.6 +
          Math.cos(theta * 2 - effectiveTime * 1.4) * waveAmplitude * 0.4 +
          Math.sin(theta * 4 + effectiveTime * 2.3) * waveAmplitude * 0.3 +
          Math.sin(theta * 5 - effectiveTime * 1.1) * (waveAmplitude * 0.2);

        const r = innerRadius + offset;
        const x = cx + Math.cos(theta) * r;
        const y = cy + Math.sin(theta) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.clip(); // Clip to organic fluid shape

      // Fluid Gradient Layer 1 (Base Core Gradient)
      const gradAngle = effectiveTime * 0.7;
      const gradX1 = cx + Math.cos(gradAngle) * innerRadius * 0.9;
      const gradY1 = cy + Math.sin(gradAngle) * innerRadius * 0.9;
      const gradX2 = cx + Math.cos(gradAngle + Math.PI) * innerRadius * 0.9;
      const gradY2 = cy + Math.sin(gradAngle + Math.PI) * innerRadius * 0.9;

      const fluidGrad = ctx.createLinearGradient(gradX1, gradY1, gradX2, gradY2);
      // Apple Intelligence exact palette: Bright Cyan, Royal Sky, Electric Lilac, Deep Lavender, Pure Azure
      fluidGrad.addColorStop(0.0, '#38bdf8'); // Cyan-400
      fluidGrad.addColorStop(0.25, '#60a5fa'); // Blue-400
      fluidGrad.addColorStop(0.5, '#818cf8'); // Indigo-400
      fluidGrad.addColorStop(0.75, '#c084fc'); // Purple-400
      fluidGrad.addColorStop(1.0, '#38bdf8'); // Wrap back to Cyan
      ctx.fillStyle = fluidGrad;
      ctx.fill();

      // Fluid Gradient Layer 2 (Morphing Swirling Light Blobs)
      // Swirling Cyan Blob
      const blob1X = cx + Math.cos(effectiveTime * 1.3) * innerRadius * 0.38;
      const blob1Y = cy + Math.sin(effectiveTime * 1.1) * innerRadius * 0.38;
      const blob1Grad = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, innerRadius * 0.85);
      blob1Grad.addColorStop(0, 'rgba(56, 189, 248, 0.95)');
      blob1Grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.6)');
      blob1Grad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = blob1Grad;
      ctx.beginPath();
      ctx.arc(blob1X, blob1Y, innerRadius * 0.85, 0, Math.PI * 2);
      ctx.fill();

      // Swirling Lavender/Magenta Blob
      const blob2X = cx + Math.cos(-effectiveTime * 1.5 + Math.PI * 0.8) * innerRadius * 0.42;
      const blob2Y = cy + Math.sin(-effectiveTime * 1.3 + Math.PI * 0.8) * innerRadius * 0.42;
      const blob2Grad = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, innerRadius * 0.9);
      blob2Grad.addColorStop(0, 'rgba(232, 121, 249, 0.9)');
      blob2Grad.addColorStop(0.45, 'rgba(192, 132, 252, 0.65)');
      blob2Grad.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = blob2Grad;
      ctx.beginPath();
      ctx.arc(blob2X, blob2Y, innerRadius * 0.9, 0, Math.PI * 2);
      ctx.fill();

      // Swirling Radiant Center Highlight
      const blob3X = cx + Math.sin(effectiveTime * 0.9) * innerRadius * 0.2;
      const blob3Y = cy + Math.cos(effectiveTime * 0.9) * innerRadius * 0.2;
      const blob3Grad = ctx.createRadialGradient(blob3X, blob3Y, 0, blob3X, blob3Y, innerRadius * 0.55);
      blob3Grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      blob3Grad.addColorStop(0.35, 'rgba(186, 230, 253, 0.5)');
      blob3Grad.addColorStop(1, 'rgba(125, 211, 252, 0)');
      ctx.fillStyle = blob3Grad;
      ctx.beginPath();
      ctx.arc(blob3X, blob3Y, innerRadius * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // 3D Spherical Volume Shading on Liquid Core
      const sphereShade = ctx.createRadialGradient(
        cx - innerRadius * 0.35,
        cy - innerRadius * 0.35,
        innerRadius * 0.1,
        cx,
        cy,
        innerRadius * 1.05
      );
      sphereShade.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
      sphereShade.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
      sphereShade.addColorStop(0.8, 'rgba(15, 23, 42, 0.2)');
      sphereShade.addColorStop(1, 'rgba(2, 6, 23, 0.55)');
      ctx.fillStyle = sphereShade;
      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // Exit fluid clip

      // 3. Outer Glass Refractive Shell & Frosted Capsule
      ctx.save();
      // Outer translucent glass sphere fill
      const glassBodyGrad = ctx.createRadialGradient(
        cx - outerRadius * 0.4,
        cy - outerRadius * 0.4,
        outerRadius * 0.2,
        cx,
        cy,
        outerRadius
      );
      glassBodyGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      glassBodyGrad.addColorStop(0.4, 'rgba(240, 249, 255, 0.12)');
      glassBodyGrad.addColorStop(0.75, 'rgba(224, 231, 255, 0.18)');
      glassBodyGrad.addColorStop(1, 'rgba(186, 230, 253, 0.3)');

      ctx.fillStyle = glassBodyGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Specular Glass Rim Border
      const rimGrad = ctx.createLinearGradient(
        cx - outerRadius,
        cy - outerRadius,
        cx + outerRadius,
        cy + outerRadius
      );
      rimGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
      rimGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.55)');
      rimGrad.addColorStop(0.65, 'rgba(186, 230, 253, 0.35)');
      rimGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.7)');

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = Math.max(1.8 * dpr, 2.5);
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius - ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Specular Curved Light Reflection on Glass (Top Arc Highlight)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-Math.PI * 0.18);
      ctx.beginPath();
      ctx.ellipse(
        0,
        -outerRadius * 0.62,
        outerRadius * 0.55,
        outerRadius * 0.22,
        0,
        0,
        Math.PI * 2
      );
      const specGrad = ctx.createLinearGradient(
        0,
        -outerRadius * 0.84,
        0,
        -outerRadius * 0.4
      );
      specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
      specGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
      specGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = specGrad;
      ctx.fill();
      ctx.restore();

      // Subtle Bottom-Right Secondary Glass Rim Refraction
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.arc(0, 0, outerRadius * 0.88, Math.PI * 0.25, Math.PI * 0.75);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1.2 * dpr;
      ctx.stroke();
      ctx.restore();

      ctx.restore(); // Exit glass shell

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        onClick={onClick}
        aria-label={`Stalight AI Voice Orb (${state})`}
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50"
      >
        <canvas
          ref={canvasRef}
          style={{ width: size, height: size }}
          className="rounded-full drop-shadow-[0_8px_24px_rgba(56,189,248,0.35)] transition-all duration-300"
        />
      </motion.button>
    </div>
  );
};
