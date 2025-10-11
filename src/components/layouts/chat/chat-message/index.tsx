import { useMessage } from "@/contexts/message-context";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessageWrapper } from "./chat-message-wrapper";
import { QueryStatusWrapper } from "@/components/hocs";
import { Separator } from "@/components/ui/separator";
import {
  ChatHeaderSkeleton,
  ChatInputSkeleton,
  ChatMessageWrapperSkeleton,
} from "@/components/skeletons";

export const ChatMessage = () => {
  const { queryResult } = useMessage();

  return (
    <div className="border-input hidden rounded-md border md:block">
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
        <ChatInput />
      </QueryStatusWrapper>
    </div>
  );
};
