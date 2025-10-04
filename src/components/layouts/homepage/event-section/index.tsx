import { EventCalendar } from "@/components/event-calendar";
import { Heading, Subheading } from "@/components/headings";

export const EventSection = () => {
  return (
    <section id="event-section" className="min-h-screen space-y-12 px-4 py-8 text-center text-balance md:px-20 md:py-20">
      <div className="space-y-4">
        <Heading variant="xl">Upcoming Events & Activities</Heading>
        <Subheading className="text-muted mx-auto max-w-[900px] text-sm font-medium md:text-base">
          Stay updated with the latest programs, trainings, and community
          projects led by SK Federation Libon.
        </Subheading>
      </div>
      <EventCalendar />
    </section>
  );
};
