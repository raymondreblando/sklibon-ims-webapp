import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/api/summaries";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useDashboardQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.DASHBOARD], queryFn: getDashboardStats });
};
