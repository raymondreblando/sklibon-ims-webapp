import { useModal } from "@/contexts/modal-context";

import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainDialog } from "@/components/modals/main-dialog";
import { CreateGroupChatForm } from "@/components/forms";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ViewGroupMemberDialog = () => {
  const { show } = useModal();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => show(<Content />)}
          variant="outline"
          className="border-input"
        >
          <UsersIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Group Members</p>
      </TooltipContent>
    </Tooltip>
  );
};

const Content = () => {
  return (
    <MainDialog
      title="New Group Chat"
      description="Start a new conversation with multiple members."
    >
      <CreateGroupChatForm />
    </MainDialog>
  );
};
