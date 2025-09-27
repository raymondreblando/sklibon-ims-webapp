import { cn } from "@/lib/utils/utils";
import type { ComponentProps } from "react";
import type { FieldError } from "react-hook-form";
import { useFileUpload } from "@/contexts/file-upload-context";

import { ImageUploadWrapper } from "./image-upload-wrapper";
import { UploadPreview } from "./upload-preview";
import { UploadError } from "@/components/upload/file-upload/upload-error";

interface ImageUploadProps {
  formError?: FieldError | undefined;
  aspect?: "square" | "video";
  wrapperProps?: ComponentProps<"div">;
  previewWrapperProps?: ComponentProps<"div">;
}

export const ImageUpload = ({
  formError,
  aspect = "square",
  wrapperProps,
  previewWrapperProps,
}: ImageUploadProps) => {
  const { errors, files } = useFileUpload();

  return (
    <div {...wrapperProps} className={cn("relative", wrapperProps?.className)}>
      <ImageUploadWrapper />
      {(formError || errors.length > 0) && (
        <UploadError error={errors.length ? errors[0] : formError} />
      )}
      {files.length > 0 && (
        <div
          {...previewWrapperProps}
          className={cn(
            "group/preview grid grid-cols-3 gap-4 rounded-md border border-dashed p-4",
            previewWrapperProps?.className,
          )}
          data-aspect={aspect}
        >
          {files.map((file) => (
            <UploadPreview key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};
