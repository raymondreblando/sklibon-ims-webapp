import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { AuthResponse, ImagekitAuthParams } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type { LoginField } from "@/lib/schemas/login";
import type { RegisterField } from "@/lib/schemas/register";

export const imagekitAuth = async () => {
  const { data: response } = await api.get<ApiResponse<ImagekitAuthParams>>(
    API_ENDPOINTS.AUTH.IMAGEKIT,
  );

  return response;
};

export const login = async (data: LoginField) => {
  const { data: response } = await api.post<ApiResponse<AuthResponse>>(
    API_ENDPOINTS.AUTH.LOGIN,
    data,
  );

  return response;
};

export const register = async (data: RegisterField) => {
  const { data: response } = await api.post<
    ApiResponse<Omit<AuthResponse, "accessToken">>
  >(API_ENDPOINTS.AUTH.REGISTER, data);

  return response;
};

export const logOut = async () => {
  const { data: response } = await api.post<ApiResponse<null>>(
    API_ENDPOINTS.AUTH.LOGOUT,
  );

  return response;
};
