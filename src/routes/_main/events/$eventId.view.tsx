import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useFindEventQuery } from "@/hooks/queries/use-events-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { QueryStatusWrapper } from "@/components/hocs";
import { EventViewCardSkeleton } from "@/components/skeletons";
import { EventViewCard } from "@/components/cards";
import { DeletedResource } from "@/components/layouts/empty-states";

export const Route = createFileRoute("/_main/events/$eventId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { data, isPending, isError, refetch } = useFindEventQuery(
    Route.useParams().eventId,
  );

  useEffect(() => {
    setItems([{ title: "Events", url: "/events" }, { title: "View" }]);
  }, [setItems]);

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<EventViewCardSkeleton />}
      errorComp={<DeletedResource resource="event" />}
      onRetry={refetch}
    >
      {data && (
        <div className="p-4 md:p-8">
          <EventViewCard event={data} />
        </div>
      )}
    </QueryStatusWrapper>
  );
}
