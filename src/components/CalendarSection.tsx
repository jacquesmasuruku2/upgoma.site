import { CalendarDays, ArrowRight } from "lucide-react";
import { useCalendarEvents } from "@/hooks/useSupabaseData";
import { format, isFuture, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import AnimatedSection from "./AnimatedSection";
import { Badge } from "@/components/ui/badge";

const CalendarSection = () => {
  const { data: events, isLoading } = useCalendarEvents();

  // Filter to show only upcoming events (today and future)
  const upcomingEvents = events?.filter(
    (e) => isFuture(new Date(e.event_date)) || isToday(new Date(e.event_date))
  ).slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-muted rounded mx-auto mb-4" />
            <div className="animate-pulse h-4 w-64 bg-muted rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!upcomingEvents?.length) {
    return null; // Don't render section if no upcoming events
  }

  return (
    <section id="calendrier" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="inline-block text-[hsl(var(--upg-orange))] text-sm font-semibold tracking-wider uppercase mb-2">
              Agenda
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">
              Événements à Venir
            </h2>
            <div className="w-16 h-1 bg-[hsl(var(--upg-orange))] mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Restez informé des prochains événements académiques, culturels et administratifs de l'UPG.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingEvents.map((event, i) => {
            const eventDate = new Date(event.event_date);
            const endDate = event.end_date ? new Date(event.end_date) : null;
            const isMultiDay = endDate && event.end_date !== event.event_date;

            return (
              <AnimatedSection key={event.id} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                  <div className="flex gap-4">
                    {/* Date badge */}
                    <div className="shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center text-primary">
                      <span className="text-2xl font-bold leading-none">
                        {format(eventDate, "d", { locale: fr })}
                      </span>
                      <span className="text-xs uppercase font-medium">
                        {format(eventDate, "MMM", { locale: fr })}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        {event.category && (
                          <Badge variant="secondary" className="shrink-0 text-xs">
                            {event.category}
                          </Badge>
                        )}
                      </div>

                      {event.description && (
                        <p className="text-muted-foreground text-xs line-clamp-2 mb-2">
                          {event.description}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>
                          {isMultiDay
                            ? `${format(eventDate, "d MMM", { locale: fr })} - ${format(endDate, "d MMM yyyy", { locale: fr })}`
                            : format(eventDate, "EEEE d MMMM yyyy", { locale: fr })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;