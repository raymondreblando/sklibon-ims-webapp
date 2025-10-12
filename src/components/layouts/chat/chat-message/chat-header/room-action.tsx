import { useIsMobile } from "@/hooks/use-mobile";
import { useModal } from "@/contexts/modal-context";

import { Route } from "@/routes/_main/chats";
import { UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddGroupMemberDialog } from "@/components/modals";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const RoomAction = () => {
  const { show } = useModal();
  const isMobile = useIsMobile();
  const chatId = Route.useSearch().chatId;

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => show(<AddGroupMemberDialog />, { chatId })}
            variant="outline"
            className="border-input"
          >
            <UserPlusIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Group Members</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
