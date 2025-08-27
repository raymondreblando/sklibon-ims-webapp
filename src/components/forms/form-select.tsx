import { useFormContext, type FieldValues, type Path } from "react-hook-form";
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
import { cn } from "@/lib/utils";

type Option = {
  key: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: Option[];
  size?: "default" | "sm" | "lg" | "xl";
  placeholder?: string;
  className?: string;
};

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
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <FormLabel className="text-base">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
