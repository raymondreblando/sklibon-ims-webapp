import { api } from "@/lib/axios";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/types";
import type { AuthResponse } from "@/types/schema";
import type { LoginField } from "@/components/forms/login-form/schema";

export const login = async (data: LoginField): Promise<ApiResponse<AuthResponse>> => {
  const response: AxiosResponse<ApiResponse<AuthResponse>> = await api.post(
    "/auth/login",
    data,
  );

  return response.data;
};
