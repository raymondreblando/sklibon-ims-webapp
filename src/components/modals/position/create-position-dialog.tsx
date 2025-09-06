import { useModal } from "@/contexts/modal-context";

import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreatePositionForm } from "@/components/forms";

export const CreatePositionDialog = () => {
  const { show } = useModal();

  return <Button onClick={() => show(<Content />)}>Create Position</Button>;
};

const Content = () => {
  return (
    <MainDialog title="Create Position" description="Fill up the form below.">
      <CreatePositionForm />
    </MainDialog>
  );
};
