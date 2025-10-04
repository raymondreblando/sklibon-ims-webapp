import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getEventCalendarColor } from "@/lib/utils/utils";

import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";
import { useEventsQuery } from "@/hooks/queries/use-events-query";
import { QueryStatusWrapper } from "@/components/hocs";
import { EventCalendarSkeleton } from "@/components/skeletons";

const fallback: CalendarEvent[] = [];

export const EventsCalendar = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, refetch } = useEventsQuery();

  const events = useMemo(() => {
    return data?.data.map((event) => {
      return {
        id: event.id,
        title: event.name,
        description: event.description,
        start: new Date(event.eventDate),
        end: new Date(event.expiredDate),
        color: getEventCalendarColor(event.status),
        location: event.venue,
      } as CalendarEvent;
    });
  }, [data]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<EventCalendarSkeleton />}
      onRetry={refetch}
    >
      <EventCalendar events={events ?? fallback} navigate={navigate} />;
    </QueryStatusWrapper>
  );
};
