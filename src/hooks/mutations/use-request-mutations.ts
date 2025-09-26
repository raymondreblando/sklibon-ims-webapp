import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type {
  UpdateRequestField,
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

import {
  createRequest,
  deleteRequest,
  updateRequest,
} from "@/services/api/requests";

export const useCreateRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRequest,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });
      toast.success(message);
    },
  });
};

export const useUpdateRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data:
        | UpdateRequestField
        | UpdateRequestStatusField
        | UpdateRequestStatusWithReasonField;
    }) => updateRequest(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });
      toast.success(message);
    },
  });
};

export const useDeleteRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUESTS] });
      toast.success(message);
    },
  });
};
