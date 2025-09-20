import { type ComponentProps } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import type { FormField as FormFieldType } from "@/types";

import { cn } from "@/lib/utils/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormTextareaProps<T extends FieldValues> extends FormFieldType<T> {
  props?: ComponentProps<"textarea">;
}

export const FormTextarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  props,
}: FormTextareaProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <Textarea
              {...props}
              placeholder={placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
