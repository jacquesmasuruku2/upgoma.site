import { Link } from "react-router-dom";
import { Cpu, TrendingUp, HeartPulse, Briefcase, Sprout, Leaf, ArrowRight, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { useAllFacultyContent } from "@/hooks/useSupabaseData";

const iconMap: Record<string, any> = {
  polytechnique: Cpu,
  "sciences-economiques": TrendingUp,
  "sante-publique": HeartPulse,
  management: Briefcase,
  "sciences-developpement": Sprout,
  "sciences-agronomiques": Leaf,
};

const accentMap: Record<string, { accent: string; accentBg: string }> = {
  polytechnique: { accent: "hsl(210,70%,45%)", accentBg: "bg-blue-500/10" },
  "sciences-economiques": { accent: "hsl(160,60%,40%)", accentBg: "bg-emerald-500/10" },
  "sante-publique": { accent: "hsl(350,70%,50%)", accentBg: "bg-red-500/10" },
  management: { accent: "hsl(25,90%,55%)", accentBg: "bg-amber-500/10" },
  "sciences-developpement": { accent: "hsl(270,50%,55%)", accentBg: "bg-violet-500/10" },
  "sciences-agronomiques": { accent: "hsl(140,50%,40%)", accentBg: "bg-green-500/10" },
};

const defaultAccents = [
  { accent: "hsl(200,60%,50%)", accentBg: "bg-sky-500/10" },
  { accent: "hsl(330,60%,50%)", accentBg: "bg-pink-500/10" },
  { accent: "hsl(45,80%,50%)", accentBg: "bg-yellow-500/10" },
  { accent: "hsl(180,50%,40%)", accentBg: "bg-teal-500/10" },
];

const FacultiesSection = () => {
  const { t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { data: dbFaculties } = useAllFacultyContent();

  const faculties = (dbFaculties || []).map((f, i) => ({
    icon: iconMap[f.slug] || GraduationCap,
    name: f.name,
    slug: f.slug,
    desc: f.description || "",
    departments: f.departments || [],
    ...(accentMap[f.slug] || defaultAccents[i % defaultAccents.length]),
  }));

  if (faculties.length === 0) return null;

  return (
    <section id="facultes" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-14">
            <span className="inline-block text-[hsl(var(--upg-orange))] text-sm font-semibold tracking-wider uppercase mb-2">
              Formations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
              {t("fac.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              {t("fac.subtitle")}
            </p>
          </div>
        </AnimatedSection>

        {/* Featured first faculty */}
        <AnimatedSection>
          <Link
            to={`/faculte/${faculties[0].slug}`}
            className="block max-w-6xl mx-auto mb-8 group"
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className={`w-14 h-14 rounded-xl ${faculties[0].accentBg} flex items-center justify-center mb-5`}>
                  <Cpu className="w-7 h-7" style={{ color: faculties[0].accent }} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {faculties[0].name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {faculties[0].desc}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-primary font-semibold group-hover:gap-3 transition-all">
                  Explorer la faculté <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              <div className="p-8 lg:p-10 bg-secondary/50 flex flex-col justify-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Départements</p>
                <div className="space-y-2.5">
                  {faculties[0].departments.map((d) => (
                    <div key={d} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: faculties[0].accent }} />
                      <span className="text-foreground text-sm">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>

        {/* Remaining faculties grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {faculties.slice(1).map((f, i) => (
            <AnimatedSection key={f.name} delay={i * 0.08}>
              <Link
                to={`/faculte/${f.slug}`}
                className="block bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 group h-full"
                onMouseEnter={() => setHoveredIdx(i + 1)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Top accent line */}
                <div className="h-1 transition-all duration-300" style={{
                  backgroundColor: hoveredIdx === i + 1 ? f.accent : 'transparent'
                }} />

                <div className="p-6">
                  <div className={`w-11 h-11 rounded-lg ${f.accentBg} flex items-center justify-center mb-4`}>
                    <f.icon className="w-5 h-5" style={{ color: f.accent }} />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                    {f.name}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">{f.desc}</p>

                  {/* Departments */}
                  <div className="space-y-1.5 mb-4">
                    {f.departments.slice(0, 3).map((d) => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: f.accent }} />
                        <span className="text-muted-foreground text-xs">{d}</span>
                      </div>
                    ))}
                    {f.departments.length > 3 && (
                      <span className="text-xs text-muted-foreground/60 pl-3.5">
                        +{f.departments.length - 3} autres
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-primary font-semibold group-hover:gap-2 transition-all">
                    Découvrir <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultiesSection;
