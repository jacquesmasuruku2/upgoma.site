import formationImg from "@/assets/formation.jpg";
import { Target, Eye } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const AboutSection = () => {
  return (
    <section id="institution" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimatedSection>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                Une Histoire d'Excellence et de Vision Technologique
              </h2>
              <div className="text-foreground text-sm sm:text-base leading-relaxed space-y-4">
                <p>
                  Située à Goma, dans la province du Nord‑Kivu en République démocratique du Congo,
                  l'Université Polytechnique de Goma (UPG) est une institution d'enseignement supérieur
                  tournée vers l'excellence technique, scientifique et sociale. Née d'une vision ambitieuse
                  de formation des futurs bâtisseurs de la RD Congo, l'UPG allie rigueur académique,
                  innovation pratique et impact sur le développement local.
                </p>
                <p>
                  L'UPG se distingue par une pédagogie dynamique : elle met l'accent sur des compétences
                  pratiques, l'innovation technologique et la capacité à apporter des solutions concrètes
                  aux défis socio‑économiques de la région. L'université forme des professionnels compétents
                  dans les domaines des sciences appliquées, de l'ingénierie, des technologies de
                  l'information et de la gestion des infrastructures, ainsi que dans d'autres filières
                  techniques essentielles pour le progrès technologique et industriel du pays.
                </p>
                <p>
                  Forte d'un environnement d'apprentissage innovant et inclusif, l'UPG encourage les
                  étudiants à se réinventer, à penser de manière critique et à exploiter pleinement
                  les nouvelles technologies pour relever les défis actuels et futurs. L'université
                  se veut un véritable carrefour d'innovation et de créativité, contribuant non seulement
                  à la formation de cadres compétents, mais aussi à l'optimisation du capital humain
                  au service du développement durable de la RD Congo.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={formationImg}
                  alt="Formation UPG"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Notre Mission</h4>
                    <p className="text-muted-foreground text-sm">
                      Former des cadres compétents et innovateurs capables de transformer les défis
                      en opportunités de développement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-upg-orange/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-upg-orange" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Notre Vision</h4>
                    <p className="text-muted-foreground text-sm">
                      Devenir le pôle d'excellence de référence en ingénierie et sciences appliquées
                      en Afrique Centrale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
