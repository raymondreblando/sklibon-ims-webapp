import { api } from "@/lib/axios";
import type { UserProfileField } from "@/lib/schemas/user";
import type { ApiResponse } from "@/types";
import type { UserWithRelation } from "@/types/schema";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";

export const updateProfile = async (data: UserProfileField) => {
  const { data: response } = await api.put<ApiResponse<UserWithRelation>>(
    API_ENDPOINTS.ACCOUNT.PROFILE,
    data,
  );

  return response;
};
