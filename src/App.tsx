
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import { Layout } from "@/components/layout/layout";
import { LoginPage } from "@/pages/auth/login";
import { OnboardingPage } from "@/pages/onboarding/onboarding";
import { DashboardPage } from "@/pages/dashboard/dashboard";
import { AnimaBotPage } from "@/pages/chat/animabot";
import { NotFoundPage } from "@/pages/not-found/404";
import { ServicesPage } from "@/pages/services/services";
import { ProfilePage } from "@/pages/profile/profile";
import { SettingsPage } from "@/pages/settings/settings";
import { HealthRecordPage } from "@/pages/health-record/health-record";
import { JournalPage } from "@/pages/journal/journal";
import { AnimaBotPage as AnimaBotExpertPage } from "@/pages/animabot/animabot";
import { AddEventPage } from "@/pages/add/add-event";
import { StyleguidePage } from "@/pages/styleguide/styleguide";
import { DesignControlsPage } from "@/pages/design-controls/design-controls";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/styleguide" element={<StyleguidePage />} />
          <Route path="/design-controls" element={<DesignControlsPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="animabot" element={<AnimaBotExpertPage />} />
            <Route path="health-record" element={<HealthRecordPage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="add" element={<div className="p-6">Page Ajouter - En construction</div>} />
            <Route path="add-event" element={<AddEventPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
