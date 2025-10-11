import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessageWrapper } from "./chat-message-wrapper";
import { Separator } from "@/components/ui/separator";

export const ChatMessage = () => {
  return (
    <div className="border-input hidden rounded-md border md:block">
      <ChatHeader />
      <Separator className="bg-input" />
      <ChatMessageWrapper />
      <Separator className="bg-input" />
      <ChatInput />
    </div>
  );
};
