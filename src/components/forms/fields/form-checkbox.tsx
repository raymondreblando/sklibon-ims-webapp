import { useFormContext, type FieldValues } from "react-hook-form";
import type { FormField as FormFieldType } from "@/types";

import { cn } from "@/lib/utils/utils";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormCheckboxProps<T extends FieldValues>
  extends Omit<FormFieldType<T>, "placeholder"> {
  item: { id: string; label: string; description?: string };
  description?: string;
}

export const FormCheckbox = <T extends FieldValues>({
  label,
  description,
  name,
  item,
  className,
}: FormCheckboxProps<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <div>
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormField
            key={item.id}
            control={control}
            name={name}
            render={({ field }) => {
              return (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start gap-2"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="grid gap-1 font-normal">
                    <FormLabel className="text-sm font-semibold">
                      {item.label}
                    </FormLabel>
                    {item.description && (
                      <p className="text-muted text-sm">
                        {item.description}
                      </p>
                    )}
                  </div>
                </FormItem>
              );
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
