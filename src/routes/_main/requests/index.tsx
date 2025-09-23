import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { UpdateRequestStatusField } from "@/lib/schemas/request";

import { useModal } from "@/contexts/modal-context";
import {
  useDeleteRequestMutation,
  useUpdateRequestMutation,
} from "@/hooks/mutations/use-request-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ConfirmationDialog } from "@/components/modals";
import { RequestTable } from "@/components/tables/request";

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

  return <RequestTable onDelete={onDelete} onUpdate={onUpdate} />;
}
