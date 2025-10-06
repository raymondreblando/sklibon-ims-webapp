import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { updateNotification } from "@/services/api/notifications";

export const useUpdateNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTIFICATIONS] });
    },
  });
};
