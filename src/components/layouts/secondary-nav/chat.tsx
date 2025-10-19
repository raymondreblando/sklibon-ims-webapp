import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useChatMessagesCount } from "@/hooks/queries/use-chats-query";
import type { NotifState } from "@/types";

import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Chat = () => {
  const router = useRouter();
  const [notif, setNotif] = useState<NotifState>({ count: 0, read: false });
  const { isSuccess, data } = useChatMessagesCount();

  useEffect(() => {
    const stored = localStorage.getItem("message-count");

    if (stored) {
      const parsed = JSON.parse(stored) as NotifState;
      setNotif(parsed);
    }
  }, []);

  useEffect(() => {
    if (!isSuccess || !data?.data) return;

    setNotif((prev) => {
      const hasNew =
        data.data.count > prev.count &&
        router.state.location.pathname !== "/chats";
      const newState: NotifState = {
        count: data.data.count,
        read: hasNew ? false : prev.read,
      };

      localStorage.setItem("message-count", JSON.stringify(newState));
      return newState;
    });
  }, [isSuccess, data?.data, router]);

  const handleRead = () => {
    setNotif((prev) => {
      if (prev.read) return prev;
      const newState = { ...prev, read: true };
      localStorage.setItem("message-count", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <Link to="/chats">
            <MessageCircle className="size-5!" onClick={handleRead} />
          </Link>
          {!notif.read && (
            <>
              <span className="bg-accent text-accent-foreground pointer-events-none absolute -top-1 -right-1 grid h-3 w-3 place-content-center rounded-full text-[8px] font-semibold"></span>
              <span className="bg-accent text-accent-foreground pointer-events-none absolute -top-1 -right-1 grid h-3 w-3 animate-ping place-content-center rounded-full text-[8px] font-semibold"></span>
            </>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Messages</p>
      </TooltipContent>
    </Tooltip>
  );
};
