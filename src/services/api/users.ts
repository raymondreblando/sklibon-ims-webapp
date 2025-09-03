import { api } from "@/lib/axios";
import type { UpdateUserField, UserProfileField } from "@/lib/schemas/user";
import type { ApiResponse } from "@/types";
import type { UserWithRelation } from "@/types/schema";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const updateUser = async (
  id: string | undefined,
  data: UserProfileField | UpdateUserField,
) => {
  const { data: response } = await api.put<ApiResponse<UserWithRelation>>(
    `${API_ENDPOINTS.USERS}/${id}`,
    data,
  );

  return response;
};
