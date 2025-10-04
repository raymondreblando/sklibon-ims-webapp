import { ButtonLink } from "@/components/buttons";
import { Heading } from "@/components/headings";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CalendarDaysIcon } from "lucide-react";

export const UpcomingEvents = () => {
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
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`upcoming-event-${index}`}
            className="flex flex-wrap items-center justify-between gap-4 px-6 py-3"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-x-2">
                <CalendarDaysIcon className="size-7" strokeWidth={1.4} />
                <div>
                  <p className="text-sm font-semibold md:text-base">
                    Health and Wellness Fair
                  </p>
                  <p className="text-muted text-[10px] font-medium md:text-xs">
                    Barangay Nogpo Health Center
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-0.5 md:text-right">
              <p className="text-xs font-semibold">Date</p>
              <p className="text-muted text-xs font-semibold uppercase">
                Oct 20, 2025
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
