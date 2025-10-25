import { useEffect } from "react";
import type { Table } from "@tanstack/react-table";
import { createFileRoute } from "@tanstack/react-router";

import { useGalleriesQuery } from "@/hooks/queries/use-galleries-query";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { useDataTable } from "@/hooks/use-data-table";

import { fallback, getColumns } from "@/components/cards/gallery-card/columns";
import { GalleryGrid, GalleryHeader } from "@/components/layouts/gallery";
import { TableContext } from "@/components/data-table/table-context";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

export const Route = createFileRoute("/_main/galleries/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { isPending, isError, data, refetch } = useGalleriesQuery();
  const columns = getColumns();
  const { table, setGlobalFilter } = useDataTable({
    columns,
    data: data ? data?.data : fallback,
    itemsPerPage: 15,
  });

  useEffect(() => {
    setItems([{ title: "Galleries" }]);
  }, [setItems]);

  return (
    <TableContext.Provider value={table as Table<unknown>}>
      <GalleryHeader setGlobalFilter={setGlobalFilter} />
      <GalleryGrid
        isPending={isPending}
        isError={isError}
        table={table}
        onRetry={refetch}
      />
      <DataTablePagination />
    </TableContext.Provider>
  );
}
