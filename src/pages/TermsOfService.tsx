import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import stalightLogo from "@/assets/logos/stalightlogo.webp";
import { SEO } from "@/components/SEO";

const TermsOfService = () => {
  const effectiveDate = "21 May 2026";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D32027] selection:text-white">
      <SEO 
        title="Terms of Service | Stalight Technologies - Software Development Company"
        description="Terms of service for Stalight Technologies, a leading AI-first software development company in Bengaluru, India."
        keywords="Stalight Technologies, Terms of Service, Software Development, Bengaluru, AI Company, India"
      />
      <Navbar />

      <main className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <img loading="lazy" decoding="async" src={stalightLogo} alt="Stalight logo" className="h-12 w-auto object-contain" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Terms of Service</h1>
            <p className="text-sm text-slate-600">Effective date: {effectiveDate}</p>
          </div>
        </div>

        <section className="prose prose-slate max-w-none">
          <h2>Agreement to Terms</h2>
          <p>
            These Terms of Service ("Terms") govern your use of Stalight Technologies' website and services. By
            accessing or using our services, you agree to be bound by these Terms.
          </p>

          <h3>1. Services</h3>
          <p>
            Stalight provides software platforms, professional services, and related products. Specific terms for
            particular services may be provided in separate agreements.
          </p>

          <h3>2. Acceptable Use</h3>
          <p>
            You agree not to use the services for unlawful activities, to attempt to breach security, or to interfere
            with the operation of the services.
          </p>

          <h3>3. Intellectual Property</h3>
          <p>
            All content, trademarks, and intellectual property on the platform are owned or licensed by Stalight. You
            are granted a limited license to use the services as permitted by these Terms.
          </p>

          <h3>4. Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, Stalight's liability for any claim arising from your use of the
            services is limited to the amount paid by you in the prior 12 months, or a minimal statutory amount.
          </p>

          <h3>5. Termination</h3>
          <p>
            We may suspend or terminate accounts that violate these Terms or where required by law. You may terminate
            your account according to the procedures provided in your service agreement.
          </p>

          <h3>6. Governing Law</h3>
          <p>
            These Terms are governed by the laws of India and any dispute will be subject to the courts in Bengaluru,
            India, unless otherwise agreed in writing.
          </p>

          <h3>7. Contact</h3>
          <p>
            For questions about these Terms, contact:
          </p>
          <p>
            STALIGHT TECHNOLOGIES LIMITED<br />
            Email: <a href="mailto:legal@stalight.in">legal@stalight.in</a><br />
            Mobile: +91 73495 51102 / +91 73495 51101<br />
            Registered office: Bengaluru, India
          </p>
        </section>
        
        <div className="mt-12 pt-6 border-t border-slate-100 text-xs text-slate-500">
          <p>© 2026 <Link to="/" className="text-slate-900 font-bold hover:underline">Stalight Technologies</Link>. All rights reserved.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
