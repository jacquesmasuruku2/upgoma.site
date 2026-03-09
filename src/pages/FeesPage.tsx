import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFees } from "@/hooks/useSupabaseData";
import AnimatedSection from "@/components/AnimatedSection";
import { GraduationCap, Download, FileText, ChevronRight, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const defaultFees = [
  { faculty: "Polytechnique", cycle: "Licence", amount: 400, currency: "USD", pdf_url: null },
  { faculty: "Polytechnique", cycle: "Master", amount: 500, currency: "USD", pdf_url: null },
  { faculty: "Sciences Économiques", cycle: "Licence", amount: 350, currency: "USD", pdf_url: null },
  { faculty: "Sciences Économiques", cycle: "Master", amount: 450, currency: "USD", pdf_url: null },
  { faculty: "Santé Publique", cycle: "Licence", amount: 380, currency: "USD", pdf_url: null },
  { faculty: "Santé Publique", cycle: "Master", amount: 480, currency: "USD", pdf_url: null },
  { faculty: "Management", cycle: "Licence", amount: 350, currency: "USD", pdf_url: null },
  { faculty: "Management", cycle: "Master", amount: 450, currency: "USD", pdf_url: null },
  { faculty: "Sciences de Développement", cycle: "Licence", amount: 320, currency: "USD", pdf_url: null },
  { faculty: "Sciences Agronomiques & Environnement", cycle: "Licence", amount: 350, currency: "USD", pdf_url: null },
];

const accentColors = [
  "from-primary to-primary/80",
  "from-emerald-600 to-emerald-500",
  "from-rose-600 to-rose-500",
  "from-amber-600 to-amber-500",
  "from-violet-600 to-violet-500",
  "from-teal-600 to-teal-500",
];

const FeesPage = () => {
  const { t } = useLanguage();
  const { data: dbFees } = useFees();
  const fees = dbFees && dbFees.length > 0 ? dbFees : defaultFees;
  const faculties = [...new Set(fees.map((f) => f.faculty))];
  const [activeFaculty, setActiveFaculty] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero banner */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-5 right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-14 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-6">
              <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-primary-foreground">{t("fees.title")}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                <Banknote className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-primary-foreground">{t("fees.title")}</h1>
                <p className="text-primary-foreground/70 mt-1">{t("fees.subtitle")}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Faculty filter pills */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-10 justify-center">
              <button
                onClick={() => setActiveFaculty(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !activeFaculty
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                Toutes les facultés
              </button>
              {faculties.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFaculty(f === activeFaculty ? null : f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFaculty === f
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculties
              .filter((f) => !activeFaculty || f === activeFaculty)
              .map((faculty, fi) => {
                const facultyFees = fees.filter((f) => f.faculty === faculty);
                const pdfUrl = facultyFees.find((f) => (f as any).pdf_url)?.pdf_url as string | undefined;
                const colorIdx = fi % accentColors.length;

                return (
                  <AnimatedSection key={faculty} delay={fi * 0.08}>
                    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                      {/* Colored header */}
                      <div className={`bg-gradient-to-r ${accentColors[colorIdx]} p-5 text-white`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5" />
                          </div>
                          <h2 className="font-bold text-base leading-tight">{faculty}</h2>
                        </div>
                      </div>

                      {/* Fee rows */}
                      <div className="flex-1 p-0">
                        {facultyFees.map((fee, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-between px-5 py-4 ${
                              i < facultyFees.length - 1 ? "border-b border-border" : ""
                            }`}
                          >
                            <div>
                              <p className="text-foreground font-medium text-sm">{fee.cycle}</p>
                              {(fee as any).description && (
                                <p className="text-muted-foreground text-xs mt-0.5">{(fee as any).description}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-black text-primary">{fee.amount}</span>
                              <span className="text-muted-foreground text-xs ml-1">{fee.currency}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      {pdfUrl && (
                        <div className="p-4 border-t border-border">
                          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download>
                            <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                              <Download className="w-3.5 h-3.5" />
                              <FileText className="w-3.5 h-3.5" />
                              Télécharger le barème PDF
                            </Button>
                          </a>
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                );
              })}
          </div>

          {/* Bottom note + CTA */}
          <AnimatedSection delay={0.4}>
            <div className="mt-12 bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Les frais sont susceptibles de changer. Contactez l'administration pour plus d'informations.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a href="https://systeme-upgoma.lovable.app/inscription" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary hover:bg-primary/90 gap-2">
                    <GraduationCap className="w-4 h-4" />
                    S'inscrire maintenant
                  </Button>
                </a>
                <Link to="/contact">
                  <Button variant="outline">Contacter l'administration</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default FeesPage;
