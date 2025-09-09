import { MainDialog } from "@/components/modals/main-dialog";
import { UpdateContactForm } from "@/components/forms";

export const UpdateContactDialog = () => {
  return (
    <MainDialog
      title="Update Contact"
      description="Update contact details by filling up the form."
    >
      <UpdateContactForm />
    </MainDialog>
  );
};
