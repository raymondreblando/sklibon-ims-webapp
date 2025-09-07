import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getAuthUser } from "@/lib/utils/auth";
import { useQuery } from "@tanstack/react-query";

export const useUserProfilePicQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE_PIC],
    queryFn: async () => getAuthUser()?.profile,
  });
};
