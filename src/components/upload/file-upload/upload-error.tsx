import { cn } from "@/lib/utils/utils";
import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";

import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export interface UploadErrorProps {
  error: (string | undefined) | (FieldError | undefined);
  alertProps?: ComponentProps<"div">;
  titleProps?: ComponentProps<"div">;
}

export const UploadError = ({
  error,
  alertProps,
  titleProps,
}: UploadErrorProps) => {
  return (
    <Alert
      {...alertProps}
      variant="destructive"
      className={cn("border-destructive border", alertProps?.className)}
    >
      <AlertCircleIcon className="size-3 shrink-0" />
      <AlertTitle {...titleProps} className={titleProps?.className}>
        {typeof error === "object" ? error?.message : error}
      </AlertTitle>
    </Alert>
  );
};
