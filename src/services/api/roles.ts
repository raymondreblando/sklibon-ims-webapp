import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type { ApiResponse } from "@/types";
import type { Role } from "@/types/schema";

export const getRoles = async () => {
  const { data: response } = await api.get<ApiResponse<Role[]>>(
    API_ENDPOINTS.ROLES,
  );

  return response;
};
