import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { RequestWithRelation } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreateRequestField,
  UpdateRequestField,
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

export const getRequests = async () => {
  const { data: response } = await api.get<ApiResponse<RequestWithRelation[]>>(
    API_ENDPOINTS.REQUESTS,
  );

  return response;
};

export const createRequest = async (data: CreateRequestField) => {
  const { data: response } = await api.post<ApiResponse<RequestWithRelation>>(
    API_ENDPOINTS.REQUESTS,
    data,
  );

  return response;
};

export const getRequestById = async (id: string | undefined) => {
  const { data: response } = await api.get<ApiResponse<RequestWithRelation>>(
    `${API_ENDPOINTS.REQUESTS}/${id}`,
  );

  return response.data;
};

export const updateRequest = async (
  id: string | undefined,
  data:
    | UpdateRequestField
    | UpdateRequestStatusField
    | UpdateRequestStatusWithReasonField,
) => {
  const { data: response } = await api.put<ApiResponse<RequestWithRelation>>(
    `${API_ENDPOINTS.REQUESTS}/${id}`,
    data,
  );

  return response;
};

export const deleteRequest = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<null>>(
    `${API_ENDPOINTS.REQUESTS}/${id}`,
  );

  return response;
};
