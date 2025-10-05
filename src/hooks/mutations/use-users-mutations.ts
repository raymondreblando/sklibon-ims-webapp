import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { UpdateUserField, UpdateUserStatusField } from "@/lib/schemas/user";
import { createUser, deleteUser, updateUser } from "@/services/api/users";

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      toast.success(message);
    },
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UpdateUserField | UpdateUserStatusField;
    }) => updateUser(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
      toast.success(message);
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
      toast.success(message);
    },
  });
};
