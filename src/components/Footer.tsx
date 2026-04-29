import React from "react";
import { Link } from "react-router-dom";
import stalightLogo from "@/assets/logos/stalightlogo.png";

const Footer = () => {
  return (
    <footer className="relative bg-[#05050f] text-white overflow-hidden font-sans border-t border-white/10">
      
      {/* Background Architectural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 md:opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0%" y1="80%" x2="100%" y2="20%" stroke="#ffffff" strokeWidth="1" />
          <line x1="25%" y1="0%" x2="20%" y2="100%" stroke="#ffffff" strokeWidth="1" />
          <line x1="50%" y1="0%" x2="45%" y2="100%" stroke="#ffffff" strokeWidth="1" />
          <line x1="75%" y1="0%" x2="70%" y2="100%" stroke="#ffffff" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 pt-8 sm:pt-10 md:pt-16 lg:pt-20 pb-6 md:pb-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          
          {/* Column 1: Brand */}
          <div className="lg:pr-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              <img src={stalightLogo} alt="Stalight logo" className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-logo font-bold text-gray-200">
                  Stalight
                </span>
                <span className="text-xs sm:text-sm md:text-base font-logo font-medium text-gray-400">
                  Technologies
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-[11px] md:text-xs leading-relaxed max-w-[250px] font-light">
              Elevating academic and institutional intelligence through sovereign AI architectures since 2024.
            </p>
          </div>

          {/* Navigation Container (Split on Mobile, Stacks on Tablet/Laptop) */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            {/* Column 2: Company */}
            <div className="md:pl-8">
              <h4 className="text-[10px] uppercase tracking-widest text-red-500 font-bold mb-3 md:mb-4">Company</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><Link to="/about-us" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">Our Brand</Link></li>
                <li><a href="/#services" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="/#careers" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Column 3: Solutions */}
            <div className="md:pl-4">
              <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 md:mb-4">Solutions</h4>
              <ul className="space-y-2 md:space-y-3">
                <li><Link to="/neuro-campus" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">Neuro Campus</Link></li>
                <li><Link to="/neurosync" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">NeuroSync</Link></li>
                <li><a href="mailto:info@stalight.in" className="text-xs md:text-sm text-red-400 md:text-gray-300 font-medium hover:text-white transition-colors">info@stalight.in</a></li>
                <li><a href="tel:+918660144040" className="text-xs md:text-sm text-gray-300 hover:text-white transition-colors">Mobile: 866 014 4040</a></li>
              </ul>
            </div>
          </div>

          {/* Column 4: Social Icons (Full Set: LinkedIn, Instagram, WhatsApp, YouTube) */}
          <div className="flex gap-4 md:gap-5 items-center md:items-start lg:justify-end pt-4 md:pt-0">
            
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/stalight-technologies-pvt-ltd-45391a378/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-all duration-300 transform hover:scale-110" aria-label="LinkedIn">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/stalight_technologies?igsh=MTB2M3BtemJhcWt2dQ==" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#e1306c] transition-all duration-300 transform hover:scale-110" aria-label="Instagram">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/918660144040" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#25d366] transition-all duration-300 transform hover:scale-110" aria-label="WhatsApp">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.89 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.743-.981z"/></svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com/@riteshn_771?si=aBVBbctrXbWS14Xf" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#ff0000] transition-all duration-300 transform hover:scale-110" aria-label="YouTube">
              <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] md:text-xs tracking-wider">
            © 2026 STALIGHT TECHNOLOGIES LIMITED • BENGALURU
          </p>
          <div className="flex gap-6">
             <a href="https://stalight.in/privacy" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-600 hover:text-gray-300 uppercase tracking-tighter transition-colors">Privacy Policy</a>
             <a href="https://stalight.in/terms" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-600 hover:text-gray-300 uppercase tracking-tighter transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;