import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { SEO } from '../components/SEO';
import { NDAConsentPortal } from '../components/nda/NDAConsentPortal';

const NDAOnboarding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO 
        title="NDA & Consent Onboarding | Stalight Technologies"
        description="Official Non-Disclosure Agreement and Consent portal for new joinees at Stalight Technologies Pvt Ltd."
      />
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <NDAConsentPortal />
      </main>

      <Footer />
    </div>
  );
};

export default NDAOnboarding;
