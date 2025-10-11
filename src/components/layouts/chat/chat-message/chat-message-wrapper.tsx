import { getAuthUser } from "@/lib/utils/auth";
import { useMessage } from "@/contexts/message-context";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./chat-bubble";

export const ChatMessageWrapper = () => {
  const { queryResult } = useMessage();
  const userId = getAuthUser()?.id;

  const data = queryResult.data?.data;
  const messages = data?.messages;

  return (
    <ScrollArea className="h-[calc(100vh-340px)]">
      <div className="p-6">
        {messages &&
          messages.map((message) => {
            const isSender = userId === message.userId;

            return (
              <ChatBubble
                key={message.id}
                isSender={isSender}
                profile={message.user.profile}
                receiver={message.user.info.firstname}
                content={message.message}
              />
            );
          })}
      </div>
    </ScrollArea>
  );
};
