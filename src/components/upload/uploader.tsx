import { toast } from "react-toastify";
import React, { useRef, type ComponentProps } from "react";
import { UploadIcon } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { Input } from "@/components/ui/input";

interface UploaderProps {
  handleUpload: ((files: FileList) => void) | ((file: File) => void);
  acceptedExtensions: string[];
  handlePreview?: (file: File | null) => void;
  uploaderProps?: ComponentProps<"div">;
  inputProps?: ComponentProps<"input">;
}

export const Uploader = ({
  handleUpload,
  acceptedExtensions,
  handlePreview,
  uploaderProps,
  inputProps,
}: UploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      toast.error("Please upload a file.");
      return;
    }

    const allValid = Array.from(files).every((file) => {
      return acceptedExtensions.includes(file.type);
    });

    if (!allValid) {
      toast.error(
        `Please upload file with ${acceptedExtensions.toString()} extensions.`,
      );
      return;
    }

    if (handlePreview) {
      handlePreview(files[0]);
    }

    if (inputProps?.multiple) {
      (handleUpload as (files: FileList) => void)(files);
    } else {
      (handleUpload as (file: File) => void)(files[0]);
    }
  };

  return (
    <div
      className={cn(
        "border-input flex cursor-pointer items-center gap-x-4 rounded-md border p-4",
        uploaderProps?.className,
      )}
      role="button"
      {...uploaderProps}
      onClick={() => inputRef.current?.click()}
    >
      <Input
        ref={inputRef}
        {...inputProps}
        onChange={(event) => handleChange(event)}
        type="file"
        className="hidden"
      />
      <div className="bg-primary text-primary-foreground rounded-md p-2">
        <UploadIcon className="h-4 w-4" />
      </div>
      <span className="bg-background-muted text-foreground rounded-md px-3 py-1 text-base font-medium">
        Choose a file to upload.
      </span>
    </div>
  );
};
