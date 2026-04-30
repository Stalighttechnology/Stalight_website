import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component ensures that the window scrolls to the top
 * whenever the route (pathname) changes. Uses smooth scrolling with RAF for performance.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Handle hash navigation on mount
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Delay to allow DOM to render
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            smoothScrollToElement(element);
          }
        }, 0);
      } else {
        smoothScrollToTop();
      }
    };

    handleHashNavigation();
  }, [pathname]);

  return null;
}

/**
 * Smooth scroll to top using requestAnimationFrame
 */
function smoothScrollToTop() {
  const duration = 600; // Duration in milliseconds
  const startPosition = window.scrollY;
  const startTime = performance.now();

  function animation(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeInOutQuad = progress < 0.5 
      ? 2 * progress * progress 
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition * (1 - easeInOutQuad));

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/**
 * Smooth scroll to a specific element
 */
function smoothScrollToElement(element: Element) {
  const duration = 600;
  const targetPosition = (element as HTMLElement).offsetTop;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animation(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeInOutQuad = progress < 0.5 
      ? 2 * progress * progress 
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, startPosition + distance * easeInOutQuad);

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}
