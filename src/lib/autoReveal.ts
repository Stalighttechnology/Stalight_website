// Auto reveal utility: adds "reveal" class to common elements and observes them
// Stronger transforms for mobile. Respects prefers-reduced-motion.

const SELECTORS = [
  'h1', 'h2', 'h3', 'p', 'a', 'button', 'img', 'section', '.card', '.reveal-on-scroll', 'nav', '.container > *'
].join(',');

function isReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (e) { return false; }
}

export default function initAutoReveal() {
  if (typeof window === 'undefined') return;
  if (isReducedMotion()) return; // don't run if user prefers reduced motion

  const elements = Array.from(document.querySelectorAll(SELECTORS)) as HTMLElement[];
  if (!elements.length) return;

  // Add base reveal class to elements that don't already have it
  elements.forEach((el) => {
    // skip if inside modal/backdrop or already hidden
    if (el.closest('[aria-hidden="true"]')) return;
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });

  const mobile = window.innerWidth < 768;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        // slightly stagger using dataset index
        const delay = Math.min(parseFloat(target.dataset.revealDelay || '0') + (Math.random() * 120), 400);
        window.setTimeout(() => {
          target.classList.add('visible');
        }, delay);
        // unobserve after reveal to avoid reflows
        observer.unobserve(target);
      }
    });
  }, {
    root: null,
    rootMargin: mobile ? '0px 0px -10% 0px' : '0px 0px -20% 0px',
    threshold: mobile ? 0.05 : 0.12
  });

  elements.forEach((el, i) => {
    // don't reveal extremely small decorative elements
    if (el.offsetHeight < 10 && el.offsetWidth < 10) return;
    // provide slight index-based delay
    el.dataset.revealDelay = (i * 40 % 300).toString();
    // add will-change for mobile for smoother GPU transforms
    if (mobile) el.style.willChange = 'transform, opacity';
    observer.observe(el);
  });

  // lightweight fallback: reveal all after 5s in case observer doesn't fire
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => el.classList.add('visible'));
  }, 5000);
}
