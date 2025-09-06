import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { changePassword, updateProfile } from "@/services/api/accounts";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USER_PROFILE],
      });
      toast.success(message);
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });
};
