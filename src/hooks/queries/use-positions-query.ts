import { getPositions } from "@/services/api/position";
import { useQuery } from "@tanstack/react-query";

export const usePositionsQuery = () => {
  return useQuery({ queryKey: ["positions"], queryFn: getPositions });
};
