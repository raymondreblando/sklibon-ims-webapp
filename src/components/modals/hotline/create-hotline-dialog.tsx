import { useModal } from "@/contexts/modal-context";

import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreateHotlineForm } from "@/components/forms";

export const CreateHotlineDialog = () => {
  const { show } = useModal();

  return <Button onClick={() => show(<Content />)}>Create Hotline</Button>;
};

const Content = () => {
  return (
    <MainDialog title="Create Hotline" description="Fill up the form below.">
      <CreateHotlineForm />
    </MainDialog>
  );
};
