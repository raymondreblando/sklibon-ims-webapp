import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getAttendances, getEventById, getEvents } from "@/services/api/events";

export const useEventsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.EVENTS], queryFn: getEvents });
};

export const useFindEventQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENTS, id],
    queryFn: () => getEventById(id),
  });
};

export const useAttendancesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCES],
    queryFn: getAttendances,
  });
};
