import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  ChangePasswordField,
  ChangeProfilePicField,
  UserProfileField,
} from "@/lib/schemas/user";

import type { ApiResponse } from "@/types";
import type { User, UserWithRelation } from "@/types/schema";

export const updateProfile = async (data: UserProfileField) => {
  const { data: response } = await api.put<ApiResponse<User>>(
    API_ENDPOINTS.ACCOUNT.PROFILE,
    data,
  );

  return response;
};

export const changePassword = async (data: ChangePasswordField) => {
  const { data: response } = await api.put<ApiResponse<User>>(
    API_ENDPOINTS.ACCOUNT.CHANGE_PASSWORD,
    data,
  );

  return response;
};

export const changeProfilePicture = async (data: ChangeProfilePicField) => {
  const { data: response } = await api.put<ApiResponse<UserWithRelation>>(
    API_ENDPOINTS.ACCOUNT.CHANGE_PROFILE,
    data,
  );

  return response;
};
