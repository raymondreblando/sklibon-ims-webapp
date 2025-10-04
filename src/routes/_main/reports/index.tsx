import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDataTable } from "@/hooks/use-data-table";
import { useReportsQuery } from "@/hooks/queries/use-reports-query";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { fallback, getColumns } from "@/components/cards/report-card/columns";
import { ReportGrid, ReportHeader } from "@/components/layouts/report";

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
  });

  useEffect(() => {
    setItems([{ title: "Reports" }]);
  }, [setItems]);

  return (
    <>
      <ReportHeader setGlobalFilter={setGlobalFilter} />
      <ReportGrid
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        table={table}
      />
    </>
  );
}
