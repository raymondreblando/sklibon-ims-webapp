import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { SendMessageField } from "@/lib/schemas/chat";
import {
  addGroupMember,
  createGroupChat,
  createPrivateChat,
  deleteGroupMember,
  sendMessage,
} from "@/services/api/chats";

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

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: SendMessageField;
    }) => sendMessage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHATS],
      });
    },
  });
};

export const useAddGroupMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addGroupMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUP_MEMBERS] });
      toast.success("Group members added successfully.");
    },
  });
};

export const useDeleteGroupMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroupMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GROUP_MEMBERS] });
      toast.success("Group member removed successfully.");
    },
  });
};
