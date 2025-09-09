import { useModal } from "@/contexts/modal-context";

import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreateContactForm } from "@/components/forms";

export const CreateContactDialog = () => {
  const { show } = useModal();

  return <Button onClick={() => show(<Content />)}>Create Contact</Button>;
};

const Content = () => {
  return (
    <MainDialog title="Create Contact" description="Fill up the form below.">
      <CreateContactForm />
    </MainDialog>
  );
};
