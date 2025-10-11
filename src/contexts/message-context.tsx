import { Route } from "@/routes/_main/chats";
import { createContext, useContext, useMemo } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { useChatMessagesQuery } from "@/hooks/queries/use-chats-query";

import type { ChatMessage } from "@/types/schema";
import type { ApiResponse } from "@/types";

interface MessageContextProps {
  queryResult: UseQueryResult<ApiResponse<ChatMessage>, Error>;
}

const MessageContext = createContext<MessageContextProps | null>(null);

export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }

  return context;
};

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chatId = Route.useSearch().chatId;
  const queryResult = useChatMessagesQuery(chatId);

  const value = useMemo(() => ({ queryResult }), [queryResult]);

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
