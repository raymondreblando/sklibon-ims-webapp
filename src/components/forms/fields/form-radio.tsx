import { useFormContext, type FieldValues } from "react-hook-form";
import { type FormField as FormFieldType, type Option } from "@/types";

import { cn } from "@/lib/utils/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormRadioProps<T extends FieldValues> extends FormFieldType<T> {
  options: Array<Option>;
}

export const FormRadio = <T extends FieldValues>({
  name,
  label,
  className,
  options,
}: FormRadioProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-wrap gap-4"
            >
              {options.map((option) => (
                <FormItem key={option.key} className="flex items-center gap-3">
                  <FormControl>
                    <RadioGroupItem value={option.key} />
                  </FormControl>
                  <FormLabel className="text-base font-normal">
                    {option.value}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
