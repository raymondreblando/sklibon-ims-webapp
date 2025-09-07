import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Hotline } from "@/types/schema";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";

import type {
  CreateHotlineField,
  UpdateHotlineField,
} from "@/lib/schemas/hotline";

export const getHotlines = async () => {
  const { data: response } = await api.get<ApiResponse<Hotline[]>>(
    API_ENDPOINTS.HOTLINES,
  );

  return response.data;
};

export const createHotline = async (data: CreateHotlineField) => {
  const { data: response } = await api.post<ApiResponse<Hotline>>(
    API_ENDPOINTS.HOTLINES,
    data,
  );

  return response;
};

export const updateHotline = async (
  id: string | undefined,
  data: UpdateHotlineField,
) => {
  const { data: response } = await api.put<ApiResponse<Hotline>>(
    `${API_ENDPOINTS.HOTLINES}/${id}`,
    data,
  );

  return response;
};
