import React, { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoadingScreen } from "@/components/LoadingScreen";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index.tsx"));
const NeuroCampus = lazy(() => import("./pages/NeuroCampus.tsx"));
const NeuroCampusAccessPlan = lazy(() => import("./pages/NeuroCampusAccessPlan.tsx"));
const NeuroSync = lazy(() => import("./pages/NeuroSync.tsx"));
const AboutUs = lazy(() => import("./pages/AboutUs.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const SoftwareDevelopment = lazy(() => import("./pages/SoftwareDevelopment.tsx"));
const SkillDevelopment = lazy(() => import("./pages/SkillDevelopment.tsx"));
const ITServices = lazy(() => import("./pages/ITServices.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.tsx"));
const AccountDeletion = lazy(() => import("./pages/AccountDeletion.tsx"));
const NDAOnboarding = lazy(() => import("./pages/NDAOnboarding.tsx"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificate.tsx"));

import { VoiceAssistantProvider } from "@/context/VoiceAssistantContext";
import { StalightVoiceAssistant } from "@/components/voice/StalightVoiceAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VoiceAssistantProvider>
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/services" element={<ITServices />} />
              <Route path="/it-services" element={<ITServices />} />
              <Route path="/products" element={<SoftwareDevelopment />} />
              <Route path="/software-development" element={<SoftwareDevelopment />} />
              <Route path="/skill-development" element={<SkillDevelopment />} />
              <Route path="/Stalight-Sync" element={<NeuroSync />} />
              <Route path="/Stalight-Campus" element={<NeuroCampus />} />
              <Route path="/Stalight-Campus-Access" element={<NeuroCampusAccessPlan />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/account-deletion" element={<AccountDeletion />} />
              <Route path="/verify/:certificateId" element={<VerifyCertificate />} />
              <Route path="/verify-offer/:certificateId" element={<VerifyCertificate />} />
              <Route path="/qX9mK7vNp4Rt8Yw2Lz5Bc1Hd6Fj3Ua9Pe7Tn4Mk8Rs2Vx6Qw1Zc9Lp5Dy3Hb8Ng4-onboarding-550e8400-e29b-41d4-a716-446655440000" element={<NDAOnboarding />} />

              {/* CATCH-ALL ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <StalightVoiceAssistant />
        </VoiceAssistantProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


