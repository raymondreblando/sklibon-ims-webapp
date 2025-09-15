import { useFileUpload } from "@/contexts/file-upload-context";

import { UploadError } from "./upload-error";
import { UploadedFile } from "./uploaded-file";
import { UploadWrapper } from "./upload-wrapper";
import type { FieldError } from "react-hook-form";

export const FileUpload = ({
  formError,
}: {
  formError?: FieldError | undefined;
}) => {
  const { files, errors } = useFileUpload();

  return (
    <>
      <UploadWrapper />
      {(formError || errors.length > 0) && (
        <UploadError error={errors.length ? errors[0] : formError} />
      )}
      {files.length > 0 &&
        files.map((file) => <UploadedFile key={file.id} file={file} />)}
    </>
  );
};
