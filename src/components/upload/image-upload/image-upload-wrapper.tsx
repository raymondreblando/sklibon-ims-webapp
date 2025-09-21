import { formatFileSize } from "@/lib/utils/file";
import { useFileUpload } from "@/contexts/file-upload-context";
import { useChangeFile } from "@/components/upload/use-change-file";

import { ImageIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ImageUploadWrapper = () => {
  const { maxSize, inputProps, inputRef } = useFileUpload();
  const { handleOnChange } = useChangeFile();

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div className="hover:bg-background-muted has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]">
          <Input
            {...inputProps}
            type="file"
            className="sr-only hidden"
            aria-label="Upload files"
            ref={inputRef}
            onChange={(event) => handleOnChange(event)}
          />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="mb-1.5 text-sm font-medium">Upload your image here</p>
            <p className="text-muted-foreground text-xs">
              PNG, JPG, or WebP (max. {formatFileSize(maxSize)})
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4"
              onClick={() => inputRef.current?.click()}
            >
              <UploadIcon
                className="-ms-1 size-4 opacity-60"
                aria-hidden="true"
              />
              Select image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
