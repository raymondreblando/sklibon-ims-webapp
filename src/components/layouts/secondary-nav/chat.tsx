import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

export const Chat = () => {
  return (
    <div className="relative">
      <Link to="/chats" search={{ chatId: undefined }}>
        <MessageCircle className="size-5!" />
      </Link>
      <span className="bg-accent text-accent-foreground absolute -top-1 -right-1 grid h-4 w-4 place-content-center rounded-full text-[8px] font-semibold">
        12
      </span>
    </div>
  );
};
