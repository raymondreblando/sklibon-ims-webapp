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
