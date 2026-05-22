import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Ensure your path is correct
import stalightLogo from "@/assets/logos/stalightlogo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

// Subtext/descriptions removed as requested
const productsDropdownItems = [
  { label: "Stalight Campus", href: "/neuro-campus" },
  { label: "Stalight Sync", href: "/neurosync" },
];

const servicesDropdownItems = [
  { label: "Skill Development", href: "/skill-development" },
  { label: "Software Development", href: "/software-development" },
  { label: "IT Services", href: "/it-services" },
  
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if page has scrolled past threshold
      setScrolled(currentScrollY > 20);

      // Scroll direction visibility rules (hides on scroll down, reveals on scroll up)
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
        setProductsDropdownOpen(false);
        setServicesDropdownOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const handleNavClick = (event: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#") && isHome) {
      event.preventDefault();
      const element = document.querySelector(href);
      if (element) smoothScrollToElement(element);
    }
  };

  const smoothScrollToElement = (element: Element) => {
    const duration = 600;
    const targetPosition = (element as HTMLElement).offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    function animation(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeInOutQuad = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startPosition + distance * easeInOutQuad);
      if (progress < 1) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  };

  // Sleek, minimal and elegant typography links with interactive soft background on hover
  // Use neutral slate tones for a professional appearance (no purple on hover)
  const pillLinkStyle = "group flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full text-[14px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 transition-all duration-300 cursor-pointer";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
      >
        <div className={`mx-auto max-w-7xl pointer-events-auto transition-all duration-500 rounded-full ${
            scrolled 
              ? "bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/60 py-2 md:py-2.5" 
              : "bg-white/50 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-white/60 py-2 md:py-3"
          }`}

        >
          <div className="flex items-center justify-between px-3 md:px-5">
            
            {/* --- LOGO --- */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Home">
              <img src={stalightLogo} alt="Logo" className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-sm md:text-[16px] font-black text-slate-900 tracking-tight">Stalight</span>
                <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Technologies</span>
              </div>
              {/* Mobile label: visible only on small screens to improve header clarity */}
              <div className="flex flex-col leading-none sm:hidden ml-2">
                <span className="text-sm font-black text-slate-900 tracking-tight">Stalight</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Technologies</span>
              </div>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isDropdown = link.label === "Products" || link.label === "Services";
                const isOpen = link.label === "Products" ? productsDropdownOpen : servicesDropdownOpen;
                const setOpen = link.label === "Products" ? setProductsDropdownOpen : setServicesDropdownOpen;
                const items = link.label === "Products" ? productsDropdownItems : servicesDropdownItems;

                if (isDropdown) {
                  return (
                    <div
                      key={link.href}
                      className="relative flex items-center"
                      onMouseEnter={() => setOpen(true)}
                      onMouseLeave={() => setOpen(false)}
                    >
                      <Link 
                        to={link.href.startsWith("/") ? link.href : (isHome ? link.href : `/${link.href}`)}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={pillLinkStyle}
                      >
                        {link.label}
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-slate-900" : ""}`} />
                      </Link>

                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 pt-3 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ type: "spring", stiffness: 350, damping: 26 }}
                              className="min-w-[210px] bg-white/95 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] p-2 overflow-hidden flex flex-col gap-1"
                            >
                              {items.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  className="group flex items-center px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="text-[14px] font-semibold text-slate-700 group-hover:text-[#D32027] transition-colors">
                                    {item.label}
                                  </span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  );
                }

                if (link.label === "Contact") {
                  return (
                    <div key={link.href} className="ml-2">
                      <Link
                        to={link.href.startsWith("/") ? link.href : (isHome ? link.href : `/${link.href}`)}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="group flex items-center gap-2.5 bg-[#D32027] hover:bg-[#b91c1c] text-white pl-5 pr-2 py-1.5 rounded-xl font-bold text-[14px] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(211,32,39,0.3)] hover:shadow-[0_12px_24px_-6px_rgba(211,32,39,0.5)] hover:-translate-y-0.5"
                      >
                        {link.label}
                        <div className="bg-white/20 rounded-full p-1 transition-colors group-hover:bg-white/30 flex items-center justify-center">
                          <ArrowRight className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href.startsWith("/") ? link.href : (isHome ? link.href : `/${link.href}`)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={pillLinkStyle}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* --- MOBILE TOGGLE --- */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-slate-800 bg-white/80 hover:bg-white p-2.5 rounded-full transition-all duration-300 shadow-sm border border-slate-100 hover:border-slate-200"
            >
              {mobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* --- MOBILE NAVIGATION --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-white/80 pt-28 pb-6 px-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href.startsWith("/") ? link.href : (isHome ? link.href : `/${link.href}`)}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center justify-between px-6 py-4 rounded-3xl font-bold text-lg shadow-sm border ${
                      link.label === "Contact" 
                        ? "bg-[#D32027] text-white border-transparent shadow-[0_8px_20px_-6px_rgba(211,32,39,0.3)]" 
                        : "bg-white text-slate-800 border-slate-100 hover:bg-slate-50 transition-colors"
                    }`}
                  >
                    {link.label}
                    {link.label === "Contact" ? (
                      <ArrowRight className="w-5 h-5" />
                    ) : (
                      (link.label === "Products" || link.label === "Services") && <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
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
