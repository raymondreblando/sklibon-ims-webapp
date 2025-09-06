import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthUser } from "@/lib/utils/auth";

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
  return useMutation({
    mutationFn: changeProfilePicture,
    onSuccess: ({ message, data }) => {
      const user = getAuthUser();
      const newUser = { ...user, profile: data.profile };
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast.success(message);
    },
  });
};
