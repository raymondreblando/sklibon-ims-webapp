import { useModal } from "@/contexts/modal-context";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreatePrivateChatForm } from "@/components/forms";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CreatePrivateChatDialog = () => {
  const { show } = useModal();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => show(<Content />)}
          variant="outline"
          className="border-input"
        >
          <PlusIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Create Message</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Content = () => {
  return (
    <MainDialog
      title="New Message"
      description="Start a private conversation with this user."
    >
      <CreatePrivateChatForm />
    </MainDialog>
  );
};
