import { Route } from "@/routes/_main/chats";
import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/utils";

interface ChatProps {
  id: string;
  name: string;
  profile: string;
  message: string;
  isSelected: boolean;
}

export const Chat = ({ id, name, profile, message, isSelected }: ChatProps) => {
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <div
      onClick={() => navigate({ search: (prev) => ({ ...prev, chatId: id }) })}
      className={cn(
        "hover:bg-muted/5 border-b-input flex cursor-pointer items-center gap-x-4 border-b px-6 py-3 transition-colors last:border-0",
        isSelected && "bg-muted/10",
      )}
    >
      <div className="relative">
        <Avatar className="border-success mt-1 h-12 w-12 border-2">
          <AvatarImage src={profile} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="bg-success absolute right-0 bottom-1.5 min-h-3 min-w-3 rounded-full"></span>
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
