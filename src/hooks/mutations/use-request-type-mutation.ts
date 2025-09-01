import type { UpdateRequestTypeField } from "@/lib/schemas/request-type";
import {
  createRequestType,
  deleteRequestType,
  updateRequestType,
} from "@/services/api/request-type";
import type { RequestType } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateRequestTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRequestType,
    onSuccess: ({ data, message }) => {
      const newRequestType = { ...data, status: "active" as const };

      queryClient.setQueryData<{ data: RequestType[] }>(
        ["request-types"],
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
      queryClient.invalidateQueries({ queryKey: ["request-types"] });
      toast.success(message);
    },
  });
};

export const useDeleteRequestTypeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequestType,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["request-types"] });
      toast.success(message);
    },
  });
};
