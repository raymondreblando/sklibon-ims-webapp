import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { RequestWithRelation } from "@/types/schema";

import { useModal } from "@/contexts/modal-context";
import { useDeleteRequestMutation } from "@/hooks/mutations/use-request-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ConfirmationDialog } from "@/components/modals";
import { RequestTable } from "@/components/tables/request";

export const Route = createFileRoute("/_main/requests/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deleteRequest = useDeleteRequestMutation();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "Requests" }]);
  }, [setItems]);

  const onDelete = useCallback(
    (request: RequestWithRelation) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteRequest.mutate(request.id)}
          isConfirming={deleteRequest.isPending}
        />,
      );
    },
    [deleteRequest, show],
  );

  return <RequestTable onDelete={onDelete} />;
}
