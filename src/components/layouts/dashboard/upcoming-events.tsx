import { ButtonLink } from "@/components/buttons";
import { Heading } from "@/components/headings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDashboardContext } from "@/contexts/dashboard-context";
import { format } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";

export const UpcomingEvents = () => {
  const { data } = useDashboardContext();

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex flex-wrap items-center justify-between py-4">
        <Heading className="font-semibold md:text-sm">Upcoming Events</Heading>
        <ButtonLink to="/events" variant="outline" className="shadow-none">
          See all events
        </ButtonLink>
      </CardHeader>
      <Separator className="bg-input" />
      <CardContent className="p-0">
        {data.upcomingEvents.map((event) => (
          <div
            key={`upcoming-event-${event.id}`}
            className="flex flex-wrap items-center justify-between gap-4 px-6 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-x-2">
                <CalendarDaysIcon
                  className="text-muted size-6"
                  strokeWidth={1.4}
                />
                <div>
                  <p className="text-sm font-semibold md:text-base">
                    {event.name}
                  </p>
                  <p className="text-muted text-[10px] font-medium md:text-xs">
                    {event.venue}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-0.5 md:text-right">
              <p className="text-xs font-semibold">Date</p>
              <p className="text-muted text-xs font-semibold uppercase">
                {format(event.eventDate, "MMM dd, yyy")}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
