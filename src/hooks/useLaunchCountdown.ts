import { useState, useEffect } from 'react';

export const TARGET_LAUNCH_DATE = "2026-06-04T11:11:00+05:30"; // Thursday, 4 June 2026, 11:11 AM IST
export const TARGET_LAUNCH_DISPLAY = "Launching Jun 4, 2026 • 11:11 AM IST";

export const useIsLaunched = () => {
  const [isLaunched, setIsLaunched] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const targetDate = new Date(TARGET_LAUNCH_DATE).getTime();
    
    const check = () => {
      const now = Date.now();
      const difference = targetDate - now;
      if (difference <= 0) {
        setIsLaunched(true);
      } else {
        setIsLaunched(false);
        const timer = setTimeout(() => {
          setIsLaunched(true);
        }, difference);
        return () => clearTimeout(timer);
      }
    };

    const cleanup = check();
    setIsReady(true);
    return cleanup;
  }, []);

  return { isLaunched, isReady };
};

export const useLaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isLaunched, setIsLaunched] = useState(false);
  const [isReady, setIsReady] = useState(false); // To prevent hydration mismatch or flashing

  useEffect(() => {
    const targetDate = new Date(TARGET_LAUNCH_DATE).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsLaunched(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setIsLaunched(false);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
      setIsReady(true);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return { isLaunched, timeLeft, isReady };
};

