import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useGalleriesQuery } from "@/hooks/queries/use-galleries-query";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { useDataTable } from "@/hooks/use-data-table";

import { ButtonLink } from "@/components/buttons";
import { Searchbar } from "@/components/ui/searchbar";
import { fallback, getColumns } from "@/components/cards/gallery-card/columns";
import { GalleryGrid } from "./-gallery-grid";

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
      <div className="border-input flex items-center justify-between gap-x-4 border-y bg-white px-6 py-4">
        <Searchbar
          inputProps={{
            placeholder: "Search here...",
            onInput: (event) => setGlobalFilter(event.currentTarget.value),
          }}
        />
        <div className="flex items-center space-x-4">
          <ButtonLink to="/galleries/add">Add Gallery</ButtonLink>
        </div>
      </div>
      <GalleryGrid
        isPending={isPending}
        isError={isError}
        table={table}
        onRetry={refetch}
      />
    </>
  );
}
