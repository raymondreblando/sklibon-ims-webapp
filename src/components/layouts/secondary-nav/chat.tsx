import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Chat = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <Link to="/chats">
            <MessageCircle className="size-5!" />
          </Link>
          <span className="bg-accent text-accent-foreground pointer-events-none absolute -top-1 -right-1 grid h-3 w-3 place-content-center rounded-full text-[8px] font-semibold"></span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Messages</p>
      </TooltipContent>
    </Tooltip>
  );
};
