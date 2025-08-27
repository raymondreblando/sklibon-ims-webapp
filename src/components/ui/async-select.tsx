import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApiResponse } from "@/types";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

interface AsyncSelectProps<T extends FieldValues, TData> {
  field: ControllerRenderProps<T>;
  queryKey: unknown[];
  queryFn: () => Promise<ApiResponse<TData[]>>;
  valueKey: keyof TData;
  labelKey: keyof TData;
  placeholder?: string;
}

export function AsyncSelect<T extends FieldValues, TData>({
  field,
  queryKey,
  queryFn,
  valueKey,
  labelKey,
  placeholder,
}: AsyncSelectProps<T, TData>) {
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
  });

  const options = response?.data ?? [];

  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {isLoading && (
          <SelectItem value="loading" disabled>
            Loading...
          </SelectItem>
        )}
        {isError && (
          <SelectItem value="error" disabled>
            Error fetching data
          </SelectItem>
        )}
        {options.map((item) => (
          <SelectItem
            key={String(item[valueKey])}
            value={String(item[valueKey])}
          >
            {String(item[labelKey])}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
