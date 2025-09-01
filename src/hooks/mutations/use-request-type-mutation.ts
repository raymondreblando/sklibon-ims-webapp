import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RequestType } from "@/types/schema";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { UpdateRequestTypeField } from "@/lib/schemas/request-type";

import {
  createRequestType,
  deleteRequestType,
  updateRequestType,
} from "@/services/api/request-type";

export const useCreateRequestTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRequestType,
    onSuccess: ({ data, message }) => {
      const newRequestType = { ...data, status: "active" as const };

      queryClient.setQueryData<{ data: RequestType[] }>(
        [QUERY_KEYS.REQUEST_TYPES],
        (old) =>
          old
            ? { ...old, data: [newRequestType, ...old.data] }
            : { data: [newRequestType] },
      );

      toast.success(message);
    },
  });
};

export const useUpdateRequestTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateRequestTypeField;
    }) => updateRequestType(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUEST_TYPES] });
      toast.success(message);
    },
  });
};

export const useDeleteRequestTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequestType,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REQUEST_TYPES] });
      toast.success(message);
    },
  });
};
