import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import stalightLogo from "@/assets/logos/stalightlogo.png";
import { SEO } from "@/components/SEO";

const AccountDeletion = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#D32027] selection:text-white">
      <SEO title="Account Deletion Request | Stalight Technologies" description="Account Deletion Request for Stalight Campus." />
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20 md:pt-40 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <img loading="lazy" decoding="async" src={stalightLogo} alt="Stalight logo" className="h-12 w-auto object-contain" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Stalight Campus Account and Data Deletion Request</h1>
          </div>
        </div>

        <section className="prose prose-slate max-w-none">
          <p>
            Users may request deletion of their account and associated personal data by contacting their institution administrator or by submitting a request to <a href="mailto:support@stalight.in">support@stalight.in</a>.
          </p>

          <h2>How to Request Deletion</h2>
          <ol>
            <li>Log in to your Stalight Campus account and navigate to Profile Settings, if available.</li>
            <li>Alternatively, send an email to <a href="mailto:support@stalight.in">support@stalight.in</a> with the subject "Account Deletion Request".</li>
            <li>Include your registered email address, institution name, and user ID (if available).</li>
          </ol>

          <h2>Data Deleted</h2>
          <p>Upon successful verification and approval of the request, the following data may be deleted:</p>
          <ul>
            <li>User profile information</li>
            <li>Login credentials</li>
            <li>Personal account information</li>
            <li>User-generated preferences and settings</li>
          </ul>

          <h2>Data That May Be Retained</h2>
          <p>
            Certain records may be retained for legal, security, audit, compliance, academic, or institutional record-keeping purposes, including:
          </p>
          <ul>
            <li>Attendance records</li>
            <li>Academic records</li>
            <li>Administrative logs</li>
            <li>Compliance and security logs</li>
          </ul>

          <h2>Retention Period</h2>
          <p>
            Data retained for legal or institutional purposes may be stored for the period required by applicable laws, regulations, or institutional policies.
          </p>
          <p>
            For assistance, contact:<br />
            <a href="mailto:support@stalight.in">support@stalight.in</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AccountDeletion;
