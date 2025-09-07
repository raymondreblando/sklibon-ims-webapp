import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";

export const Subheading = ({
  className,
  children,
  ...props
}: ComponentProps<"p">) => {
  return (
    <p {...props} className={cn("text-muted text-sm md:text-base", className)}>
      {children}
    </p>
  );
};
