import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { AuthResponse } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/api-constants";
import type { LoginField } from "@/lib/schemas/login";
import type { RegisterField } from "@/lib/schemas/register";

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
