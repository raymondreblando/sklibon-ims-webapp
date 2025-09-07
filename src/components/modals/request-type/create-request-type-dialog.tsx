import { useModal } from "@/contexts/modal-context";

import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreateRequestTypeForm } from "@/components/forms";

export const CreateRequestTypeDialog = () => {
  const { show } = useModal();

  return <Button onClick={() => show(<Content />)}>Create Request Type</Button>;
};

const Content = () => {
  return (
    <MainDialog
      title="Create Request Type"
      description="Fill up the form below."
    >
      <CreateRequestTypeForm />
    </MainDialog>
  );
};
