import { useState, useEffect, useRef } from 'react';

export function useAudioVisualizer(stream: MediaStream | null, isActive: boolean) {
  const [volume, setVolume] = useState<number>(0);
  const [frequencyData, setFrequencyData] = useState<number[]>(new Array(16).fill(0));
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!stream || !isActive) {
      setVolume(0);
      setFrequencyData(new Array(16).fill(0));
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();
      audioCtxRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const update = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        const bins: number[] = [];
        const step = Math.floor(dataArray.length / 16) || 1;

        for (let i = 0; i < 16; i++) {
          const val = dataArray[i * step] || 0;
          sum += val;
          bins.push(val / 255);
        }

        const avg = sum / dataArray.length / 255;
        setVolume(avg);
        setFrequencyData(bins);

        animFrameRef.current = requestAnimationFrame(update);
      };

      update();
    } catch {
      // Ignore audio context creation error
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stream, isActive]);

  return { volume, frequencyData };
}
