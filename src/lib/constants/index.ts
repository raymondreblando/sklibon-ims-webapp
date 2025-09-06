import type { Option } from "@/types";

export const ROLES = {
  SUPERADMIN: "Super Admin",
  ADMIN: "Admin",
  USER: "User",
};

export const GENDERS: Option[] = [
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

export const FILE_TYPES = {
  IMAGES: ["image/jpg", "image/jpeg", "image/gif", "image/png", "image/webp"],
  DOCUMENTS: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};
