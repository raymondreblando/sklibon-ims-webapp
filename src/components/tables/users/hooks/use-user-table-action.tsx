import { useCallback } from "react";
import type { UpdateUserStatusField } from "@/lib/schemas/user";

import { useModal } from "@/contexts/modal-context";

import { ConfirmationDialog } from "@/components/modals";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "@/hooks/mutations/use-users-mutations";


export const useUserTableAction = () => {
  const updateUser = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();
  const { show } = useModal();

  const onUpdate = useCallback(
    (id: string, data: UpdateUserStatusField, message: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => updateUser.mutate({ id, data })}
          isConfirming={updateUser.isPending}
          message={message}
          title="Confirmation"
          description="This will permanently update the user status."
        />,
      );
    },
    [updateUser, show],
  );

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteUser.mutate(id)}
          isConfirming={deleteUser.isPending}
        />,
      );
    },
    [deleteUser, show],
  );

  return { onUpdate, onDelete };
};
