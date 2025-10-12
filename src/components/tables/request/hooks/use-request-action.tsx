import { useCallback } from "react";
import type {
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

import { useModal } from "@/contexts/modal-context";
import {
  useDeleteRequestMutation,
  useUpdateRequestMutation,
} from "@/hooks/mutations/use-request-mutations";

import { UpdateRequestWithReasonForm } from "@/components/forms";
import {
  ConfirmationDialog,
  UpdateWithReasonDialog,
  ViewReasonDialog,
} from "@/components/modals";

export const useRequestActions = () => {
  const { show } = useModal();
  const deleteRequest = useDeleteRequestMutation();
  const updateRequest = useUpdateRequestMutation();

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

  return { onDelete, onUpdate, onUpdateWithReason, onViewReason };
};
