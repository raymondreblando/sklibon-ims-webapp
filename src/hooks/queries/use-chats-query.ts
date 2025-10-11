import { useQuery } from "@tanstack/react-query";
import { getChatMessages, getChats } from "@/services/api/chats";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useChatsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.CHATS], queryFn: getChats });
};

export const useChatMessagesQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, id],
    queryFn: () => getChatMessages(id),
  });
};
