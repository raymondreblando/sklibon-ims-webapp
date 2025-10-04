import { useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useModal } from "@/contexts/modal-context";
import { useDeleteArchiveMutation } from "@/hooks/mutations/use-archive-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ArchiveTable } from "@/components/tables/archive";
import { ConfirmationDialog } from "@/components/modals";

export const Route = createFileRoute("/_main/archives")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const { show } = useModal();
  const deleteArchive = useDeleteArchiveMutation();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteArchive.mutate(id)}
          isConfirming={deleteArchive.isPending}
          message="Are you sure you want to delete this archive?"
        />,
      );
    },
    [deleteArchive, show],
  );

  useEffect(() => {
    setItems([{ title: "Archives" }]);
  }, [setItems]);

  return <ArchiveTable onDelete={onDelete} />;
}
