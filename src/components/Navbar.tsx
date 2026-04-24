import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import stalightLogo from "@/assets/logos/stalightlogo.png";

const navLinks = [
  { label: "Home", href: "#home", isRoute: false },
  { label: "About", href: "/about-us", isRoute: true },
  { label: "Products", href: "#products", isRoute: false },
  { label: "Services", href: "#services", isRoute: false },
  { label: "Careers", href: "#careers", isRoute: false },
  { label: "Contact", href: "#contact", isRoute: false },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Handle scroll state for styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event, href) => {
    setMobileOpen(false);
    if (!href.startsWith("/")) {
      event?.preventDefault();
      if (isHome) {
        // If on home page, smooth scroll to section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If not on home page, navigate to home page first, then scroll to section
        navigate("/");
        // Use setTimeout to ensure navigation completes before scrolling
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-white/95 backdrop-blur-lg border-b border-slate-200 py-3 shadow-sm"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12">
          
          {/* --- LOGO --- */}
          <Link to="/" className="flex items-center md:outline-none" aria-label="Stalight Technology home">
            {/* Responsive heights: h-8 on mobile, h-10 on tablet, h-12 on desktop */}
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
              const isExternal = !link.isRoute && !isHome;
              const linkHref = isExternal ? `/${link.href}` : link.href;

              return (
                <div key={link.href} className="relative group">
                  {link.isRoute ? (
                    <Link
                      to={linkHref}
                      className="text-xs xl:text-[12px] font-bold tracking-[0.15em] uppercase text-slate-700 hover:text-slate-950 transition-colors py-2 block"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={linkHref}
                      onClick={(e) => {
                        if (!isExternal) handleNavClick(e, link.href);
                      }}
                      className="text-xs xl:text-[12px] font-bold tracking-[0.15em] uppercase text-slate-700 hover:text-slate-950 transition-colors py-2 block"
                    >
                      {link.label}
                    </a>
                  )}
                  {/* Hover Underline Sweep */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D32027] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </div>
              );
            })}

            {/* Premium CTA Button in Navbar */}
            <a
              href="/neuro-campus-access"
              className="ml-2 xl:ml-4 px-4 xl:px-6 py-2 xl:py-3 bg-slate-950 text-white text-xs xl:text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-[#D32027] transition-colors duration-300"
            >
              Get Access
            </a>
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
              {navLinks.map((link, i) => {
                const isExternal = !link.isRoute && !isHome;
                const linkHref = isExternal ? `/${link.href}` : link.href;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {link.isRoute ? (
                      <Link
                        to={linkHref}
                        onClick={() => setMobileOpen(false)}
                        className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900 block border-b border-slate-100 pb-3 sm:pb-4"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={linkHref}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="text-2xl sm:text-3xl font-light tracking-tight text-slate-900 block border-b border-slate-100 pb-3 sm:pb-4"
                      >
                        {link.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}
              
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                href="/neuro-campus-access"
                onClick={() => setMobileOpen(false)}
                className="mt-4 sm:mt-6 px-6 sm:px-8 py-4 sm:py-5 bg-slate-950 text-white text-center text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#D32027] transition-colors duration-300"
              >
                Get Access
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


export default Navbar;