import { Link, type LinkComponentProps } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

interface ButtonLinkProps
  extends LinkComponentProps,
    VariantProps<typeof buttonVariants> {}

export const ButtonLink = ({
  className,
  variant,
  size,
  children,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      {...props}
      className={cn(buttonVariants({ variant, size, className }))}
    >
      {children}
    </Link>
  );
};
