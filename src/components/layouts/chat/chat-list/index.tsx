import { useChatsQuery } from "@/hooks/queries/use-chats-query";

import { Chat } from "./chat";
import { ChatListHeader } from "./chat-list-header";
import { Searchbar } from "@/components/ui/searchbar";
import { Separator } from "@/components/ui/separator";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { ChatSkeleton } from "@/components/skeletons";
import { EmptyInbox } from "../../empty-states";

export const ChatList = () => {
  const { isPending, isError, data, refetch } = useChatsQuery();

  return (
    <div className="border-input rounded-md border">
      <ChatListHeader />
      <Separator className="bg-input" />
      <div className="px-6 py-4">
        <Searchbar inputProps={{ placeholder: "Search conversations..." }} />
      </div>
      <Separator className="bg-input" />
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={<ChatSkeleton count={6} />}
        onRetry={refetch}
      >
        {data && (
          <EmptyStateWrapper
            length={data.data.length}
            component={<EmptyInbox props={{ className: "min-h-[300px]" }} />}
          >
            {data.data.map((message) => {
              const hasParticipants =
                message.participants && message.participants.length > 0;
              const isPrivate = message.type === "private";

              const name =
                isPrivate && hasParticipants
                  ? `${message.participants[0].user.info.firstname} ${message.participants[0].user.info.lastname}`
                  : message.name || "Unnamed Chat";

              const profile = hasParticipants
                ? message.participants[0].user.profile || ""
                : "";

              return (
                <Chat
                  key={message.id}
                  id={message.id}
                  name={name}
                  profile={profile}
                  message={message.lastMessage}
                />
              );
            })}
          </EmptyStateWrapper>
        )}
      </QueryStatusWrapper>
    </div>
  );
};
