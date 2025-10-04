import { getAuthUser } from "@/lib/utils/auth";
import type { RoleType } from "@/types/schema";

interface WithRoleGruadProps {
  allowed: Array<RoleType>;
  children: React.ReactNode;
}

export const WithRoleGruad = ({ allowed, children }: WithRoleGruadProps) => {
  const role = getAuthUser()?.role.role as RoleType;

  if (role && !allowed.includes(role)) return null;

  return children;
};
