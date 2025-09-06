import { useCallback, useState } from "react";
import type { UploadProgress } from "@/types";
import { useUpload } from "./use-upload";

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
  defaultFilename?: string;
}

export const useSingleUpload = <T extends FieldValues>({
  folder,
  field,
  setValue,
  defaultFilename,
}: UseUploadProps<T>) => {
  const [upload, setUpload] = useState<UploadProgress | null>(null);
  const { uploadFile, ...uploadState } = useUpload({ folder });

  const handleUpload = useCallback(
    (file: File) => {
      const abortController = new AbortController();

      const newUploads: UploadProgress = {
        name: file.name,
        file: file,
        progress: 0,
      };
      setUpload(newUploads);

      const onProgress = (progress: number) => {
        setUpload((prevUpload) => {
          if (!prevUpload) return null;
          return {
            ...prevUpload,
            progress: progress === 100 ? 99 : progress,
          };
        });
      };

      uploadFile(file, onProgress, abortController.signal, defaultFilename)
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
    [field, setValue, uploadFile, defaultFilename],
  );

  return { upload, handleUpload, ...uploadState };
};
