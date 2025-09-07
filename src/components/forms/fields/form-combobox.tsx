import { useState, type ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFormContext, type FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils/utils";
import type { FormField as FormFieldType, ApiResponse } from "@/types";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormComboboxProps<T extends FieldValues, TData>
  extends FormFieldType<T> {
  queryKey: unknown[];
  queryFn: () => Promise<ApiResponse<TData[]>>;
  labelKey: keyof TData;
  valueKey: keyof TData;
  commandPlaceholder: string;
  resource: string;
  buttonProps?: ComponentProps<"button"> & VariantProps<typeof buttonVariants>;
  popoverContentClassname?: string;
}

export function FormCombobox<T extends FieldValues, TData>({
  name,
  label,
  placeholder,
  commandPlaceholder,
  resource,
  className,
  queryKey,
  queryFn,
  labelKey,
  valueKey,
  buttonProps,
  popoverContentClassname,
}: FormComboboxProps<T, TData>) {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey,
    queryFn,
  });

  const options = response?.data ?? [];

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          <FormLabel className="text-base">{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  {...buttonProps}
                  role="combobox"
                  className={cn(
                    "w-full justify-between font-medium hover:bg-background hover:text-foreground",
                    !field.value && "text-muted-foreground",
                    buttonProps?.className,
                  )}
                >
                  {field.value
                    ? String(
                        options.find(
                          (option) => option[valueKey] === field.value,
                        )?.[labelKey] ?? "",
                      )
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "w-[350px] p-0 md:w-[450px]",
                popoverContentClassname,
              )}
            >
              <Command>
                <CommandInput
                  placeholder={commandPlaceholder}
                  className="h-9"
                />
                <CommandList>
                  {isLoading && <CommandItem disabled>Loading...</CommandItem>}
                  {isError && (
                    <CommandItem disabled>Error fetching data</CommandItem>
                  )}
                  <CommandEmpty>{`No ${resource} found.`}</CommandEmpty>
                  <CommandGroup onClick={() => setOpen(false)}>
                    {options.map((option) => (
                      <CommandItem
                        value={String(option[labelKey])}
                        key={String(option[valueKey])}
                        onSelect={() => {
                          field.onChange(option[valueKey]);
                        }}
                      >
                        {String(option[labelKey])}
                        <Check
                          className={cn(
                            "ml-auto",
                            option[valueKey] === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
