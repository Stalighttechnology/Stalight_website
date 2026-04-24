import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NeuroCampus from "./pages/NeuroCampus.tsx";
import NeuroCampusAccessPlan from "./pages/NeuroCampusAccessPlan.tsx";
import NeuroSync from "./pages/NeuroSync.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import NotFound from "./pages/NotFound.tsx";
import SoftwareDevelopment from "./pages/SoftwareDevelopment.tsx";
import SkillDevelopment from "./pages/SkillDevelopment.tsx";
import ITServices from "./pages/ITServices.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/neuro-campus" element={<NeuroCampus />} />
          <Route path="/neuro-campus-access" element={<NeuroCampusAccessPlan />} />
          <Route path="/neurosync" element={<NeuroSync />} />
          <Route path="/software-development" element={<SoftwareDevelopment />} />
          <Route path="/skill-development" element={<SkillDevelopment />} />
          <Route path="/it-services" element={<ITServices />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
