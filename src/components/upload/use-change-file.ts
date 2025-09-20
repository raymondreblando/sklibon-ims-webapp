import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useFileUpload } from "@/contexts/file-upload-context";

export const useChangeFile = () => {
  const { maxSize, addError, addFile, accepted } = useFileUpload();
  const { setValue } = useFormContext();

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    [accepted, addError, maxSize, addFile, setValue],
  );

  return { handleOnChange };
};
