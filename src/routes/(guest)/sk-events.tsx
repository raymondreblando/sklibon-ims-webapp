import { createFileRoute } from "@tanstack/react-router";

import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";
import { HeadingWithWrapper } from "@/components/headings";
import { EventsCalendar } from "@/components/layouts/event";

export const Route = createFileRoute("/(guest)/sk-events")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthWrapper className="w-[min(100%,1200px)]">
      <HeadingWithWrapper
        heading="Upcoming & Past Events"
        subheading="Stay updated with the latest activities, programs, and gatherings organized by the SK Federation."
      />
      <EventsCalendar />
      <RedirectLink linkProps={{ to: "/login" }}>Go to login page</RedirectLink>
    </AuthWrapper>
  );
}
