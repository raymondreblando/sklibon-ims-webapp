import { useQuery } from "@tanstack/react-query";
import { getRequestTypes } from "@/services/api/request-type";

export const useRequestTpesQuery = () => {
  return useQuery({ queryKey: ["request-types"], queryFn: getRequestTypes });
};
