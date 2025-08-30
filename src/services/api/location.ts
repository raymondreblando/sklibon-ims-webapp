import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Barangay } from "@/types/schema";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const getBarangays = async () => {
  const { data: response } = await api.get<ApiResponse<Barangay[]>>(
    API_ENDPOINTS.BARANGAYS,
  );

  return response;
};
