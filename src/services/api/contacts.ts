import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { ContactWithRelation } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreateContactField,
  UpdateContactField,
} from "@/lib/schemas/contact";

export const getContacts = async () => {
  const { data: response } = await api.get<ApiResponse<ContactWithRelation[]>>(
    API_ENDPOINTS.CONTACTS,
  );

  return response;
};

export const createContact = async (data: CreateContactField) => {
  const { data: response } = await api.post<ApiResponse<ContactWithRelation>>(
    API_ENDPOINTS.CONTACTS,
    data,
  );

  return response;
};

export const updateContact = async (
  id: string | undefined,
  data: UpdateContactField,
) => {
  const { data: response } = await api.put<ApiResponse<ContactWithRelation>>(
    `${API_ENDPOINTS.CONTACTS}/${id}`,
    data,
  );

  return response;
};

export const deleteContact = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<ContactWithRelation>>(
    `${API_ENDPOINTS.CONTACTS}/${id}`,
  );

  return response;
};
