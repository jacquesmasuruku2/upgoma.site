import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import LMDSection from "@/components/LMDSection";
import FacultiesSection from "@/components/FacultiesSection";
import PersonnelSection from "@/components/PersonnelSection";
import NewsSection from "@/components/NewsSection";
import AdmissionSection from "@/components/AdmissionSection";
import CalendarSection from "@/components/CalendarSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <AboutSection />
      <LMDSection />
      <FacultiesSection />
      <CalendarSection />
      <PersonnelSection />
      <NewsSection />
      <AdmissionSection />
    </Layout>
  );
};

export default Index;
