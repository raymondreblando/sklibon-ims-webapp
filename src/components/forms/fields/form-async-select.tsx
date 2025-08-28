import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse, FormField as FormFieldType } from "@/types";

import { useFormContext, type FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormAsyncSelectProps<T extends FieldValues, TData>
  extends FormFieldType<T> {
  queryKey: unknown[];
  queryFn: () => Promise<ApiResponse<TData[]>>;
  labelKey: keyof TData;
  valueKey: keyof TData;
  size?: "default" | "sm" | "lg" | "xl";
}

export const FormAsyncSelect = <T extends FieldValues, TData>({
  name,
  label,
  placeholder,
  className,
  queryKey,
  queryFn,
  labelKey,
  valueKey,
  size = "default",
}: FormAsyncSelectProps<T, TData>) => {
  const { control } = useFormContext();
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
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  fieldState.error ? "data-[placeholder]:text-destructive" : "",
                )}
                size={size}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {isLoading && (
                <SelectItem
                  className="cursor-progress"
                  value="loading"
                  disabled
                >
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
