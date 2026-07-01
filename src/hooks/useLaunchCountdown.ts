import { useState, useEffect } from 'react';

export const TARGET_LAUNCH_DATE = "2026-07-02T10:15:00+05:30"; // Thursday, 2 July 2026, 10:15 AM IST
export const TARGET_LAUNCH_DISPLAY = "Launching Jul 2, 2026 • 10:15 AM IST";

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
