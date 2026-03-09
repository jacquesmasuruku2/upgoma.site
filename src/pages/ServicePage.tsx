import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import RichContent from "@/components/RichContent";
import { ChevronRight, Mail } from "lucide-react";

const useServices = () =>
  useQuery({
    queryKey: ["services-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services" as any)
        .select("*")
        .eq("published", true)
        .order("display_order");
      if (error) throw error;
      return data as any[];
    },
  });

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services" as any)
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (error) throw error;
      return data as any;
    },
    enabled: !!slug,
  });

  const { data: allServices } = useServices();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="relative text-white py-20 overflow-hidden">
          {/* Background: service image or fallback color */}
          {service?.image_url ? (
            <img
              src={service.image_url}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-[hsl(210,70%,20%)]" />
          )}
          <div className="absolute inset-0 bg-black/55" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              {isLoading ? "Chargement..." : service?.name || "Service introuvable"}
            </h1>
            {service?.description && (
              <p className="text-base text-white/80 max-w-2xl mx-auto">{service.description}</p>
            )}
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-12">Chargement...</div>
              ) : service ? (
                <div>
                  {/* Tab-like header */}
                  <div className="border-b-2 border-primary mb-6">
                    <span className="inline-block bg-background border border-b-0 border-border px-4 py-2 text-sm font-medium text-foreground rounded-t-md -mb-[2px] relative z-10">
                      Présentation service
                    </span>
                  </div>

                  {/* Image full width */}
                  {service.image_url && (
                    <div className="mb-6 rounded-lg overflow-hidden border border-border">
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-full h-auto max-h-[450px] object-cover"
                      />
                    </div>
                  )}

                  {/* Text below image */}
                  {service.long_description ? (
                    <RichContent content={service.long_description} />
                  ) : (
                    <p className="text-muted-foreground">
                      Aucun détail disponible pour ce service.
                    </p>
                  )}

                  {/* Contact email */}
                  {service.contact_email && (
                    <div className="mt-8 p-4 bg-muted/50 border border-border rounded-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Contact</p>
                        <a href={`mailto:${service.contact_email}`} className="text-sm text-primary font-semibold hover:underline">
                          {service.contact_email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-12">Service introuvable.</p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-[300px] shrink-0">
              <div className="sticky top-24">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-1">
                  Services
                </h3>
                <div className="w-full h-[2px] bg-primary mb-3" />
                <nav className="space-y-0">
                  {(allServices || []).map((s: any) => {
                    const isActive = s.slug === slug;
                    return (
                      <Link
                        key={s.id}
                        to={`/service/${s.slug}`}
                        className={`flex items-center gap-2 px-3 py-2.5 text-sm border-b border-dashed border-border transition-colors hover:bg-muted/50 ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-foreground hover:text-primary"
                        }`}
                      >
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground" />
                        <span className="uppercase text-xs tracking-wide">{s.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
