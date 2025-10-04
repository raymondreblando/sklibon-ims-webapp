import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { deleteArchive } from "@/services/api/archives";

export const useDeleteArchiveMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArchive,
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ARCHIVES] });
      toast.success(message);
    },
  });
};
