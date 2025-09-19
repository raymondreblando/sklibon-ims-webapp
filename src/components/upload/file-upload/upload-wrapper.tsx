import { useFormContext } from "react-hook-form";
import { formatFileSize } from "@/lib/utils/utils";
import { useFileUpload } from "@/contexts/file-upload-context";

import { FileUpIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const UploadWrapper = () => {
  const { maxSize, inputRef, addError, addFile, accepted, inputProps } =
    useFileUpload();
  const { setValue } = useFormContext();

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
    <div
      role="button"
      className="hover:bg-background-muted has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 tacransition-colors flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-4 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px]"
      onClick={() => inputRef.current?.click()}
    >
      <Input
        {...inputProps}
        type="file"
        className="sr-only hidden"
        aria-label="Upload files"
        ref={inputRef}
        onChange={(event) => handleOnChange(event)}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <FileUpIcon className="size-4 opacity-60" />
        </div>
        <p className="mb-1.5 text-sm font-medium">Upload files</p>
        <p className="text-muted-foreground mb-2 text-xs font-semibold">
          Click to browse
        </p>
        <div className="text-muted-foreground/70 flex flex-wrap justify-center gap-1 text-xs font-medium">
          <span>All files</span>
          <span>∙</span>
          <span>Up to {formatFileSize(maxSize)}</span>
        </div>
      </div>
    </div>
  );
};
