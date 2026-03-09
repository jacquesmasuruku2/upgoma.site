import Layout from "@/components/Layout";
import { useGallery } from "@/hooks/useSupabaseData";
import AnimatedSection from "@/components/AnimatedSection";
import { Image } from "lucide-react";

const GalleryPage = () => {
  const { data: images, isLoading } = useGallery();

  return (
    <Layout>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Galerie</h1>
            <p className="text-muted-foreground text-center mb-10">
              Découvrez nos infrastructures et la vie sur le campus
            </p>
          </AnimatedSection>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Chargement...</div>
          ) : images && images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {images.map((img, i) => (
                <AnimatedSection key={img.id} delay={i * 0.1}>
                  <div className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1 group">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={img.image_url}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 bg-card">
                      <h3 className="font-bold text-foreground text-sm">{img.title}</h3>
                      {img.description && (
                        <p className="text-muted-foreground text-xs mt-1">{img.description}</p>
                      )}
                      {img.category && (
                        <span className="text-upg-orange text-xs font-medium">{img.category}</span>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection>
              <div className="text-center py-16">
                <Image className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">
                  La galerie sera bientôt disponible. Les photos seront ajoutées via le panneau d'administration.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;
