import { useQuery } from "@tanstack/react-query";

import { getUserById, getUsers } from "@/services/api/users";
import { getAuthUser } from "@/lib/utils/auth";
import { QUERY_KEYS } from "@/lib/constants/api-constants";

export const useUserProfilePicQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE_PIC],
    queryFn: async () => getAuthUser()?.profile,
  });
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getUsers,
  });
};

export const useFindUserQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, id],
    queryFn: () => getUserById(id),
  });
};
