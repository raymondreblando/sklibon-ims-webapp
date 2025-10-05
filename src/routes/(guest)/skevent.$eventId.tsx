import { ButtonLink } from "@/components/buttons";
import { EventViewCard } from "@/components/cards";
import { QueryStatusWrapper } from "@/components/hocs";
import { EventViewCardSkeleton } from "@/components/skeletons";
import { useFindEventQuery } from "@/hooks/queries/use-events-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)/skevent/$eventId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending, isError, refetch } = useFindEventQuery(
    Route.useParams().eventId,
  );

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<EventViewCardSkeleton />}
      onRetry={refetch}
    >
      {data && (
        <div className="p-4 md:p-8">
          <div className="mx-auto max-w-[700px] space-y-4">
            <ButtonLink to="/">Back to homepage</ButtonLink>
            <EventViewCard event={data} />
          </div>
        </div>
      )}
    </QueryStatusWrapper>
  );
}
