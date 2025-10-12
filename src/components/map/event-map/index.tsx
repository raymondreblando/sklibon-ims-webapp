import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const EventsMap = React.lazy(
  () => import("@/components/map/event-map/events-map"),
);

export const MapPage = () => (
  <Suspense fallback={<Skeleton className="min-h-screen w-full" />}>
    <EventsMap />
  </Suspense>
);
