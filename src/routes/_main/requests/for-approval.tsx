import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useForApprovalRequestsQuery } from "@/hooks/queries/use-requests-query";
import { useRequestActions } from "@/components/tables/request/hooks/use-request-action";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { RequestTable } from "@/components/tables/request";

export const Route = createFileRoute("/_main/requests/for-approval")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryResult = useForApprovalRequestsQuery();
  const { setItems } = useBreadcrumb();
  const { onDelete, onUpdate, onUpdateWithReason, onViewReason } =
    useRequestActions();

  useEffect(() => {
    setItems([
      { title: "Requests", url: "/requests" },
      { title: "For Approval" },
    ]);
  }, [setItems]);

  return (
    <RequestTable
      type="for-approval"
      queryResult={queryResult}
      onDelete={onDelete}
      onUpdate={onUpdate}
      onUpdateWithReason={onUpdateWithReason}
      onViewReason={onViewReason}
    />
  );
}
