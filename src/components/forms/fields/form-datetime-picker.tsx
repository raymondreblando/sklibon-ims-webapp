import { useState, type ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import type { VariantProps } from "class-variance-authority";
import type { FormField as FormFieldType } from "@/types";
import type { DayPickerProps } from "react-day-picker";

import { format } from "date-fns";
import { cn } from "@/lib/utils/utils";
import { CalendarIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface FormDateTimePickerProps<T extends FieldValues>
  extends FormFieldType<T> {
  dateFormat?: string;
  calendarProps?: Omit<DayPickerProps, "mode">;
  buttonProps?: ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
  inputProps?: ComponentProps<"input">;
}

export const FormDateTimePicker = <T extends FieldValues>({
  name,
  label,
  className,
  dateFormat = "PPP",
  calendarProps,
  buttonProps,
  inputProps,
}: FormDateTimePickerProps<T>) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const date = field.value ? new Date(field.value) : undefined;
        const time = date ? format(date, "HH:mm") : "";

        const handleDateSelect = (selected: Date | undefined) => {
          if (!selected) return;
          const [h, m] = time.split(":").map(Number);
          selected.setHours(h);
          selected.setMinutes(m);
          field.onChange(format(selected, "yyyy-MM-dd HH:mm:ss"));
          setOpen(false);
        };

        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const [h, m] = e.target.value.split(":").map(Number);
          const base = date ?? new Date();
          const newDate = new Date(base);
          newDate.setHours(h);
          newDate.setMinutes(m);
          field.onChange(format(newDate, "yyyy-MM-dd HH:mm:ss"));
        };

        return (
          <FormItem className={cn("flex flex-col gap-3", className)}>
            <FormLabel className="text-base">{label}</FormLabel>
            <div className="flex flex-col gap-4 md:flex-row md:flex-nowrap">
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      {...buttonProps}
                      className={cn(
                        "hover:text-foreground hover:bg-sidebar w-full pl-3 text-left text-base font-normal md:w-1/2",
                        !field.value && "text-muted-foreground",
                        fieldState.error && "border-destructive",
                        buttonProps?.className,
                      )}
                    >
                      {field.value ? (
                        format(field.value, dateFormat ?? "PPP")
                      ) : (
                        <span>{"Pick a date"}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      captionLayout="dropdown"
                      defaultMonth={field.value ?? new Date()}
                      {...calendarProps}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormControl>
                <div className="flex w-full flex-col gap-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    step={60}
                    {...inputProps}
                    className={cn(
                      fieldState.error && "border-destructive border",
                    )}
                  />
                </div>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
