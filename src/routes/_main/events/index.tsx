import { useEffect } from "react";
import type { Table } from "@tanstack/react-table";
import { createFileRoute } from "@tanstack/react-router";

import { useDataTable } from "@/hooks/use-data-table";
import { useEventsQuery } from "@/hooks/queries/use-events-query";
import { TableContext } from "@/components/data-table/table-context";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { fallback, getColumns } from "@/components/cards/event-card/columns";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
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
    itemsPerPage: 8
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
        <TableContext.Provider value={table as Table<unknown>}>
          <EventGrid
            isPending={isPending}
            isError={isError}
            onRetry={refetch}
            table={table}
          />
          <DataTablePagination />
        </TableContext.Provider>
      ) : (
        <div className="px-6 py-4">
          <EventsCalendar />
        </div>
      )}
    </>
  );
}
