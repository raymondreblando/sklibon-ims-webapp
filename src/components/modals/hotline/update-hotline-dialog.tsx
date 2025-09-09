import { MainDialog } from "@/components/modals/main-dialog";
import { UpdateHotlineForm } from "@/components/forms";

export const UpdateHotlineDialog = () => {
  return (
    <MainDialog
      title="Update Hotline"
      description="Update hotline details by filling up the form."
    >
      <UpdateHotlineForm />
    </MainDialog>
  );
};
