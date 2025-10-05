import type { Table } from "@tanstack/react-table";
import type { ReportWithRelation } from "@/types/schema";

import { useReportActions } from "./hooks/use-report-actions";

import { ReportCard } from "@/components/cards";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { ReportCardSkeleton } from "@/components/skeletons";

interface ReportGridProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  table: Table<ReportWithRelation>;
}

export const ReportGrid = ({
  isPending,
  isError,
  onRetry,
  table,
}: ReportGridProps) => {
  const { onDelete, onUpdate } = useReportActions();

  return (
    <div className="grid gap-4 px-6 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={<ReportCardSkeleton count={15} />}
        onRetry={onRetry}
      >
        <EmptyStateWrapper
          length={table.getRowModel().rows.length}
          props={{
            className:
              "min-h-[240px] md:col-span-2 lg:col-span-3 xl:col-span-5 border-b border-input",
          }}
        >
          {table.getRowModel().rows.map((row) => (
            <ReportCard
              key={row.original.id}
              report={row.original}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </EmptyStateWrapper>
      </QueryStatusWrapper>
    </div>
  );
};
