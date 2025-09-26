import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type {
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

import { useModal } from "@/contexts/modal-context";
import {
  useDeleteRequestMutation,
  useUpdateRequestMutation,
} from "@/hooks/mutations/use-request-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { UpdateRequestWithReasonForm } from "@/components/forms";
import { RequestTable } from "@/components/tables/request";
import {
  ConfirmationDialog,
  UpdateWithReasonDialog,
  ViewReasonDialog,
} from "@/components/modals";

export const Route = createFileRoute("/_main/requests/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deleteRequest = useDeleteRequestMutation();
  const updateRequest = useUpdateRequestMutation();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "Requests" }]);
  }, [setItems]);

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteRequest.mutate(id)}
          isConfirming={deleteRequest.isPending}
        />,
      );
    },
    [deleteRequest, show],
  );

  const onUpdate = useCallback(
    (id: string, data: UpdateRequestStatusField, message: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => updateRequest.mutate({ id, data })}
          isConfirming={updateRequest.isPending}
          message={message}
          title="Confirmation"
          description="This will permanently update the transaction's status."
        />,
      );
    },
    [updateRequest, show],
  );

  const onUpdateWithReason = useCallback(
    (data: UpdateRequestStatusWithReasonField) => {
      show(
        <UpdateWithReasonDialog title="Update Request Status">
          <UpdateRequestWithReasonForm />
        </UpdateWithReasonDialog>,
        { data },
      );
    },
    [show],
  );

  const onViewReason = useCallback(
    (reason: string) => {
      show(<ViewReasonDialog reason={reason} />);
    },
    [show],
  );

  return (
    <RequestTable
      onDelete={onDelete}
      onUpdate={onUpdate}
      onUpdateWithReason={onUpdateWithReason}
      onViewReason={onViewReason}
    />
  );
}
