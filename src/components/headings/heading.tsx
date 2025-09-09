import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";

export const Heading = ({
  className,
  children,
  ...props
}: ComponentProps<"h1">) => {
  return (
    <h1 {...props} className={cn("mb-2 text-2xl font-extrabold", className)}>
      {children}
    </h1>
  );
};
