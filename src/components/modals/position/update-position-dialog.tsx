import { MainDialog } from "@/components/modals/main-dialog";
import { UpdatePositionForm } from "@/components/forms";

export const UpdatePositionDialog = () => {
  return (
    <MainDialog
      title="Update Position"
      description="Update position details by filling up the form."
    >
      <UpdatePositionForm />
    </MainDialog>
  );
};
