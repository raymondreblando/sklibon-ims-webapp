import { useQuery } from "@tanstack/react-query";
import { getPositions } from "@/services/api/positions";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const usePositionsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.POSITIONS], queryFn: getPositions });
};
