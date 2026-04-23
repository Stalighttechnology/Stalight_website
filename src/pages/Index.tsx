import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import ServicesSection from "@/components/ServicesSection";
import QuoteSection from "@/components/QuoteSection";
import JoinSection from "@/components/JoinSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import useScrollReveal from "@/hooks/useScrollReveal";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  useScrollReveal();
  const location = useLocation();

  // Handle hash navigation when page loads
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // Small delay to ensure page is fully rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <ServicesSection />
      <QuoteSection />
      <JoinSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
