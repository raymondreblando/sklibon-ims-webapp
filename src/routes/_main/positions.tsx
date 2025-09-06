import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { Position } from "@/types/schema";

import { useModal } from "@/contexts/modal-context";
import { useDeletePositionMutation } from "@/hooks/mutations/use-position-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { PositionTable } from "@/components/tables/positions";
import {
  DeleteConfirmationDialog,
  UpdatePositionDialog,
} from "@/components/modals";

export const Route = createFileRoute("/_main/positions")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deletePosition = useDeletePositionMutation();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "Positions" }]);
  }, [setItems]);

  const onDelete = (position: Position) => {
    show(
      <DeleteConfirmationDialog
        onConfirm={() => deletePosition.mutate(position.id)}
        isConfirming={deletePosition.isPending}
      />,
    );
  };

  return (
    <>
      <PositionTable
        onUpdate={(position) =>
          show(<UpdatePositionDialog />, { data: position })
        }
        onDelete={onDelete}
      />
    </>
  );
}
