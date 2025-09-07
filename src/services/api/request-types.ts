import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { RequestType } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreateRequestTypeField,
  UpdateRequestTypeField,
} from "@/lib/schemas/request-type";

export const getRequestTypes = async () => {
  const { data: response } = await api.get<ApiResponse<RequestType[]>>(
    API_ENDPOINTS.REQUEST_TYPES,
  );

  return response;
};

export const createRequestType = async (data: CreateRequestTypeField) => {
  const { data: response } = await api.post<ApiResponse<RequestType>>(
    API_ENDPOINTS.REQUEST_TYPES,
    data,
  );

  return response;
};

export const updateRequestType = async (
  id: string | undefined,
  data: UpdateRequestTypeField,
) => {
  const { data: response } = await api.put<ApiResponse<RequestType>>(
    `${API_ENDPOINTS.REQUEST_TYPES}/${id}`,
    data,
  );

  return response;
};

export const deleteRequestType = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<RequestType>>(
    `${API_ENDPOINTS.REQUEST_TYPES}/${id}`,
  );

  return response;
};
