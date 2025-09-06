import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Barangay, Municipality, Province } from "@/types/schema";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const getProvinces = async () => {
  const { data: response } = await api.get<ApiResponse<Province[]>>(
    API_ENDPOINTS.PROVINCES,
  );

  return response;
};

export const getMunicipalities = async () => {
  const { data: response } = await api.get<ApiResponse<Municipality[]>>(
    API_ENDPOINTS.MUNICIPALITIES,
  );

  return response;
};

export const getBarangays = async () => {
  const { data: response } = await api.get<ApiResponse<Barangay[]>>(
    API_ENDPOINTS.BARANGAYS,
  );

  return response;
};
