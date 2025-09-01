import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import type { Position } from "@/types/schema";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { PositionTable } from "@/components/tables/positions";
import {
  DeleteConfirmationDialog,
  UpdatePositionDialog,
} from "@/components/modals";
import { useDialog } from "@/hooks/use-dialog";
import { useDeletePositionMutation } from "@/hooks/mutations/use-position-mutations";
import { ModalContext } from "@/components/modals/modal-context";

export const Route = createFileRoute("/_main/positions")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deletePosition = useDeletePositionMutation();
  const updateDialog = useDialog<Position>();
  const confirmDialog = useDialog<Position>((position) =>
    deletePosition.mutate(position.id),
  );

  useEffect(() => {
    setItems([{ title: "Positions" }]);
  }, [setItems]);

  return (
    <>
      <PositionTable
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
        <UpdatePositionDialog />
      </ModalContext.Provider>
      <DeleteConfirmationDialog
        open={confirmDialog.isOpen}
        onOpenChange={confirmDialog.onClose}
        onConfirm={confirmDialog.handleConfirm}
        isConfirming={deletePosition.isPending}
      />
    </>
  );
}
