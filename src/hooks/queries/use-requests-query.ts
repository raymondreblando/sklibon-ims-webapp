import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getRequestById, getRequests } from "@/services/api/requests";

export const useRequestsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.REQUESTS], queryFn: getRequests });
};

export const useFindRequestQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REQUESTS, id],
    queryFn: () => getRequestById(id),
  });
};
