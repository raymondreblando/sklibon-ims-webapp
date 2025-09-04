import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import type { DayPickerProps } from "react-day-picker";
import type { FormField as FormFieldType } from "@/types";
import { useFormContext, type FieldValues } from "react-hook-form";

import { format } from "date-fns";
import { cn } from "@/lib/utils/utils";

import { CalendarIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FormDatePicker<T extends FieldValues> extends FormFieldType<T> {
  dateFormat?: string;
  buttonProps?: ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
  calendarProps?: DayPickerProps;
}

export const FormDatePicker = <T extends FieldValues>({
  name,
  label,
  placeholder,
  className,
  dateFormat,
  buttonProps,
  calendarProps,
}: FormDatePicker<T>) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  {...buttonProps}
                  className={cn(
                    "hover:text-foreground w-full pl-3 text-left font-normal hover:bg-sidebar",
                    !field.value && "text-muted-foreground",
                    buttonProps?.className,
                  )}
                >
                  {field.value ? (
                    format(field.value, dateFormat ?? "PPP")
                  ) : (
                    <span>{placeholder ?? "Pick a date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
                {...calendarProps}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
