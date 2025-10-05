import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { DashboardData } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const getDashboardStats = async () => {
  const { data: response } = await api.get<ApiResponse<DashboardData>>(
    API_ENDPOINTS.DASHBOARD,
  );

  return response;
};
