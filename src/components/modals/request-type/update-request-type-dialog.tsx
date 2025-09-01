import { MainDialog } from "@/components/modals/main-dialog";
import { UpdateRequestTypeForm } from "@/components/forms";
import { useModalContext } from "../modal-context";

export const UpdateRequestTypeDialog = () => {
  const { isOpen, onClose } = useModalContext();

  return (
    <MainDialog
      dialogProps={{ open: isOpen, onOpenChange: onClose }}
      title="Update Request Type"
      description="Update request type details by filling up the form."
    >
      <UpdateRequestTypeForm />
    </MainDialog>
  );
};
