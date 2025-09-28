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

export const ACCOUNT_STATUSES: Option[] = [
  {
    key: "active",
    value: "Active",
  },
  {
    key: "deactivated",
    value: "Deactivated",
  },
  {
    key: "blocked",
    value: "Blocked",
  },
];

export const EVENT_STATUSES: Option[] = [
  {
    key: "upcoming",
    value: "Upcoming",
  },
  {
    key: "ongoing",
    value: "On Going",
  },
];

export const RECEIVABLE_TYPES: Option[] = [
  {
    key: "user",
    value: "SK Member",
  },
  {
    key: "barangay",
    value: "Barangay",
  },
];

export const FILE_TYPES = {
  IMAGES: {
    jpg: "image/jpg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    png: "image/png",
    webp: "image/webp",
  },
  DOCUMENTS: {
    pdf: "application/pdf",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
};
