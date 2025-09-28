import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useDataTable } from "@/hooks/use-data-table";
import { useEventsQuery } from "@/hooks/queries/use-events-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { fallback, getColumns } from "@/components/cards/event-card/columns";
import {
  EventGrid,
  EventHeader,
  EventsCalendar,
  useEventLayout,
} from "@/components/layouts/event";

export const Route = createFileRoute("/_main/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { layout, setEventLayout } = useEventLayout();
  const { isPending, isError, data, refetch } = useEventsQuery();

  const columns = getColumns();
  const { table, setGlobalFilter } = useDataTable({
    columns,
    data: data ? data?.data : fallback,
  });

  useEffect(() => {
    setItems([{ title: "Events" }]);
  }, [setItems]);

  return (
    <>
      <EventHeader
        setGlobalFilter={setGlobalFilter}
        layout={layout}
        setLayout={setEventLayout}
      />
      {layout === "grid" ? (
        <EventGrid
          isPending={isPending}
          isError={isError}
          onRetry={refetch}
          table={table}
        />
      ) : (
        <div className="px-6 py-4">
          <EventsCalendar />
        </div>
      )}
    </>
  );
}
