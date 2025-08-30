import type { ReactElement } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";
import { useFormContext, type FieldValues } from "react-hook-form";
import { Input, inputVariants } from "@/components/ui/input";
import type { FormField as FormFieldType, InputType } from "@/types";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface FormInputProps<T extends FieldValues>
  extends FormFieldType<T>,
    Pick<VariantProps<typeof inputVariants>, "variant"> {
  type?: InputType;
  icon?: ReactElement;
}

export const FormInput = <T extends FieldValues>({
  variant,
  name,
  label,
  placeholder,
  className,
  type = "text",
  icon,
}: FormInputProps<T>) => {
  const { control } = useFormContext();
  const Icon = icon;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <div className="relative">
            {Icon && Icon}
            <FormControl>
              <Input
                variant={variant}
                {...field}
                placeholder={placeholder}
                type={type}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
