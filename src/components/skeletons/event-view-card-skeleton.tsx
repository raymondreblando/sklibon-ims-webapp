import { EventAttedanceSkeleton } from "./event-attedance-skeleton";
import { EventInfoSkeleton } from "./event-info-skeleton";

export const EventViewCardSkeleton = () => {
  return (
    <div className="space-y-4">
      <EventInfoSkeleton />
      <EventAttedanceSkeleton count={5} />
    </div>
  );
};
