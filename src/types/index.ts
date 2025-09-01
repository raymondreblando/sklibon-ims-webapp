import type { LucideIcon } from "lucide-react";
import type { FieldValues, Path } from "react-hook-form";

export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export interface FormField<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
}

export type Option = {
  key: string;
  value: string;
};

export type InputType =
  | "text"
  | "number"
  | "email"
  | "url"
  | "tel"
  | "search"
  | "color"
  | "file"
  | "hidden"
  | "range";

export interface SidebarItemProps {
  title: string;
  url: string;
  authorize: string[];
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export interface BreadcrumbItem {
  title: string;
  url?: string;
}

export interface TableProps<TData> {
  onUpdate?: (resource: TData) => void;
  onDelete?: (reource: TData) => void;
}

export interface ModalProps<TData = undefined> {
  isOpen: boolean;
  onClose: () => void;
  data?: TData;
}
