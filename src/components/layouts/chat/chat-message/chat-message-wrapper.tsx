import { getAuthUser } from "@/lib/utils/auth";
import { useMessage } from "@/contexts/message-context";
import { useEffect, useRef } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./chat-bubble";

export const ChatMessageWrapper = () => {
  const { queryResult } = useMessage();
  const userId = getAuthUser()?.id;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const data = queryResult.data?.data;
  const messages = data?.messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ScrollArea className="h-[calc(100vh-190px)] lg:h-[calc(100vh-340px)]">
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
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
