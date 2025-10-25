import { useEffect } from "react";
import type { Table } from "@tanstack/react-table";
import { createFileRoute } from "@tanstack/react-router";
import { useDataTable } from "@/hooks/use-data-table";
import { useReportsQuery } from "@/hooks/queries/use-reports-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { fallback, getColumns } from "@/components/cards/report-card/columns";
import { ReportGrid, ReportHeader } from "@/components/layouts/report";
import { TableContext } from "@/components/data-table/table-context";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

export const Route = createFileRoute("/_main/reports/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { isPending, isError, data, refetch } = useReportsQuery();
  const columns = getColumns();
  const { table, setGlobalFilter } = useDataTable({
    columns,
    data: data ? data?.data : fallback,
    itemsPerPage: 15,
  });

  useEffect(() => {
    setItems([{ title: "Reports" }]);
  }, [setItems]);

  return (
    <TableContext.Provider value={table as Table<unknown>}>
      <ReportHeader setGlobalFilter={setGlobalFilter} />
      <ReportGrid
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        table={table}
      />
      <DataTablePagination />
    </TableContext.Provider>
  );
}
