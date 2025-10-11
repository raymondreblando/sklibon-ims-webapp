import { useQuery } from "@tanstack/react-query";
import { getChats } from "@/services/api/chats";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useChatsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.CHATS], queryFn: getChats });
};
