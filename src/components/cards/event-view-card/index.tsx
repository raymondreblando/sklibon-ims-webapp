import type { EventWithRelation } from "@/types/schema";

import { EventInfo } from "./event-info";
import { EventAttendance } from "./event-attendance";

interface EventViewCardProps {
  event: EventWithRelation;
}

export const EventViewCard = ({ event }: EventViewCardProps) => {
  return (
    <div className="space-y-4">
      <EventInfo
        imageUrl={event.imageUrl}
        title={event.name}
        status={event.status}
        eventDate={event.eventDate}
        expiredDate={event.expiredDate}
        description={event.description}
        venue={event.venue}
        creator={{
          firstname: event.creator.info.firstname,
          profile: event.creator.profile,
        }}
      />
      <EventAttendance attendances={event.attendances} />
    </div>
  );
};
