import { useQuery } from "@tanstack/react-query";
import { getReportById, getReports } from "@/services/api/reports";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useReportsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.REPORTS], queryFn: getReports });
};

export const useFindReportQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REPORTS, id],
    queryFn: () => getReportById(id),
  });
};
