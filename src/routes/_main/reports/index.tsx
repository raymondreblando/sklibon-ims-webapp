import { createFileRoute } from "@tanstack/react-router";
import { useDataTable } from "@/hooks/use-data-table";
import { useReportsQuery } from "@/hooks/queries/use-reports-query";

import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";
import { fallback, getColumns } from "@/components/cards/report/columns";
import { ReportGrid } from "./-report-grid";

export const Route = createFileRoute("/_main/reports/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useReportsQuery();
  const columns = getColumns();
  const { table, setGlobalFilter } = useDataTable({
    columns,
    data: data ? data?.data : fallback,
  });

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
          <ButtonLink to="/reports/add">Create new</ButtonLink>
        </div>
      </div>
      <ReportGrid
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        table={table}
      />
    </>
  );
}
