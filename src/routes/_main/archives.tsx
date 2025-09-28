import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useModal } from "@/contexts/modal-context";
import { useCreateAttendanceMutation } from "@/hooks/mutations/use-event-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ArchiveTable } from "@/components/tables/archive";
import { ConfirmationDialog } from "@/components/modals";

export const Route = createFileRoute("/_main/archives")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { show } = useModal();
  const timeOutAttendance = useCreateAttendanceMutation();

  const onUpdate = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => timeOutAttendance.mutate(id)}
          isConfirming={timeOutAttendance.isPending}
          message="Are you sure you want to time-out in this event?"
          title="Confirmation"
          description="This will record your attedance for this event."
        />,
      );
    },
    [timeOutAttendance, show],
  );

  useEffect(() => {
    setItems([{ title: "Archives" }]);
  }, [setItems]);

  return <ArchiveTable onUpdate={onUpdate} />;
}
