import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useGalleriesQuery } from "@/hooks/queries/use-galleries-query";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { useDataTable } from "@/hooks/use-data-table";

import { fallback, getColumns } from "@/components/cards/gallery-card/columns";
import { GalleryGrid, GalleryHeader } from "@/components/layouts/gallery";

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
  });

  useEffect(() => {
    setItems([{ title: "Galleries" }]);
  }, [setItems]);

  return (
    <>
      <GalleryHeader setGlobalFilter={setGlobalFilter} />
      <GalleryGrid
        isPending={isPending}
        isError={isError}
        table={table}
        onRetry={refetch}
      />
    </>
  );
}
