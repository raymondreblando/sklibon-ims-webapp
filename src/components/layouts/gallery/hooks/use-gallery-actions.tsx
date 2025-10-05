import { useCallback } from "react";

import { useModal } from "@/contexts/modal-context";
import { useDeleteGalleryMutation } from "@/hooks/mutations/use-gallery-mutations";

import { ConfirmationDialog } from "@/components/modals";

export const useGalleryActions = () => {
  const deleteGallery = useDeleteGalleryMutation();
  const { show } = useModal();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteGallery.mutate(id)}
          isConfirming={deleteGallery.isPending}
          message="Are you sure you want to delete this gallery?"
        />,
      );
    },
    [deleteGallery, show],
  );

  return { onDelete };
};
