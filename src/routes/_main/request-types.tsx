import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { RequestType } from "@/types/schema";

import { useModal } from "@/contexts/modal-context";
import { useDeleteRequestTypeMutation } from "@/hooks/mutations/use-request-type-mutation";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { RequestTypeTable } from "@/components/tables/request-types";
import {
  ConfirmationDialog,
  UpdateRequestTypeDialog,
} from "@/components/modals";

export const Route = createFileRoute("/_main/request-types")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deleteRequestType = useDeleteRequestTypeMutation();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "Request Types" }]);
  }, [setItems]);

  const onDelete = (position: RequestType) => {
    show(
      <ConfirmationDialog
        onConfirm={() => deleteRequestType.mutate(position.id)}
        isConfirming={deleteRequestType.isPending}
      />,
    );
  };

  return (
    <>
      <RequestTypeTable
        onUpdate={(requestType) =>
          show(<UpdateRequestTypeDialog />, { data: requestType })
        }
        onDelete={onDelete}
      />
    </>
  );
}
