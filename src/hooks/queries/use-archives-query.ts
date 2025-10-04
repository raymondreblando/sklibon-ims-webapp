import { useQuery } from "@tanstack/react-query";
import { getArchives } from "@/services/api/archives";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useArchivesQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.ARCHIVES], queryFn: getArchives });
};
