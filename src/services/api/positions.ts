import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Position } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreatePositionField,
  UpdatePositionField,
} from "@/lib/schemas/position";

export const getPositions = async () => {
  const { data: response } = await api.get<ApiResponse<Position[]>>(
    API_ENDPOINTS.POSITIONS,
  );

  return response;
};

export const createPosition = async (data: CreatePositionField) => {
  const { data: response } = await api.post<ApiResponse<Position>>(
    API_ENDPOINTS.POSITIONS,
    data,
  );

  return response;
};

export const updatePosition = async (
  id: string | undefined,
  data: UpdatePositionField,
) => {
  const { data: response } = await api.put<ApiResponse<Position>>(
    `${API_ENDPOINTS.POSITIONS}/${id}`,
    data,
  );

  return response;
};

export const deletePosition = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<Position>>(
    `${API_ENDPOINTS.POSITIONS}/${id}`,
  );

  return response;
};
