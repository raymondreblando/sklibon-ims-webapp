import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Chat, ChatMessage } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreatePrivateChatField,
  CreateGroupChatField,
} from "@/lib/schemas/chat";

export const getChats = async () => {
  const { data: response } = await api.get<ApiResponse<Chat[]>>(
    API_ENDPOINTS.CHATS,
  );

  return response;
};

export const getChatMessages = async (id: string | undefined) => {
  const { data: response } = await api.get<ApiResponse<ChatMessage>>(
    `${API_ENDPOINTS.CHATS}/${id}`,
  );

  return response;
};

export const createPrivateChat = async (data: CreatePrivateChatField) => {
  const { data: response } = await api.post(API_ENDPOINTS.PRIVATE_CHAT, data);

  return response;
};

export const createGroupChat = async (data: CreateGroupChatField) => {
  const { data: response } = await api.post(API_ENDPOINTS.GROUP_CHAT, data);

  return response;
};
