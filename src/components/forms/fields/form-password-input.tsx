import { cn } from "@/lib/utils/utils";
import { useFormContext, type FieldValues } from "react-hook-form";
import { usePasswordInput } from "@/hooks/use-password-input";

import type { FormField as FormFieldType } from "@/types";
import type { VariantProps } from "class-variance-authority";

import { Input, inputVariants } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface FormPasswordInputProps<T extends FieldValues>
  extends FormFieldType<T>,
    Pick<VariantProps<typeof inputVariants>, "variant"> {}

export const FormPasswordInput = <T extends FieldValues>({
  variant,
  name,
  label,
  placeholder,
  className,
}: FormPasswordInputProps<T>) => {
  const { control } = useFormContext();
  const { showPassword, handleToggle } = usePasswordInput();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <div className="relative">
            {showPassword ? (
              <EyeClosed
                className={cn("input-icon action-icon")}
                onClick={handleToggle}
              />
            ) : (
              <Eye
                className={cn("input-icon action-icon")}
                onClick={handleToggle}
              />
            )}
            <FormControl>
              <Input
                variant={variant}
                {...field}
                placeholder={placeholder}
                type={showPassword ? "text" : "password"}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
