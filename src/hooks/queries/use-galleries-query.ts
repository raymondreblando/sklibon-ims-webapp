import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import {
  getGalleries,
  getGalleryById,
  getGalleryImages,
} from "@/services/api/galleries";

export const useGalleriesQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.GALLERIES], queryFn: getGalleries });
};

export const useGalleryImagesSuspenseQuery = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.GALLERY_IMAGES],
    queryFn: getGalleryImages,
  });
};

export const useFindGalleryQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GALLERIES, id],
    queryFn: () => getGalleryById(id),
  });
};
