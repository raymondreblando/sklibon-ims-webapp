import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { UpdateGalleryField } from "@/lib/schemas/gallery";
import {
  createGallery,
  deleteGallery,
  deleteGalleryImage,
  updateGallery,
} from "@/services/api/galleries";

export const useCreateGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGallery,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GALLERIES] });
      toast.success(message);
    },
  });
};

export const useUpdateGalleryMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateGalleryField;
    }) => updateGallery(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GALLERIES],
      });
      toast.success(message);
      navigate({ to: "/galleries" });
    },
  });
};

export const useDeleteGalleryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGallery,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GALLERIES] });
      toast.success(message);
    },
  });
};

export const useDeleteImageMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GALLERIES, id] });
      toast.success(message);
    },
  });
};
