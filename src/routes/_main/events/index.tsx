import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useDataTable } from "@/hooks/use-data-table";
import { useEventsQuery } from "@/hooks/queries/use-events-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";
import { EventGrid } from "./-event-grid";
import { fallback, getColumns } from "@/components/cards/event-card/columns";

export const Route = createFileRoute("/_main/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
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
      <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
        <Searchbar
          inputProps={{
            placeholder: "Search here...",
            onInput: (event) => setGlobalFilter(event.currentTarget.value),
          }}
        />
        <div className="flex items-center space-x-4">
          <ButtonLink to="/reports/add">Create Event</ButtonLink>
        </div>
      </div>
      <EventGrid
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        table={table}
      />
    </>
  );
}
