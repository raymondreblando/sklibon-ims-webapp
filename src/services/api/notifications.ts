import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Notification } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const getNotifications = async () => {
  const { data: response } = await api.get<ApiResponse<Notification[]>>(
    API_ENDPOINTS.NOTIFICATIONS,
  );

  return response;
};

export const updateNotification = async (id: string | undefined) => {
  const { data: response } = await api.put(
    `${API_ENDPOINTS.NOTIFICATIONS}/${id}`,
  );

  return response;
};
