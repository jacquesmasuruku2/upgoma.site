import { FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";

const documents = [
  "Diplôme d'État ou son équivalent",
  "Bulletin de la 5ème et 6ème année des Humanités",
  "Attestation de naissance et de bonne vie et mœurs",
  "4 Photos passeport récentes",
  "Certificat d'aptitude physique",
];


const AdmissionSection = () => {
  return (
    <section id="admission" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
              Processus d'Admission
            </h2>
            <p className="text-muted-foreground">Rejoignez l'élite</p>
            <blockquote className="mt-4 text-foreground italic max-w-xl mx-auto">
              "L'éducation est l'arme la plus puissante pour changer le monde." – Nelson Mandela
            </blockquote>
          </div>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto space-y-8">
          <AnimatedSection delay={0.2}>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Pièces à fournir (format PDF)
              </h3>
              <ul className="space-y-2">
                {documents.map((doc) => (
                  <li key={doc} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-primary shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Inscription en ligne
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Remplissez le formulaire d'inscription complet en cliquant sur le bouton ci-dessous.
              </p>
              <a
                href="https://upg-system.vercel.app/inscription"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Accéder au formulaire d'inscription
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AdmissionSection;
