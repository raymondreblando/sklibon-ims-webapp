import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createGroupChat, createPrivateChat } from "@/services/api/chats";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useCreatePrivateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPrivateChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};

export const useCreateGroupChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroupChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHATS] });
    },
  });
};
