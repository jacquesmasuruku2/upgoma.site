import Layout from "@/components/Layout";
import { Calendar, Tag, User, ArrowLeft, Search, Facebook, Linkedin, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBlogArticles } from "@/hooks/useSupabaseData";
import { useComments, useAddComment } from "@/hooks/useSupabaseData";
import AnimatedSection from "@/components/AnimatedSection";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const staticArticles = [
  {
    id: "1",
    published_at: "2026-01-19",
    created_at: "2026-01-19",
    category: "Annonce",
    title: "Lancement d'un nouveau portail",
    excerpt: "L'Université Polytechnique de Goma franchit une étape majeure dans sa transformation digitale...",
    author: null,
    image_url: null,
    content: "L'Université Polytechnique de Goma franchit une étape majeure dans sa transformation digitale. En mettant en ligne son nouveau site internet, l'institution se dote d'un outil stratégique pour répondre aux défis de la communication moderne.\n\nL'expertise interne à l'honneur — Le développement de cette plateforme a été confié au service informatique de l'UPG.\n\nUne plateforme au service de l'étudiant — Au-delà de l'aspect esthétique, le site a été pensé comme un véritable hub de services.",
  },
  {
    id: "2",
    published_at: "2026-01-10",
    created_at: "2026-01-10",
    category: "Académique",
    title: "Ouverture des inscriptions 2026",
    excerpt: "Les inscriptions pour l'année académique 2026 sont officiellement ouvertes.",
    author: null,
    image_url: null,
    content: "Les inscriptions pour l'année académique 2026 sont officiellement ouvertes. Les étudiants sont invités à se présenter au secrétariat académique munis de leurs documents requis.\n\nLes facultés concernées incluent la Polytechnique, les Sciences Économiques, la Santé Publique, le Management, les Sciences de Développement, et les Sciences Agronomiques & Environnement.",
  },
];

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground flex items-center gap-1">
        <Share2 className="w-4 h-4" /> Partager :
      </span>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[hsl(221,44%,41%)] text-white hover:opacity-80">
        <Facebook className="w-4 h-4" />
      </a>
      <a href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[hsl(142,70%,40%)] text-white hover:opacity-80">
        <MessageCircle className="w-4 h-4" />
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[hsl(210,80%,40%)] text-white hover:opacity-80">
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  );
};

const CommentSection = ({ articleId }: { articleId: string }) => {
  const { data: comments } = useComments(articleId);
  const addComment = useAddComment();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    addComment.mutate(
      { article_id: articleId, author_name: name, content },
      { onSuccess: () => { setName(""); setContent(""); } }
    );
  };

  return (
    <div className="mt-8 border-t border-border pt-8">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        Commentaires ({comments?.length || 0})
      </h3>

      <div className="space-y-4 mb-6">
        {(comments || []).map((c: any) => (
          <div key={c.id} className="bg-secondary border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {c.author_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{c.author_name}</p>
                <p className="text-muted-foreground text-xs">
                  {format(new Date(c.created_at), "d MMM yyyy à HH:mm", { locale: fr })}
                </p>
              </div>
            </div>
            <p className="text-foreground text-sm">{c.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-4 space-y-3">
        <h4 className="font-semibold text-foreground text-sm">Laisser un commentaire</h4>
        <Input placeholder="Votre nom *" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Votre commentaire *" value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
        <Button type="submit" size="sm" disabled={addComment.isPending}>
          {addComment.isPending ? "Envoi..." : "Commenter"}
        </Button>
      </form>
    </div>
  );
};

const BlogPage = () => {
  const { data: dbArticles } = useBlogArticles(true);
  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : staticArticles;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const articleParam = searchParams.get("article");
    if (articleParam) setSelectedId(articleParam);
  }, [searchParams]);

  const selectedArticle = selectedId ? articles.find((a) => a.id === selectedId) : null;

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      (a.category || "").toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt || "").toLowerCase().includes(search.toLowerCase())
  );

  if (selectedArticle) {
    const articleUrl = `${window.location.origin}/blog?article=${selectedArticle.id}`;

    return (
      <Layout>
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <Button variant="ghost" className="mb-6 text-primary" onClick={() => setSelectedId(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux articles
            </Button>
            <article className="bg-card border border-border rounded-lg overflow-hidden">
              {selectedArticle.image_url && (
                <div className="sticky top-16 z-10">
                  <img src={selectedArticle.image_url} alt={selectedArticle.title} className="w-full h-64 object-cover" />
                </div>
              )}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(selectedArticle.published_at || selectedArticle.created_at), "d MMM yyyy", { locale: fr })}
                  </span>
                  {selectedArticle.category && (
                    <span className="flex items-center gap-1 text-upg-orange">
                      <Tag className="w-4 h-4" /> {selectedArticle.category}
                    </span>
                  )}
                  {selectedArticle.author && (
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {selectedArticle.author}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{selectedArticle.title}</h1>
                <div className="prose prose-sm max-w-none text-foreground whitespace-pre-line leading-relaxed">
                  {selectedArticle.content || selectedArticle.excerpt}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <ShareButtons title={selectedArticle.title} url={articleUrl} />
                </div>

                <CommentSection articleId={selectedArticle.id} />
              </div>
            </article>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-primary uppercase tracking-tight">Nos Dernières Nouvelles</h1>
              <p className="text-muted-foreground mt-2">Restez connecté pour suivre nos dernières actualités</p>
            </div>
          </AnimatedSection>

          <div className="max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une actualité..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((a, i) => (
              <AnimatedSection key={a.id} delay={i * 0.08}>
                <article className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    {a.image_url ? (
                      <img src={a.image_url} alt={a.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                        Pas d'image
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h2 className="text-lg font-bold text-foreground mb-3 leading-snug line-clamp-3">
                      {a.title}
                    </h2>
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(a.published_at || a.created_at), "yyyy-MM-dd HH:mm:ss", { locale: fr })}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3 flex-1">
                      {a.excerpt || a.content?.slice(0, 120) + " ..."}
                    </p>
                    <div className="mt-5">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wider text-xs px-6 py-2 rounded"
                        onClick={() => setSelectedId(a.id)}
                      >
                        En savoir plus
                      </Button>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
