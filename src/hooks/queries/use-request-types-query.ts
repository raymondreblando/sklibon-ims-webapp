import { useQuery } from "@tanstack/react-query";
import { getRequestTypes } from "@/services/api/request-type";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useRequestTpesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.REQUEST_TYPES],
    queryFn: getRequestTypes,
  });
};
