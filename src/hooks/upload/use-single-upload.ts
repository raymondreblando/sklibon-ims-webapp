import { useCallback, useState } from "react";
import type { UploadProgress } from "@/types";
import { useUpload } from "./use-upload-file";

import type {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";

interface UseUploadProps<T extends FieldValues> {
  folder: string;
  field: Path<T>;
  setValue: UseFormSetValue<T>;
}

export const useSingleUpload = <T extends FieldValues>({
  folder,
  field,
  setValue,
}: UseUploadProps<T>) => {
  const [upload, setUpload] = useState<UploadProgress | null>(null);
  const { uploadFile, ...uploadState } = useUpload({ folder });

  const handleUpload = useCallback(
    (file: File) => {
      const abortController = new AbortController();

      uploadFile(file, onProgress, abortController.signal)
        .then((fileUrl) => {
          setValue(field, fileUrl as PathValue<T, Path<T>>, {
            shouldValidate: true,
          });
          setUpload((prevUpload) => {
            if (!prevUpload) return null;
            return {
              ...prevUpload,
              progress: 100,
            };
          });
        })
        .catch(() =>
          setValue(field, "" as PathValue<T, Path<T>>, {
            shouldValidate: true,
          }),
        );
    },
    [field, setValue, uploadFile],
  );

  return { upload, handleUpload, ...uploadState };
};
