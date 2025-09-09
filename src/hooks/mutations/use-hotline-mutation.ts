import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";

import type { UpdateHotlineField } from "@/lib/schemas/hotline";
import { createHotline, updateHotline } from "@/services/api/hotlines";

export const useCreateHotlineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHotline,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOTLINES] });

      toast.success(message);
    },
  });
};

export const useUpdateHotlineMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateHotlineField;
    }) => updateHotline(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.HOTLINES] });
      toast.success(message);
    },
  });
};
