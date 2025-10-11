import { useEcho } from "@laravel/echo-react";
import { useMessage } from "@/contexts/message-context";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

import { ChatHeader } from "./chat-header";
import { ChatMessageWrapper } from "./chat-message-wrapper";
import { SendMessageForm } from "@/components/forms";
import { QueryStatusWrapper } from "@/components/hocs";
import { Separator } from "@/components/ui/separator";
import {
  ChatHeaderSkeleton,
  ChatInputSkeleton,
  ChatMessageWrapperSkeleton,
} from "@/components/skeletons";

export const ChatMessage = () => {
  const queryClient = useQueryClient();
  const { queryResult, chatId } = useMessage();

  useEcho(`chat.room.${chatId}`, [".message.sent"], () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
  });

  return (
    <div className="border-input hidden rounded-md border lg:block">
      <QueryStatusWrapper
        isPending={queryResult.isPending}
        isError={queryResult.isError}
        loadingComp={
          <>
            <ChatHeaderSkeleton />
            <Separator className="bg-input" />
            <ChatMessageWrapperSkeleton count={3} />
            <Separator className="bg-input" />
            <ChatInputSkeleton />
          </>
        }
        onRetry={queryResult.refetch}
      >
        <ChatHeader />
        <Separator className="bg-input" />
        <ChatMessageWrapper />
        <Separator className="bg-input" />
        <SendMessageForm />
      </QueryStatusWrapper>
    </div>
  );
};
