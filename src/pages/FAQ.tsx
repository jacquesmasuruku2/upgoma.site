import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Comment s'inscrire à l'UPG ?",
    a: "Vous pouvez vous inscrire en ligne via notre formulaire d'inscription ou vous présenter directement au campus de Goma avec les pièces requises : Diplôme d'État, bulletins des 5ème et 6ème années, attestation de naissance, 4 photos passeport et un certificat d'aptitude physique.",
  },
  {
    q: "Quels sont les frais académiques ?",
    a: "L'UPG pratique des frais académiques largement réduits pour rendre l'excellence accessible à tous. Contactez-nous pour les détails spécifiques à chaque faculté.",
  },
  {
    q: "Qu'est-ce que le système LMD ?",
    a: "Le système LMD (Licence-Master-Doctorat) est un standard international qui structure les études en 3 niveaux : Licence (3 ans), Master (2 ans) et Doctorat (3 ans). Il facilite la mobilité étudiante et la reconnaissance des diplômes à l'international.",
  },
  {
    q: "Y a-t-il des bourses disponibles ?",
    a: "Oui, l'UPG offre des bourses d'entrepreneuriat aux étudiants pour soutenir les Activités Génératrices de Revenus (AGR) ainsi que des bourses d'excellence académique.",
  },
  {
     q: "L'UPG dispose-t-elle d'un accès Internet ?",
     a: "Oui, l'UPG offre une connexion Starlink haut débit gratuite sur tout le campus pour faciliter la recherche et l'apprentissage en ligne.",
  },
  {
    q: "Quelles facultés sont disponibles ?",
    a: "L'UPG propose 7 facultés : Polytechnique, Sciences Économiques, Santé Publique, Management, Sciences de Développement, Sciences Agronomiques & Environnement.",
  },
  {
    q: "Comment contacter l'administration ?",
    a: "Vous pouvez nous joindre par téléphone au +243 973 380 118, par email à info@upgoma.org, ou vous rendre directement au campus situé à Goma, Quartier Lac Vert, Avenue Nyarutsiru.",
  },
];

const FAQ = () => {
  return (
    <Layout>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-primary mb-2 text-center">
            Questions Fréquentes
          </h1>
          <p className="text-muted-foreground text-center mb-10">
            Trouvez les réponses aux questions les plus courantes sur l'UPG.
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
