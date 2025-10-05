import { type ComponentProps } from "react";
import { cn } from "@/lib/utils/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "text-sm font-semibold md:text-base",
      lg: "text-base md:text-2xl font-extrabold",
      xl: "text-2xl md:text-4xl font-extrabold",
      xxl: "text-3xl md:text-6xl font-extrabold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface HeadingProps
  extends ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {}

export const Heading = ({
  className,
  variant,
  children,
  ...props
}: HeadingProps) => {
  return (
    <h1 {...props} className={cn(headingVariants({ variant, className }))}>
      {children}
    </h1>
  );
};
