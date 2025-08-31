import type { Option } from "@/types";

export const ROLES = {
  SUPERADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
};

export const genders: Option[] = [
  {
    key: "Male",
    value: "Male",
  },
  {
    key: "Female",
    value: "Female",
  },
];

export const STATUSES: Option[] = [
  {
    key: "active",
    value: "Active",
  },
  {
    key: "inactive",
    value: "Inactive",
  },
];
