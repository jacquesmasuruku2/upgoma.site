import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Cpu, TrendingUp, HeartPulse, Briefcase, Sprout, Leaf, BookOpen, GraduationCap, MapPin, Clock, Award, Target, Users, ChevronRight, SquareCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFacultyContent } from "@/hooks/useSupabaseData";
import { useLanguage } from "@/i18n/LanguageContext";

const iconMap: Record<string, any> = {
  polytechnique: Cpu,
  "sciences-economiques": TrendingUp,
  "sante-publique": HeartPulse,
  management: Briefcase,
  "sciences-developpement": Sprout,
  "sciences-agronomiques": Leaf,
};

const fallbackData: Record<string, any> = {
  polytechnique: {
    name: "Polytechnique",
    full_name: "Faculté de Polytechnique",
    description: "Ingénierie civile, électricité, et technologies de pointe pour reconstruire la nation.",
    long_description: "La Faculté de Polytechnique forme des ingénieurs de haut niveau capables de concevoir, développer et gérer des infrastructures et des systèmes technologiques complexes. Nos programmes combinent une formation théorique rigoureuse avec une expérience pratique en laboratoire et sur le terrain, préparant nos diplômés à relever les défis technologiques du 21ème siècle en République Démocratique du Congo et au-delà.",
    departments: ["Réseaux et Télécommunication", "Génie Civil", "Génie Informatique", "Génie Électrique"],
    objectives: ["Former des ingénieurs compétents et innovants", "Contribuer au développement technologique du pays", "Promouvoir la recherche appliquée"],
  },
  "sciences-economiques": {
    name: "Sciences Économiques",
    full_name: "Faculté de Sciences Économiques",
    description: "Analyse des marchés et gestion des ressources dans un contexte globalisé.",
    long_description: "La Faculté de Sciences Économiques prépare les étudiants à comprendre et analyser les dynamiques économiques nationales et internationales. Elle offre une formation approfondie en théorie économique, en méthodes quantitatives et en politique économique, permettant aux diplômés de contribuer efficacement au développement économique de la région.",
    departments: ["Économie Mathématique", "Économie Publique", "Économie Monétaire", "Économie Rurale", "Économie de Développement"],
    objectives: ["Maîtriser l'analyse économique", "Comprendre les politiques de développement", "Développer l'expertise en gestion des ressources"],
  },
  "sante-publique": {
    name: "Santé Publique",
    full_name: "École de Santé Publique",
    description: "Gestion de la santé communautaire et expertise en épidémiologie.",
    long_description: "L'École de Santé Publique forme des professionnels de la santé spécialisés dans la gestion des institutions de santé, les sciences infirmières, la nutrition et la pédiatrie. Notre approche pédagogique associe cours théoriques, stages cliniques et recherche communautaire pour former des acteurs de santé publique compétents et engagés.",
    departments: ["Sciences Infirmières", "Laboratoire Nutrition", "Pédiatrie", "Gestion Sanitaire", "Épidémiologie"],
    objectives: ["Former des cadres de santé publique", "Améliorer les soins communautaires", "Promouvoir la recherche en santé"],
  },
  management: {
    name: "Management",
    full_name: "Faculté de Management",
    description: "Leadership entrepreneurial et gestion organisationnelle moderne.",
    long_description: "La Faculté de Management développe les compétences en leadership, gestion des organisations et ressources humaines. Nos programmes préparent des managers capables de piloter des organisations dans un environnement complexe et en constante évolution, avec un accent sur l'entrepreneuriat et l'innovation sociale.",
    departments: ["Management des Organisations Sociales", "Management des Ressources Humaines", "Communication et Développement", "Démographie", "Affaires"],
    objectives: ["Développer le leadership entrepreneurial", "Former des gestionnaires polyvalents", "Encourager l'innovation organisationnelle"],
  },
  "sciences-developpement": {
    name: "Sciences de Développement",
    full_name: "Faculté de Sciences de Développement",
    description: "Planification stratégique pour le progrès social et durable.",
    long_description: "La Faculté de Sciences de Développement prépare les étudiants à concevoir et mettre en œuvre des stratégies de développement durable. Cette formation unique combine théorie du développement, action humanitaire et gestion de projets pour former des professionnels capables d'impulser un changement social positif.",
    departments: ["Développement et Actions Humanitaires", "Gestion des Projets"],
    objectives: ["Concevoir des stratégies de développement", "Former des acteurs humanitaires", "Promouvoir le développement durable"],
  },
  "sciences-agronomiques": {
    name: "Sciences Agronomiques & Environnement",
    full_name: "Faculté de Sciences Agronomiques & Environnement",
    description: "Expertise en agriculture moderne et gestion environnementale.",
    long_description: "La Faculté de Sciences Agronomiques & Environnement forme des experts en agriculture durable et gestion de l'environnement. Nos programmes intègrent les techniques agricoles modernes, la préservation des écosystèmes et le développement rural pour répondre aux enjeux alimentaires et environnementaux de la région.",
    departments: ["Agronomie Techniques Rurales Environnement", "Développement Durable", "Phytotechnie", "Zootechnie"],
    objectives: ["Moderniser l'agriculture régionale", "Protéger l'environnement", "Assurer la sécurité alimentaire"],
  },
};

const FacultyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: dbFaculty } = useFacultyContent(slug);
  const { t } = useLanguage();

  const faculty = dbFaculty || (slug ? fallbackData[slug] : null);

  if (!faculty) {
    return (
      <Layout>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Faculté introuvable</h1>
            <Link to="/"><Button variant="outline">{t("admission.back")}</Button></Link>
          </div>
        </section>
      </Layout>
    );
  }

  const Icon = slug ? iconMap[slug] || BookOpen : BookOpen;
  const departments = faculty.departments || [];
  const objectives = faculty.objectives || ["Former des professionnels qualifiés", "Contribuer au développement local", "Promouvoir la recherche"];

  return (
    <Layout>
      {/* Breadcrumb bar */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/#facultes" className="hover:text-primary-foreground transition-colors">{t("nav.faculties")}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary-foreground">{faculty.name}</span>
          </div>
        </div>
      </div>

      {/* Main: Description + Image side by side */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Text left */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-primary leading-tight mb-6">
                  {faculty.full_name}
                </h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px] text-justify">
                  {(faculty.long_description || faculty.description || "").split("\n").map((p: string, i: number) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Image right */}
              <div className="flex justify-center lg:justify-end">
                {faculty.image_url ? (
                  <img
                    src={faculty.image_url}
                    alt={faculty.full_name}
                    className="object-cover max-h-[450px] w-full lg:w-auto shadow-lg"
                  />
                ) : (
                  <div className="w-full max-w-md aspect-[4/5] bg-secondary flex items-center justify-center">
                    <Icon className="w-24 h-24 text-primary/30" />
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Separator */}
          <Separator className="my-14" />

          {/* Sections below */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: 2/3 */}
            <div className="lg:col-span-2 space-y-12">
              {/* Informations pratiques */}
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-upg-orange" />
                  Informations pratiques
                </h2>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  {[
                    { label: "Rentrée académique", value: "Octobre" },
                    { label: "Horaires", value: "8h00 - 16h00" },
                    { label: "Langue d'enseignement", value: "Français" },
                    { label: "Campus", value: "Goma, RDC" },
                    { label: "Nombre de départements", value: `${departments.length}` },
                  ].map((item, i, arr) => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center px-6 py-4">
                        <span className="text-muted-foreground text-sm">{item.label}</span>
                        <span className="font-semibold text-foreground text-sm">{item.value}</span>
                      </div>
                      {i < arr.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Objectifs */}
              <AnimatedSection delay={0.1}>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-upg-orange" />
                  Objectifs de la formation
                </h2>
                <div className="space-y-3">
                  {objectives.map((obj: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                      <SquareCheckBig className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm">{obj}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Départements */}
              <AnimatedSection delay={0.2}>
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-upg-orange" />
                  {t("fac.departments")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {departments.map((dept: string) => (
                    <div key={dept} className="bg-card border border-border rounded-xl p-5 border-l-[3px] border-l-primary hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground text-sm">{dept}</h3>
                          <p className="text-muted-foreground text-xs mt-0.5">Licence · Master · Doctorat</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar right: 1/3 */}
            <div className="space-y-5">
              <AnimatedSection delay={0.1}>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Diplômes délivrés</h3>
                  </div>
                  <div className="space-y-0">
                    {[
                      { label: "Licence (Bac +3)", duration: "3 ans", desc: "Formation de base" },
                      { label: "Master (Bac +5)", duration: "2 ans", desc: "Spécialisation" },
                      { label: "Doctorat (Bac +8)", duration: "3 ans", desc: "Recherche avancée" },
                    ].map((d, i, arr) => (
                      <div key={d.label}>
                        <div className="flex items-start gap-3 py-3">
                          <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 bg-primary" />
                          <div>
                            <p className="text-foreground text-sm font-semibold">{d.label}</p>
                            <p className="text-muted-foreground text-xs">{d.desc} · {d.duration}</p>
                          </div>
                        </div>
                        {i < arr.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <Award className="w-6 h-6 text-upg-orange" />
                    <h3 className="font-bold text-foreground">Points forts</h3>
                  </div>
                  <ul className="space-y-0">
                    {["Système LMD international", "Stages en entreprise", "WiFi gratuit sur le campus", "Bibliothèque numérique", "Encadrement personnalisé"].map((item, i, arr) => (
                      <li key={item}>
                        <div className="flex items-center gap-3 py-3 text-sm text-muted-foreground">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-upg-orange">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          {item}
                        </div>
                        {i < arr.length - 1 && <Separator />}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="rounded-xl p-6 text-center bg-primary text-primary-foreground">
                  <h3 className="font-bold text-lg mb-2">Intéressé par cette faculté ?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">Rejoignez l'Université Polytechnique de Goma</p>
                  <div className="space-y-2">
                    <a href="https://systeme-upgoma.lovable.app/inscription" target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="bg-upg-orange hover:bg-upg-orange/90 text-white w-full font-semibold">
                        {t("hero.cta1")}
                      </Button>
                    </a>
                    <Link to="/frais" className="block">
                      <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full">
                        {t("topbar.fees")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FacultyPage;
