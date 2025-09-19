import { createFileRoute } from "@tanstack/react-router";
import { useDataTable } from "@/hooks/use-data-table";
import { useReportsQuery } from "@/hooks/queries/use-reports-query";

import { ButtonLink } from "@/components/buttons";
import { ReportCard } from "@/components/cards";
import { Searchbar } from "@/components/ui/searchbar";
import { getColumns } from "@/components/cards/report/columns";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { ReportCardSkeleton } from "@/components/skeletons";

export const Route = createFileRoute("/_main/reports/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useReportsQuery();
  const columns = getColumns();
  const { table, setGlobalFilter } = useDataTable({
    columns,
    data: data ? data?.data : [],
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
      <div className="grid gap-4 px-6 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <QueryStatusWrapper
          isPending={isPending}
          isError={isError}
          loadingComp={<ReportCardSkeleton count={15} />}
          onRetry={refetch}
        >
          <EmptyStateWrapper
            length={table.getCoreRowModel().rows.length}
            props={{
              className:
                "min-h-[240px] md:col-span-2 lg:col-span-3 xl:col-span-5 border-b border-input",
            }}
          >
            {table.getCoreRowModel().rows.map((row) => (
              <ReportCard
                key={row.original.id}
                id={row.original.id}
                title={row.original.subject}
                dateCreated="2025-09-16"
                attachments={row.original.attachments}
                uploader={{
                  firstname: row.original.uploader.info.firstname,
                  profile: row.original.uploader.profile,
                }}
              />
            ))}
          </EmptyStateWrapper>
        </QueryStatusWrapper>
      </div>
    </>
  );
}
