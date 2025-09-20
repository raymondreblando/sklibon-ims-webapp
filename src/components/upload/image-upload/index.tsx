import type { FieldError } from "react-hook-form";
import { useFileUpload } from "@/contexts/file-upload-context";

import { ImageUploadWrapper } from "./image-upload-wrapper";
import { UploadPreview } from "./upload-preview";
import { UploadError } from "@/components/upload/file-upload/upload-error";

interface ImageUploadProps {
  formError?: FieldError | undefined;
}

export const ImageUpload = ({ formError }: ImageUploadProps) => {
  const { errors, files } = useFileUpload();

  return (
    <>
      <ImageUploadWrapper />
      {(formError || errors.length > 0) && (
        <UploadError error={errors.length ? errors[0] : formError} />
      )}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-4 rounded-md border border-dashed p-4">
          {files.map((file) => (
            <UploadPreview key={file.id} file={file} />
          ))}
        </div>
      )}
    </>
  );
};
