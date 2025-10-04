import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Archive } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const getArchives = async () => {
  const { data: response } = await api.get<ApiResponse<Archive[]>>(
    API_ENDPOINTS.ARCHIVES,
  );

  return response;
};

export const deleteArchive = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<null>>(
    `${API_ENDPOINTS.ARCHIVES}/${id}`,
  );

  return response;
};
