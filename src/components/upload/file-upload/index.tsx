import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils/utils";
import { useFileUpload } from "@/contexts/file-upload-context";

import { UploadError } from "./upload-error";
import { UploadedFile } from "./uploaded-file";
import { UploadWrapper } from "./upload-wrapper";

interface FileUploadProps extends ComponentProps<"div"> {
  formError?: FieldError | undefined;
}

export const FileUpload = ({
  formError,
  className,
  ...props
}: FileUploadProps) => {
  const { files, errors } = useFileUpload();

  return (
    <div {...props} className={cn("relative space-y-2", className)}>
      <UploadWrapper />
      {(formError || errors.length > 0) && (
        <UploadError error={errors.length ? errors[0] : formError} />
      )}
      {files.length > 0 &&
        files.map((file) => <UploadedFile key={file.id} file={file} />)}
    </div>
  );
};
