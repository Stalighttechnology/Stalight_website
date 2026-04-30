import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import stalightLogo from "@/assets/logos/stalightlogo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "/about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Handle scroll state for styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent, href: string) => {
    setMobileOpen(false);

    // Check if it's a hash link
    if (href.startsWith("#")) {
      if (isHome) {
        event.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          smoothScrollToElement(element);
        }
      } else {
        // If we are on another page, let the default behavior of Link (to="/#hash") 
        // handle the navigation to the home page with the hash.
        // Index.tsx already has a useEffect to handle scrolling on mount.
      }
    }
  };

  // Custom smooth scroll function using RAF for better performance
  const smoothScrollToElement = (element: Element) => {
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
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm"
            : "bg-transparent py-4 md:py-6"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">

          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center md:outline-none" aria-label="Stalight Technology home">
            <img src={stalightLogo} alt="Stalight Technology logo" className="h-8 sm:h-9 md:h-10 lg:h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-logo font-bold text-slate-800 group-hover:text-slate-950 transition-colors">
                Stalight
              </span>
              <span className="text-xs sm:text-sm md:text-base font-logo font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
                Technologies
              </span>
            </div>
          </Link>

          {/* --- DESKTOP NAVIGATION --- */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => {
              // Special handling for Products dropdown
              if (link.label === "Products") {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <button className="flex items-center gap-1 text-xs xl:text-[12px] font-bold tracking-[0.15em] uppercase text-slate-700 hover:text-slate-950 transition-colors py-2">
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${productsDropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {/* Hover Underline Sweep */}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D32027] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>

                    {/* Dropdown Menu */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={productsDropdownOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full left-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden z-50 ${productsDropdownOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <Link
                        to="/neuro-campus"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 hover:text-slate-950 whitespace-nowrap"
                        onClick={() => setProductsDropdownOpen(false)}
                      >
                        NeuroCampus
                      </Link>
                      <div className="border-t border-slate-100"></div>
                      <Link
                        to="/neurosync"
                        className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 hover:text-slate-950 whitespace-nowrap"
                        onClick={() => setProductsDropdownOpen(false)}
                      >
                        NeuroSync
                      </Link>
                    </motion.div>
                  </div>
                );
              }

              // Regular link handling
              return (
                <div key={link.href} className="relative group">
                  <Link
                    to={link.href.startsWith("/") ? link.href : (isHome ? link.href : `/${link.href}`)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xs xl:text-[12px] font-bold tracking-[0.15em] uppercase text-slate-700 hover:text-slate-950 transition-colors py-2 block"
                  >
                    {link.label}
                  </Link>
                  {/* Hover Underline Sweep */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D32027] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </div>
              );
            })}
          </nav>

          {/* --- MOBILE MENU TOGGLE --- */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-slate-900 focus:outline-none flex items-center justify-center p-1"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.header>

      {/* --- MOBILE FULL-SCREEN NAVIGATION --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white pt-20 sm:pt-24 pb-6 px-4 sm:px-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href.startsWith("/") ? link.href : (isHome ? link.href : `/${link.href}`)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900 block border-b border-slate-100 pb-3 sm:pb-4"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default Navbar;