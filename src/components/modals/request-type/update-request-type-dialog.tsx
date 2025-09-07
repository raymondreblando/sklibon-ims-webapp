import { MainDialog } from "@/components/modals/main-dialog";
import { UpdateRequestTypeForm } from "@/components/forms";

export const UpdateRequestTypeDialog = () => {
  return (
    <MainDialog
      title="Update Request Type"
      description="Update request type details by filling up the form."
    >
      <UpdateRequestTypeForm />
    </MainDialog>
  );
};
