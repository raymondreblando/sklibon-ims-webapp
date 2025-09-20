import { useFormContext, type FieldError } from "react-hook-form";
import { useFileUpload } from "@/contexts/file-upload-context";

import { CircleUserRoundIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadError } from "@/components/upload/file-upload/upload-error";

interface ProfileUploadProps {
  formError?: FieldError | undefined;
}

export const ProfileUpload = ({ formError }: ProfileUploadProps) => {
  const {
    files,
    removeFile,
    errors,
    inputRef,
    accepted,
    addError,
    maxSize,
    addFile,
  } = useFileUpload();
  const { setValue } = useFormContext();

  const previewUrl = files[0]?.preview || null;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      addError("Please upload a file.");
      return;
    }

    const fileList = Array.from(files);

    const validFileTypes = fileList.every((file) =>
      Object.values(accepted).includes(file.type),
    );

    if (!validFileTypes) {
      addError(
        `Please upload file with ${Object.keys(accepted).toString()} extensions.`,
      );
      return;
    }

    const hasLargeFile = fileList.find((file) => file.size > maxSize);

    if (hasLargeFile) {
      addError(`File selected exceeds ${maxSize.toFixed(0)} MB limit.`);
      return;
    }

    fileList.forEach((file) => addFile(file));
    setValue("hasSelectedFile", true, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative inline-flex"
        onClick={() => inputRef.current?.click()}
      >
        <Input
          type="file"
          className="sr-only hidden"
          aria-label="Upload files"
          ref={inputRef}
          onChange={(event) => handleOnChange(event)}
        />
        <button
          type="button"
          className="border-input hover:bg-background-muted relative flex size-16 items-center justify-center overflow-hidden rounded-full border border-dashed transition-colors outline-none focus-visible:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none"
          aria-label={previewUrl ? "Change image" : "Upload image"}
        >
          {previewUrl ? (
            <img
              className="size-full object-cover"
              src={previewUrl}
              alt={files[0]?.file?.name || "Uploaded image"}
              width={64}
              height={64}
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div aria-hidden="true">
              <CircleUserRoundIcon className="size-4 opacity-60" />
            </div>
          )}
        </button>
        {previewUrl && (
          <Button
            onClick={() => removeFile(files[0]?.id)}
            size="icon"
            className="border-background focus-visible:border-background absolute -top-1 -right-1 size-6 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" />
          </Button>
        )}
        <input
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
      <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-sm"
      >
        Upload new account profile
      </p>
      {(formError || errors.length > 0) && (
        <UploadError
          alertProps={{ className: "mt-2" }}
          titleProps={{ className: "line-clamp-0" }}
          error={errors.length ? errors[0] : formError}
        />
      )}
    </div>
  );
};
