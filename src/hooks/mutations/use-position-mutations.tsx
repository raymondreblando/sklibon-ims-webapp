import type { UpdatePositionField } from "@/lib/schemas/position";
import {
  createPosition,
  deletePosition,
  updatePosition,
} from "@/services/api/position";
import type { Position } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreatePositionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPosition,
    onSuccess: ({ data, message }) => {
      const newPosition = { ...data, status: "active" as const };

      queryClient.setQueryData<{ data: Position[] }>(["positions"], (old) =>
        old
          ? { ...old, data: [newPosition, ...old.data] }
          : { data: [newPosition] },
      );

      toast.success(message);
    },
  });
};

export const useUpdatePositionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdatePositionField;
    }) => updatePosition(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      toast.success(message);
    },
  });
};

export const useDeletePositionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePosition,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
      toast.success(message);
    },
  });
};
