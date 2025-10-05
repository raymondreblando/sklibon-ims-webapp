import { useCallback } from "react";

import { useModal } from "@/contexts/modal-context";
import {
  useDeleteReportMutation,
  useUpdateReportMutation,
} from "@/hooks/mutations/use-report-mutations";

import { ConfirmationDialog } from "@/components/modals";
import type { UpdateReportStatusField } from "@/lib/schemas/report";

export const useReportActions = () => {
  const updateReport = useUpdateReportMutation();
  const deleteReport = useDeleteReportMutation();
  const { show } = useModal();

  const onUpdate = useCallback(
    (id: string, data: UpdateReportStatusField) => {
      show(
        <ConfirmationDialog
          onConfirm={() => updateReport.mutate({ id, data })}
          isConfirming={updateReport.isPending}
          message="Are you sure you want to archive this report?"
          title="Confirmation"
          description="This will permanently update the event status."
        />,
      );
    },
    [updateReport, show],
  );

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

  return { onUpdate, onDelete };
};
