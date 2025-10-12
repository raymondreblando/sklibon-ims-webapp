import { Route } from "@/routes/_main/chats";
import { useChat } from "@/contexts/chat-context";
import { useNavigate } from "@tanstack/react-router";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/utils";

interface ChatProps {
  id: string;
  type: "group" | "private";
  name: string;
  profile: string;
  message: string;
  isSelected: boolean;
  isOnline: boolean;
}

export const Chat = ({
  id,
  type,
  name,
  profile,
  message,
  isSelected,
  isOnline,
}: ChatProps) => {
  const navigate = useNavigate({ from: Route.fullPath });
  const { setOpenChat } = useChat();
  const isPrivate = type === "private";

  return (
    <div
      onClick={() => {
        setOpenChat(true);
        navigate({ search: (prev) => ({ ...prev, chatId: id }) });
      }}
      className={cn(
        "hover:bg-muted/5 border-b-input flex cursor-pointer items-center gap-x-4 border-b px-6 py-3 transition-colors last:border-0",
        isSelected && "bg-muted/10",
      )}
    >
      <div className="relative">
        <Avatar
          className={cn(
            "mt-1 h-12 w-12 border-2",
            isOnline ? "border-success" : "border-input",
            !isPrivate && "border-primary",
          )}
        >
          <AvatarImage src={profile} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {isPrivate && (
          <span
            className={cn(
              "absolute right-0 bottom-1.5 min-h-3 min-w-3 rounded-full",
              isOnline ? "bg-success" : "bg-muted",
            )}
          ></span>
        )}
      </div>
      <div>
        <p className="text-sm font-semibold md:text-base">{name}</p>
        <p className="text-muted line-clamp-2 text-[10px] font-medium md:text-xs">
          {message}
        </p>
      </div>
    </div>
  );
};
