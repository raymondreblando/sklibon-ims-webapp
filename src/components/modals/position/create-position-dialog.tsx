import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreatePositionForm } from "@/components/forms";

export const CreatePositionDialog = () => {
  return (
    <MainDialog
      triggerComp={
        <DialogTrigger asChild>
          <Button>Create Position</Button>
        </DialogTrigger>
      }
      title="Create Position"
      description="Fill up the form below."
    >
      <CreatePositionForm />
    </MainDialog>
  );
};
