import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { UserWithRelation } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type { CreateUserField, UpdateUserField } from "@/lib/schemas/user";

export const getUsers = async () => {
  const { data: response } = await api.get<ApiResponse<UserWithRelation[]>>(
    API_ENDPOINTS.USERS,
  );

  return response;
};

export const createUser = async (data: CreateUserField) => {
  const { data: response } = await api.post<ApiResponse<UserWithRelation>>(
    API_ENDPOINTS.USERS,
    data,
  );

  return response;
};

export const getUserById = async (id: string | undefined) => {
  const { data: response } = await api.get<ApiResponse<UserWithRelation>>(
    `${API_ENDPOINTS.USERS}/${id}`,
  );

  return response;
};

export const updateUser = async (
  id: string | undefined,
  data: UpdateUserField,
) => {
  const { data: response } = await api.put<ApiResponse<UserWithRelation>>(
    `${API_ENDPOINTS.USERS}/${id}`,
    data,
  );

  return response;
};

export const deleteUser = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<UserWithRelation>>(
    `${API_ENDPOINTS.USERS}/${id}`,
  );

  return response;
};
