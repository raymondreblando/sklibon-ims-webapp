import { cn } from "@/lib/utils/utils";
import { useFormContext, type FieldValues } from "react-hook-form";
import type { FormField as FormFieldType } from "@/types";

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

type Option = {
  key: string;
  value: string;
};

interface FormSelectProps<T extends FieldValues> extends FormFieldType<T> {
  options: Option[];
  size?: "default" | "sm" | "lg" | "xl";
}

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  size = "default",
  placeholder,
  className,
  options,
}: FormSelectProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger size={size}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.value}
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
