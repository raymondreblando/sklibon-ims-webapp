import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import {
  getChatMessages,
  getChats,
  getMessageCount,
  viewGroupMember,
} from "@/services/api/chats";

export const useChatsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.CHATS], queryFn: getChats });
};

export const useChatMessagesQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, id],
    queryFn: () => getChatMessages(id),
  });
};

export const useChatMessagesCount = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.MESSAGE_COUNT],
    queryFn: getMessageCount,
  });
};

export const useChatParticipantsQuery = (chatId: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GROUP_MEMBERS, chatId],
    queryFn: () => viewGroupMember(chatId),
  });
};
