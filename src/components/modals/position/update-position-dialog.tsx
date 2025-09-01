import { MainDialog } from "@/components/modals/main-dialog";
import { UpdatePositionForm } from "@/components/forms";
import { useModalContext } from "../modal-context";

export const UpdatePositionDialog = () => {
  const { isOpen, onClose } = useModalContext();

  return (
    <MainDialog
      dialogProps={{ open: isOpen, onOpenChange: onClose }}
      title="Update Position"
      description="Update position details by filling up the form."
    >
      <UpdatePositionForm />
    </MainDialog>
  );
};
