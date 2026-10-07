import '@testing-library/jest-dom';

// Polyfill window methods for test environment
if (typeof window !== 'undefined') {
  window.scrollTo = () => {};
  window.scrollBy = () => {};
}
