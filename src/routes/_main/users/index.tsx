import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useModal } from "@/contexts/modal-context";
import { useDeleteUserMutation } from "@/hooks/mutations/use-users-mutations";

import { UserTable } from "@/components/tables/users";
import { useBreadcrumb } from "@/components/ui/breadcrumb";
import type { UserWithRelation } from "@/types/schema";
import { ConfirmationDialog } from "@/components/modals";

export const Route = createFileRoute("/_main/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deleteUser = useDeleteUserMutation();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "SK Members" }]);
  }, [setItems]);

  const onDelete = (user: UserWithRelation) => {
    show(
      <ConfirmationDialog
        onConfirm={() => deleteUser.mutate(user.id)}
        isConfirming={deleteUser.isPending}
      />,
    );
  };

  return <UserTable onDelete={onDelete} />;
}
