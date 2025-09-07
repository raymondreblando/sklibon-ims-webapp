import { toast } from "react-toastify";
import React, { useRef, type ComponentProps } from "react";
import { UploadIcon } from "lucide-react";

import { cn } from "@/lib/utils/utils";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useUpload } from "@/contexts/upload-context";

interface UploaderProps {
  acceptedExtensions: string[];
  maxSize?: number;
  handlePreview?: (file: File | null) => void;
  uploaderProps?: ComponentProps<"div">;
  inputProps?: ComponentProps<"input">;
}

export const Uploader = ({
  acceptedExtensions,
  maxSize = 2 * 1024 * 1024,
  handlePreview,
  uploaderProps,
  inputProps,
}: UploaderProps) => {
  const { setValue } = useFormContext();
  const { handleFiles } = useUpload();
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

    const tooLarge = Array.from(files).find((file) => file.size > maxSize);
    if (tooLarge) {
      toast.error(
        `File selected exceeds ${(maxSize / 1024 / 1024).toFixed(0)} MB limit.`,
      );
      return;
    }

    if (handlePreview) {
      handlePreview(files[0]);
    }

    setValue("hasSelectedFile", true);
    handleFiles(files);
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
