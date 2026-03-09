import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import logoUpg from "@/assets/logo-upg.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 1200 1227" className="w-4 h-4" fill="currentColor">
    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/>
  </svg>
);

const quickLinks = [
  { label: "nav.home", href: "/" },
  { label: "nav.about", href: "/about" },
  { label: "nav.blog", href: "/blog" },
  { label: "nav.personnel", href: "/personnel" },
  { label: "nav.contact", href: "/contact" },
  { label: "nav.faq", href: "/faq" },
];


const FooterSection = () => {
  const [nlName, setNlName] = useState("");
  const [nlEmail, setNlEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { data: services } = useQuery({
    queryKey: ["services-footer"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services" as any).select("*").eq("published", true).order("display_order");
      if (error) throw error;
      return data as any[];
    },
  });

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlName.trim() || !nlEmail.trim()) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { name: nlName.trim(), email: nlEmail.trim() },
      });
      if (error) throw error;
      toast.success(data?.message || "Un email de confirmation vous a été envoyé !");
      setNlName("");
      setNlEmail("");
    } catch (err: any) {
      toast.error(err?.message || "Une erreur est survenue. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[hsl(200,25%,18%)] text-white">
      {/* Orange top accent line */}
      <div className="h-1 bg-upg-orange w-full" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img src={logoUpg} alt="Logo UPG" className="h-10 w-10 object-contain" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                {t("footer.tagline") || "A PROPOS DE NOUS"}
              </h4>
            </div>
            <div className="w-10 h-0.5 bg-upg-orange mb-4" />
            <p className="text-white/60 text-sm leading-relaxed">
              L'Université Polytechnique de Goma (UPG) est un établissement d'enseignement supérieur et universitaire engagé dans la formation de cadres compétents pour le développement durable de la RDC.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/upgoma/?locale=fr_FR" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:bg-[#1877F2]/80 transition-colors text-white">
                <FacebookIcon />
              </a>
              <a href="https://cd.linkedin.com/company/universit%C3%A9-polytechnique-de-goma" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2]/80 transition-colors text-white">
                <LinkedInIcon />
              </a>
              <a href="https://x.com/UP_Goma" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
              {t("footer.quicklinks")}
            </h4>
            <div className="w-10 h-0.5 bg-upg-orange mb-4" />
            <ul className="space-y-0">
              {quickLinks.map((l, i) => (
                <li key={l.label}>
                  <Link to={l.href} className="block text-white/60 text-sm py-2 hover:text-upg-orange transition-colors border-b border-dashed border-white/15">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Nos Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
              NOS SERVICES
            </h4>
            <div className="w-10 h-0.5 bg-upg-orange mb-4" />
            <ul className="space-y-0">
              {(services || []).map((s: any) => (
                <li key={s.id}>
                  <Link to={`/service/${s.slug}`} className="block text-white/60 text-sm py-2 hover:text-upg-orange transition-colors border-b border-dashed border-white/15">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-1">
              {t("footer.contact")}
            </h4>
            <div className="w-10 h-0.5 bg-upg-orange mb-4" />
            <ul className="space-y-0 text-white/60 text-sm">
              <li className="flex items-start gap-2 py-2 border-b border-dashed border-white/15">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-upg-orange" />
                Goma, Quartier Lac Vert, Avenue Nyarutsiru, Avant entrée Buhimba
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-dashed border-white/15">
                <Phone className="w-4 h-4 shrink-0 text-upg-orange" />
                +1 613-261-2229
              </li>
              <li className="flex items-center gap-2 py-2 border-b border-dashed border-white/15">
                <Mail className="w-4 h-4 shrink-0 text-upg-orange" />
                info@upgoma.org
              </li>
            </ul>

            <h4 className="font-bold text-sm uppercase tracking-wider text-white mt-6 mb-1">
              {t("footer.newsletter")}
            </h4>
            <div className="w-10 h-0.5 bg-upg-orange mb-3" />
            <form onSubmit={handleNewsletter} className="space-y-2">
              <Input
                value={nlName}
                onChange={(e) => setNlName(e.target.value)}
                placeholder="Votre nom"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-9 text-sm"
              />
              <div className="flex gap-2">
                <Input
                  type="email"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder="Votre email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-9 text-sm"
                />
                <Button type="submit" size="sm" className="bg-upg-orange text-white hover:bg-upg-orange/90 shrink-0" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[hsl(200,25%,14%)]">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/50 text-xs">
          <p>{t("footer.copyright")}</p>
          <Link to="/politique-de-confidentialite" className="hover:text-upg-orange transition-colors underline underline-offset-2">
            Politique de confidentialité
          </Link>
          <a href="mailto:jacquesmasuruku2@gmail.com" className="hover:text-upg-orange transition-colors" title="Contact développeur">{t("footer.designed")}</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
