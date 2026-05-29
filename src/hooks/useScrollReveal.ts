import { useEffect } from "react";

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target); // Unobserve immediately to save memory and CPU
          }
        });
      },
      // rootMargin: "0px 0px 400px 0px" is tuned to guarantee assets decode before entering viewport
      { threshold: 0.01, rootMargin: "0px 0px 400px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useScrollReveal;

