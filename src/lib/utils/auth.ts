import type { UserWithRelation } from "@/types/schema";

export const getAuthUser = () => {
  const user = localStorage.getItem("user");
  return user ? (JSON.parse(user) as UserWithRelation) : null;
};

export const isAuthenticated = () => {
  const user = getAuthUser();
  const accessToken = localStorage.getItem("accessToken");

  return user !== null && accessToken !== null;
};
