import type { FieldValues, Path } from "react-hook-form";

export type ApiResponse<T> = {
  status: "success" | "error";
  message: string;
  data: T;
};

export type FormField<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: "text" | "password" | "select" | "async-select" | "textarea" | "date" | "datetime";
  placeholder?: string;
  className?: string;
  options?: Option[];
  queryKey?: unknown[];
  queryFn?: () => Promise<ApiResponse<T[]>>;
  optionValueKey?: string;
  optionLabelKey?: string;
};

export type Option = {
  key: string;
  value: string;
}