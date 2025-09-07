import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import {
  changePassword,
  changeProfilePicture,
  updateProfile,
} from "@/services/api/accounts";

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

export const useChangeProfilePicMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeProfilePicture,
    onSuccess: ({ message, data }) => {
      queryClient.setQueryData([QUERY_KEYS.PROFILE_PIC], data.profile);
      toast.success(message);
    },
  });
};
