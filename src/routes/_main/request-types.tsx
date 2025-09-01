import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { RequestType } from "@/types/schema";

import { useDialog } from "@/hooks/use-dialog";
import { ModalContext } from "@/components/modals/modal-context";
import { useDeleteRequestTypeMutation } from "@/hooks/mutations/use-request-type-mutation";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { RequestTypeTable } from "@/components/tables/request-types";
import {
  DeleteConfirmationDialog,
  UpdateRequestTypeDialog,
} from "@/components/modals";

export const Route = createFileRoute("/_main/request-types")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deleteRequestType = useDeleteRequestTypeMutation();
  const updateDialog = useDialog<RequestType>();
  const confirmDialog = useDialog<RequestType>((requestType) =>
    deleteRequestType.mutate(requestType.id),
  );

  useEffect(() => {
    setItems([{ title: "Request Types" }]);
  }, [setItems]);

  return (
    <>
      <RequestTypeTable
        onUpdate={updateDialog.onOpen}
        onDelete={confirmDialog.onOpen}
      />
      <ModalContext.Provider
        value={{
          data: updateDialog.resource,
          isOpen: updateDialog.isOpen,
          onClose: updateDialog.onClose,
        }}
      >
        <UpdateRequestTypeDialog />
      </ModalContext.Provider>
      <DeleteConfirmationDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.onClose}
        onConfirm={confirmDialog.handleConfirm}
        isConfirming={deleteRequestType.isPending}
      />
    </>
  );
}
