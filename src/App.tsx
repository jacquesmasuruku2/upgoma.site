import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PersonnelPage from "./pages/PersonnelPage";
import BlogPage from "./pages/BlogPage";
import CollegeEtudiantsPage from "./pages/CollegeEtudiantsPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import GalleryPage from "./pages/GalleryPage";
import FeesPage from "./pages/FeesPage";
import FacultyPage from "./pages/FacultyPage";
import LibraryPage from "./pages/LibraryPage";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import NotFound from "./pages/NotFound";
import ConfirmNewsletter from "./pages/ConfirmNewsletter";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/personnel" element={<PersonnelPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/college-etudiants" element={<CollegeEtudiantsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/galerie" element={<GalleryPage />} />
            <Route path="/frais" element={<FeesPage />} />
            <Route path="/faculte/:slug" element={<FacultyPage />} />
            <Route path="/bibliotheque" element={<LibraryPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:slug" element={<ServicePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/confirmer-newsletter" element={<ConfirmNewsletter />} />
            <Route path="/politique-de-confidentialite" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
