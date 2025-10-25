import { api } from "@/lib/axios";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type { AttendanceReportField } from "@/lib/schemas/generate-report";

export const generateAttendanceReport = async (data: AttendanceReportField) => {
  const { data: response } = await api.get<BlobPart>(
    `${API_ENDPOINTS.GENERATE_REPORTS}/attendance`,
    {
      params: data,
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    },
  );

  return response;
};
