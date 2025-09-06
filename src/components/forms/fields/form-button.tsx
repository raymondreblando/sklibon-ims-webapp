import type { ComponentProps } from "react";
import { Loader2Icon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

export interface FormButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  isSubmitting: boolean;
  loaderClassname?: string;
}

export const FormButton = ({
  children,
  size = "default",
  isSubmitting,
  loaderClassname,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      size={size}
      {...(isSubmitting && { disabled: true })}
      {...props}
      className={cn(isSubmitting && "cursor-progress")}
    >
      {isSubmitting && (
        <Loader2Icon className={cn("animate-spin", loaderClassname)} />
      )}
      {children}
    </Button>
  );
};
