import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { Attendance, EventWithRelation } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreateEventField,
  UpdateEventField,
  UpdateEventStatusField,
} from "@/lib/schemas/event";

export const getEvents = async () => {
  const { data: response } = await api.get<ApiResponse<EventWithRelation[]>>(
    API_ENDPOINTS.EVENTS,
  );

  return response;
};

export const getBarangayEvents = async (barangay: string | null) => {
  const { data: response } = await api.get<ApiResponse<EventWithRelation[]>>(
    API_ENDPOINTS.EVENTS,
    { params: { barangay } },
  );

  return response;
};

export const createEvent = async (data: CreateEventField) => {
  const { data: response } = await api.post<ApiResponse<EventWithRelation>>(
    API_ENDPOINTS.EVENTS,
    data,
  );

  return response;
};

export const getEventById = async (id: string | undefined) => {
  const { data: response } = await api.get<ApiResponse<EventWithRelation>>(
    `${API_ENDPOINTS.EVENTS}/${id}`,
  );

  return response.data;
};

export const updateEvent = async (
  id: string | undefined,
  data: UpdateEventField | UpdateEventStatusField,
) => {
  const { data: response } = await api.put<ApiResponse<EventWithRelation>>(
    `${API_ENDPOINTS.EVENTS}/${id}`,
    data,
  );

  return response;
};

export const deleteEvent = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<null>>(
    `${API_ENDPOINTS.EVENTS}/${id}`,
  );

  return response;
};

export const getAttendances = async () => {
  const { data: response } = await api.get<ApiResponse<Attendance[]>>(
    API_ENDPOINTS.ATTENDANCES,
  );

  return response;
};

export const createAttenance = async (id: string | undefined) => {
  const { data: response } = await api.put<ApiResponse<Attendance>>(
    `${API_ENDPOINTS.ATTENDANCES}/${id}`,
  );

  return response;
};
