import { MessageCircleIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/headings";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ChatListHeader = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-5">
      <Heading>Messages</Heading>
      <div className="space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="border-input">
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Message</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className="border-input">
              <MessageCircleIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create Group Chat</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
