import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import initAutoReveal from "./lib/autoReveal";

// Initialize auto reveal animations for scroll-based effects
if (typeof window !== 'undefined') {
  // run after a tick so initial render isn't blocked
  setTimeout(() => initAutoReveal(), 50);
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
