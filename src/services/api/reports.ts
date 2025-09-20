import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { ReportWithRelation } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreateReportField,
  UpdateReportField,
} from "@/lib/schemas/report";

export const getReports = async () => {
  const { data: response } = await api.get<ApiResponse<ReportWithRelation[]>>(
    API_ENDPOINTS.REPORTS,
  );

  return response;
};

export const createReport = async (data: CreateReportField) => {
  const { data: response } = await api.post<ApiResponse<ReportWithRelation>>(
    API_ENDPOINTS.REPORTS,
    data,
  );

  return response;
};

export const getReportById = async (id: string | undefined) => {
  const { data: response } = await api.get<ApiResponse<ReportWithRelation>>(
    `${API_ENDPOINTS.REPORTS}/${id}`,
  );

  return response.data;
};

export const updateReport = async (
  id: string | undefined,
  data: UpdateReportField,
) => {
  const { data: response } = await api.put<ApiResponse<ReportWithRelation>>(
    `${API_ENDPOINTS.REPORTS}/${id}`,
    data,
  );

  return response;
};

export const deleteReport = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<ReportWithRelation>>(
    `${API_ENDPOINTS.REPORTS}/${id}`,
  );

  return response;
};
