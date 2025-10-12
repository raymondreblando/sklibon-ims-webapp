import { Route } from "@/routes/_main/chats";
import { useChatsQuery } from "@/hooks/queries/use-chats-query";

import { Chat } from "./chat";
import { ChatListHeader } from "./chat-list-header";
import { Searchbar } from "@/components/ui/searchbar";
import { Separator } from "@/components/ui/separator";
import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { ChatSkeleton } from "@/components/skeletons";
import { EmptyInbox } from "@/components/layouts/empty-states";
import { useEcho } from "@laravel/echo-react";
import { getAuthUser } from "@/lib/utils/auth";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { useMemo, useState } from "react";

export const ChatList = () => {
  const { chatId } = Route.useSearch();
  const { isPending, isError, data, refetch } = useChatsQuery();
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const userId = getAuthUser()?.id;

  const filteredData = useMemo(() => {
    if (search === "") return data?.data;

    return data?.data.filter(
      (chat) =>
        chat.name?.toLowerCase().includes(search.toLowerCase()) ||
        chat.participants?.some((participant) =>
          `${participant.user.info.firstname} ${participant.user.info.lastname}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        ),
    );
  }, [search, data]);

  useEcho(
    `chat.list.${userId}`,
    [".chat.created", ".group.created", ".participant.added"],
    () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  );

  return (
    <div className="border-input rounded-md border">
      <ChatListHeader />
      <Separator className="bg-input" />
      <div className="px-6 py-4">
        <Searchbar
          inputProps={{
            placeholder: "Search conversations...",
            onInput: (e) => setSearch(e.currentTarget.value),
          }}
        />
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
            component={
              <EmptyInbox
                message="No conversation found."
                props={{ className: "min-h-[300px]" }}
              />
            }
          >
            {filteredData?.map((message) => {
              const hasParticipants =
                message.participants && message.participants.length > 0;
              const isPrivate = message.type === "private";

              const name =
                isPrivate && hasParticipants
                  ? `${message.participants[0].user.info.firstname} ${message.participants[0].user.info.lastname}`
                  : message.name || "Unnamed Chat";

              const profile = isPrivate
                ? message.participants[0].user.profile || ""
                : "";

              const isOnline =
                isPrivate && message.participants[0].user.isOnline;

              return (
                <Chat
                  key={message.id}
                  id={message.id}
                  type={message.type}
                  name={name}
                  profile={profile}
                  message={message.lastMessage}
                  isSelected={message.id === chatId}
                  isOnline={isOnline}
                />
              );
            })}
          </EmptyStateWrapper>
        )}
      </QueryStatusWrapper>
    </div>
  );
};
