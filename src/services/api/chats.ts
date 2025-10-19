import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Chat, ChatMessage } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreatePrivateChatField,
  CreateGroupChatField,
  SendMessageField,
  AddGroupMemberField,
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

export const getMessageCount = async () => {
  const { data: response } = await api.get<ApiResponse<{ count: number }>>(
    `${API_ENDPOINTS.CHATS}/count`,
  );

  return response;
};

export const createPrivateChat = async (data: CreatePrivateChatField) => {
  const { data: response } = await api.post<ApiResponse<{ chatId: string }>>(
    API_ENDPOINTS.PRIVATE_CHATS,
    data,
  );

  return response;
};

export const createGroupChat = async (data: CreateGroupChatField) => {
  const { data: response } = await api.post(API_ENDPOINTS.GROUP_CHATS, data);

  return response;
};

export const sendMessage = async (
  id: string | undefined,
  data: SendMessageField,
) => {
  const { data: response } = await api.put(
    `${API_ENDPOINTS.CHATS}/${id}`,
    data,
  );

  return response;
};

export const addGroupMember = async (data: AddGroupMemberField) => {
  const { data: response } = await api.post(API_ENDPOINTS.GROUP_MEMBERS, data);

  return response;
};

export const viewGroupMember = async (chatId: string | undefined) => {
  const { data: response } = await api.get(API_ENDPOINTS.GROUP_MEMBERS, {
    params: { chatid: chatId },
  });

  return response;
};

export const deleteGroupMember = async (id: string) => {
  const { data: response } = await api.delete(
    `${API_ENDPOINTS.GROUP_MEMBERS}/${id}`,
  );

  return response;
};
