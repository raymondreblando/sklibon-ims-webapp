import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types";
import type { GalleryWithRelation } from "@/types/schema";

import { API_ENDPOINTS } from "@/lib/constants/api-constants";
import type {
  CreateGalleryImageField,
  CreateGalleryField,
  UpdateGalleryField,
} from "@/lib/schemas/gallery";

export const getGalleries = async () => {
  const { data: response } = await api.get<ApiResponse<GalleryWithRelation[]>>(
    API_ENDPOINTS.GALLERIES,
  );

  return response;
};

export const createGallery = async (data: CreateGalleryField) => {
  const { data: response } = await api.post<ApiResponse<GalleryWithRelation>>(
    API_ENDPOINTS.GALLERIES,
    data,
  );

  return response;
};

export const getGalleryById = async (id: string | undefined) => {
  const { data: response } = await api.get<ApiResponse<GalleryWithRelation>>(
    `${API_ENDPOINTS.GALLERIES}/${id}`,
  );

  return response.data;
};

export const updateGallery = async (
  id: string | undefined,
  data: UpdateGalleryField,
) => {
  const { data: response } = await api.put<ApiResponse<GalleryWithRelation>>(
    `${API_ENDPOINTS.GALLERIES}/${id}`,
    data,
  );

  return response;
};

export const deleteGallery = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<GalleryWithRelation>>(
    `${API_ENDPOINTS.GALLERIES}/${id}`,
  );

  return response;
};

export const createGalleryImage = async (data: CreateGalleryImageField) => {
  const { data: response } = await api.post<ApiResponse<GalleryWithRelation>>(
    API_ENDPOINTS.GALLERY_IMAGES,
    data,
  );

  return response;
};

export const deleteGalleryImage = async (id: string) => {
  const { data: response } = await api.delete<ApiResponse<GalleryWithRelation>>(
    `${API_ENDPOINTS.GALLERY_IMAGES}/${id}`,
  );

  return response;
};
