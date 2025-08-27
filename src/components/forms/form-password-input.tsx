import { useFormContext, type FieldValues } from "react-hook-form";
import type { FormInputProps } from "./form-input";
import { usePasswordInput } from "@/hooks/use-password-input";

import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type FormPasswordInputProps<T extends FieldValues> = Omit<
  FormInputProps<T>,
  "icon" | "type"
>;

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
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel className="text-base">{label}</FormLabel>
          <div className="relative">
            {showPassword ? (
              <EyeClosed
                className={cn(
                  "input-icon action-icon",
                  fieldState.error && "text-destructive",
                )}
                onClick={handleToggle}
              />
            ) : (
              <Eye
                className={cn(
                  "input-icon action-icon",
                  fieldState.error && "text-destructive",
                )}
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
