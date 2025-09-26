import { useCallback } from "react";
import type { Table } from "@tanstack/react-table";
import type { ReportWithRelation } from "@/types/schema";

import { useModal } from "@/contexts/modal-context";
import { useDeleteReportMutation } from "@/hooks/mutations/use-report-mutations";

import { ReportCard } from "@/components/cards";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { ReportCardSkeleton } from "@/components/skeletons";
import { ConfirmationDialog } from "@/components/modals";

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
  const deleteReport = useDeleteReportMutation();
  const { show } = useModal();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteReport.mutate(id)}
          isConfirming={deleteReport.isPending}
        />,
      );
    },
    [deleteReport, show],
  );

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
              id={row.original.id}
              title={row.original.subject}
              dateCreated={row.original.createdAt}
              uploader={{
                firstname: row.original.uploader.info.firstname,
                profile: row.original.uploader.profile,
              }}
              onDelete={onDelete}
            />
          ))}
        </EmptyStateWrapper>
      </QueryStatusWrapper>
    </div>
  );
};
