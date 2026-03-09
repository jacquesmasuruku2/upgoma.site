import { BookOpen, Award, Wifi, DollarSign } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    { icon: BookOpen, title: t("feat.teaching.title"), text: t("feat.teaching.text") },
    { icon: Award, title: t("feat.scholarship.title"), text: t("feat.scholarship.text") },
    { icon: Wifi, title: t("feat.internet.title"), text: t("feat.internet.text") },
    { icon: DollarSign, title: t("feat.fees.title"), text: t("feat.fees.text") },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-upg-sky-light flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
