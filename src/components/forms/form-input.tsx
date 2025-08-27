import type { ReactElement } from "react";
import type { VariantProps } from "class-variance-authority";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Input, inputVariants } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export type FormInputProps<T extends FieldValues> = Pick<
  VariantProps<typeof inputVariants>,
  "variant"
> & {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  type?: string;
  icon?: ReactElement;
};

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
        <FormItem className={className}>
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
