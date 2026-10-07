import React, { useRef, useEffect } from 'react';

interface VoiceWaveformProps {
  frequencyData: number[];
  isActive: boolean;
  className?: string;
}

export const VoiceWaveform: React.FC<VoiceWaveformProps> = ({
  frequencyData,
  isActive,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const freqRef = useRef(frequencyData);
  const activeRef = useRef(isActive);

  useEffect(() => {
    freqRef.current = frequencyData;
  }, [frequencyData]);

  useEffect(() => {
    activeRef.current = isActive;
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const dpr = Math.min(window.devicePixelRatio || 2, 2.5);
    const width = canvas.clientWidth || 360;
    const height = canvas.clientHeight || 32;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const active = activeRef.current;
      const freqs = freqRef.current;
      const cy = height / 2;

      // Calculate audio energy from frequencyData
      let avgFreq = 0;
      if (freqs && freqs.length > 0) {
        let sum = 0;
        for (let i = 0; i < freqs.length; i++) {
          sum += freqs[i] || 0;
        }
        avgFreq = sum / freqs.length;
      }

      phase += active ? 0.08 : 0.02;

      // Base target amplitude
      const baseAmp = active ? Math.min(height * 0.42, 4 + avgFreq * height * 0.75) : 1.5;

      // Horizontal edge fade mask gradient
      const maskGrad = ctx.createLinearGradient(0, 0, width, 0);
      maskGrad.addColorStop(0.0, 'rgba(56, 189, 248, 0)');
      maskGrad.addColorStop(0.15, 'rgba(56, 189, 248, 0.85)');
      maskGrad.addColorStop(0.5, 'rgba(99, 102, 241, 1)');
      maskGrad.addColorStop(0.85, 'rgba(168, 85, 247, 0.85)');
      maskGrad.addColorStop(1.0, 'rgba(168, 85, 247, 0)');

      // Draw 3 layered harmonic sine waves (Apple Intelligence / Siri audio ribbon style)
      const waves = [
        { freq: 0.022, speed: 1.0, amp: baseAmp * 1.0, lineWidth: 2.2, opacity: 0.95 },
        { freq: 0.035, speed: -1.3, amp: baseAmp * 0.7, lineWidth: 1.6, opacity: 0.7 },
        { freq: 0.015, speed: 0.7, amp: baseAmp * 0.5, lineWidth: 1.2, opacity: 0.5 },
      ];

      waves.forEach((w) => {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = maskGrad;
        ctx.globalAlpha = w.opacity;
        ctx.lineWidth = w.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const step = 4;
        for (let x = 0; x <= width; x += step) {
          // Window envelope so ends taper down smoothly to 0
          const progress = x / width;
          const envelope = Math.sin(progress * Math.PI);

          // Harmonic sine calculation
          const y = cy + Math.sin(x * w.freq + phase * w.speed) * w.amp * envelope;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className={`relative w-full h-7 flex items-center justify-center overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
