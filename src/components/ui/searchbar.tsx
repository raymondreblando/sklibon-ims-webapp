import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/utils";

import { SearchIcon } from "lucide-react";
import { Input, inputVariants } from "@/components/ui/input";

interface SearchbarProps {
  wrapperProps?: ComponentProps<"div">;
  inputProps?: ComponentProps<"input"> & VariantProps<typeof inputVariants>;
}

export const Searchbar = ({ wrapperProps, inputProps }: SearchbarProps) => {
  return (
    <div
      {...wrapperProps}
      className={cn(
        "bg-background-muted border-input flex items-center gap-x-2 rounded-md border px-4",
        wrapperProps?.className,
      )}
    >
      <Input
        placeholder={inputProps?.placeholder}
        className={cn(
          "placeholder:text-muted border-0 p-0 shadow-none outline-none focus-visible:border-0 focus-visible:ring-0",
          inputProps?.className,
        )}
        {...inputProps}
      />
      <SearchIcon className="text-muted" />
    </div>
  );
};
