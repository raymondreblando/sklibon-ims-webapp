import { useChat } from "@/contexts/chat-context";
import { useModal } from "@/contexts/modal-context";
import { useMessage } from "@/contexts/message-context";

import { Route } from "@/routes/_main/chats";
import { UserPlusIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddGroupMemberDialog } from "@/components/modals";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const RoomAction = () => {
  const { show } = useModal();
  const { setOpenChat } = useChat();
  const { queryResult } = useMessage();
  const chatId = Route.useSearch().chatId;

  return (
    <div className="flex items-center gap-2">
      {queryResult.data?.data.type === "group" && (
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
      )}

      <Button
        onClick={() => setOpenChat(false)}
        variant="outline"
        className="border-input block lg:hidden"
      >
        <XIcon />
      </Button>
    </div>
  );
};
