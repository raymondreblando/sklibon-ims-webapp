import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import type { UpdateUserField, UserProfileField } from "@/lib/schemas/user";
import { updateUser } from "@/services/api/users";

export const useUpdateUserMutation = (querykey?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | undefined;
      data: UserProfileField | UpdateUserField;
    }) => updateUser(id, data),
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: [querykey ?? QUERY_KEYS.USERS],
      });
      toast.success(message);
    },
  });
};
