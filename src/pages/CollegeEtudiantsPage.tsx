import { useState } from "react";
import Layout from "@/components/Layout";
import { Users, Megaphone, CalendarDays, ChevronRight } from "lucide-react";
import { useCollegePosts, useBlogArticles } from "@/hooks/useSupabaseData";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Link } from "react-router-dom";

const MAX_CHARS = 200;

const CollegeEtudiantsPage = () => {
  const { data: posts } = useCollegePosts(true);
  const { data: articles } = useBlogArticles(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Layout>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">
              Collège des Étudiants
            </h1>
            <p className="text-muted-foreground text-center mb-10">
              Représentation et vie estudiantine à l'UPG
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Users, title: "Comité Exécutif", text: "Le comité estudiantin représente les intérêts de tous les étudiants auprès de l'administration." },
              { icon: Megaphone, title: "Annonces", text: "Retrouvez ici toutes les communications et annonces du collège des étudiants." },
              { icon: CalendarDays, title: "Événements", text: "Activités culturelles, sportives et académiques organisées par les étudiants." },
            ].map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.15}>
                <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-upg-sky-light flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">{card.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {posts && posts.length > 0 ? (
                <div className="space-y-8">
                  <h2 className="text-xl font-bold text-foreground text-center mb-4">Publications Récentes</h2>
                  {posts.map((p, i) => {
                    const isLong = (p.content?.length || 0) > MAX_CHARS;
                    const isExpanded = expandedIds.has(p.id);
                    const displayContent = isLong && !isExpanded
                      ? p.content?.slice(0, MAX_CHARS) + "..."
                      : p.content;

                    return (
                      <AnimatedSection key={p.id} delay={i * 0.1}>
                        <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                          {p.image_url && (
                            <img src={p.image_url} alt={p.title} className="w-full h-64 md:h-80 object-cover" />
                          )}
                          <div className="p-6">
                            <h3 className="font-bold text-foreground text-xl mb-2">{p.title}</h3>
                            <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-muted-foreground">
                              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">Collège</span>
                              <span className="flex items-center gap-1">
                                <CalendarDays className="w-3 h-3" />
                                {format(new Date(p.created_at), "d MMM yyyy", { locale: fr })}
                              </span>
                              {p.author && <span>Par {p.author}</span>}
                            </div>
                            <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">{displayContent}</p>
                            <div className="mt-4">
                              {isLong && (
                                <Button
                                  size="sm"
                                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold uppercase tracking-wide text-xs"
                                  onClick={() => toggleExpand(p.id)}
                                >
                                  {isExpanded ? "Voir moins" : "Lire plus"}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              ) : (
                <AnimatedSection delay={0.3}>
                  <div className="bg-upg-sky-light border border-primary/20 rounded-lg p-8 text-center">
                    <h3 className="font-bold text-foreground text-lg mb-2">
                      Espace du Comité Estudiantin
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Les publications et informations du comité estudiantin seront bientôt disponibles ici.
                    </p>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar - Articles Récents */}
            <aside className="w-full lg:w-72 shrink-0">
              <AnimatedSection delay={0.2}>
                <div className="border-l-4 border-primary pl-4 mb-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Articles Récents</h3>
                </div>
                <div className="divide-y divide-border">
                  {articles && articles.length > 0 ? (
                    articles.slice(0, 5).map((a) => (
                      <Link
                        key={a.id}
                        to={`/blog?article=${a.id}`}
                        className="flex items-start gap-2 py-3 group hover:bg-accent/50 px-2 -mx-2 rounded transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                          {a.title}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm py-3">Aucun article pour le moment.</p>
                  )}
                </div>
                <div className="mt-4">
                  <Link to="/blog">
                    <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary/5">
                      Voir tous les articles
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CollegeEtudiantsPage;
