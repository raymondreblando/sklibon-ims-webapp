import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import type { FieldError } from "react-hook-form";

export const UploadError = ({
  error,
}: {
  error: (string | undefined) | (FieldError | undefined);
}) => {
  return (
    <Alert variant="destructive" className="border-destructive border">
      <AlertCircleIcon className="size-3 shrink-0" />
      <AlertTitle>
        {typeof error === "object" ? error?.message : error}
      </AlertTitle>
    </Alert>
  );
};
