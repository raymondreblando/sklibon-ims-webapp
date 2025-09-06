import { toast } from "react-toastify";
import { useCallback } from "react";
import { v4 as uuidV4 } from "uuid";

import { imagekitAuth } from "@/services/api/auth";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

interface UseUploadProps {
  folder: string;
}

export const useUpload = ({ folder }: UseUploadProps) => {
  const uploadFile = useCallback(
    async (
      file: File,
      onProgress: (progress: number) => void,
      abortSignal: AbortSignal,
      defaultFilename?: string,
    ) => {
      const uuid = uuidV4();

      try {
        const { data: authParams } = await imagekitAuth();

        const filename = defaultFilename ?? `${uuid}-${file.name}`;

        const response = await upload({
          ...authParams,
          publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
          file: file,
          fileName: filename,
          folder: folder,
          useUniqueFileName: false,
          onProgress: (progress) => {
            const percentage = (progress.loaded / progress.total) * 100;
            onProgress(percentage);
          },
          abortSignal: abortSignal,
        });

        return response.url;
      } catch (error) {
        if (error instanceof ImageKitAbortError) {
          toast.error(`Upload aborted: ${error.reason}`);
        } else if (error instanceof ImageKitInvalidRequestError) {
          toast.error(`Invalid request: ${error.message}`);
        } else if (error instanceof ImageKitUploadNetworkError) {
          toast.error(`Network error: ${error.message}`);
        } else if (error instanceof ImageKitServerError) {
          toast.error(`Server error: ${error.message}`);
        } else {
          toast.error(`Upload error: ${error}`);
        }
      }
    },
    [folder],
  );

  return { uploadFile };
};
