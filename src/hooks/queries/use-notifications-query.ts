import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/api/notifications";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useNotificationsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS],
    queryFn: getNotifications,
  });
};
