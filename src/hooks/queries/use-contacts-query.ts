import { useQuery } from "@tanstack/react-query";
import { getContacts } from "@/services/api/contacts";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useContactsQuery = () => {
  return useQuery({ queryKey: [QUERY_KEYS.CONTACTS], queryFn: getContacts });
};
