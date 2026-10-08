import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import stalightLogo from "@/assets/logos/stalightlogo.webp";
import { SEO } from "@/components/SEO";

const PrivacyPolicy = () => {
  const effectiveDate = "21 May 2026";

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D32027] selection:text-white">
      <SEO 
        title="Privacy Policy | Stalight Technologies - Software Development Company"
        description="Privacy policy for Stalight Technologies, a leading AI-first software development company in Bengaluru, India."
        keywords="Stalight Technologies, Privacy Policy, Software Development, Bengaluru, AI Company, India"
      />
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20 md:pt-40 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <img loading="lazy" decoding="async" src={stalightLogo} alt="Stalight logo" className="h-12 w-auto object-contain" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Privacy Policy</h1>
            <p className="text-sm text-slate-600">Effective date: {effectiveDate}</p>
          </div>
        </div>

        <section className="prose prose-slate max-w-none">
          <h2>Introduction</h2>
          <p>
            STALIGHT TECHNOLOGIES LIMITED ("Stalight", "we", "our", or "us") is committed to protecting the privacy of
            visitors to our website and users of our services. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your personal information.
          </p>

          <h3>1. Information We Collect</h3>
          <ul>
            <li>Contact details (name, email, phone) when you request demos or contact support.</li>
            <li>Account and authentication data for registered users.</li>
            <li>Usage and analytics data to improve performance and reliability.</li>
            <li>Marketing and communication preferences.</li>
          </ul>

          <h3>2. How We Use Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, operate, and maintain our services.</li>
            <li>Respond to inquiries, support requests and to schedule demos.</li>
            <li>Improve, personalize and support the user experience.</li>
            <li>Send service-related communications, updates, and marketing where permitted.</li>
          </ul>

          <h3>3. Sharing and Disclosure</h3>
          <p>
            We do not sell personal information. We may share information with service providers acting on our behalf,
            with legal authorities when required, and in connection with business transfers (e.g., mergers or acquisitions).
          </p>

          <h3>4. Data Retention</h3>
          <p>
            We retain personal information for as long as necessary to provide services, comply with legal obligations,
            resolve disputes, and enforce our agreements.
          </p>

          <h3>5. Security</h3>
          <p>
            We employ administrative, technical, and physical safeguards designed to protect data from unauthorized
            access. No system is completely secure; please contact us if you suspect any breach.
          </p>

          <h3>6. Cookies and Tracking</h3>
          <p>
            We use cookies and similar tracking technologies for essential site functionality, analytics, and to
            understand usage patterns. You can control cookies via your browser settings.
          </p>

          <h3>7. Your Rights</h3>
          <p>
            Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data, and
            to object to or restrict certain processing. Contact us to exercise these rights.
          </p>

          <h3>8. Contact</h3>
          <p>
            For questions about this Privacy Policy or to exercise your data rights, contact us at:
          </p>
          <p>
            STALIGHT TECHNOLOGIES LIMITED<br />
            Email: <a href="mailto:privacy@stalight.in">privacy@stalight.in</a><br />
            Mobile: +91 73495 51102 / +91 73495 51101<br />
            Registered office: Bengaluru, India
          </p>

          <h3>9. Changes to this Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated policy on this page with a new
            effective date.
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

export default PrivacyPolicy;
