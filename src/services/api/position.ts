import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Position } from "@/types/schema";
import { API_ENDPOINTS } from "@/lib/api-constants";

export const getPositions = async () => {
  const { data: response } = await api.get<ApiResponse<Position[]>>(
    API_ENDPOINTS.POSITIONS,
  );

  return response;
};
