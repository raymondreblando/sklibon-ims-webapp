import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreateRequestTypeForm } from "@/components/forms";

export const CreateRequestTypeDialog = () => {
  return (
    <MainDialog
      triggerComp={
        <DialogTrigger asChild>
          <Button>Create Request Type</Button>
        </DialogTrigger>
      }
      title="Create Request Type"
      description="Fill up the form below."
    >
      <CreateRequestTypeForm />
    </MainDialog>
  );
};
