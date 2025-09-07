import { useQuery } from "@tanstack/react-query";
import { getHotlines } from "@/services/api/hotlines";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useHotlinesQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.HOTLINES], queryFn: getHotlines });
};
