import { v4 as uuidV4 } from "uuid";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
} from "react";

export type FileUpload = {
  id: string;
  file: File;
  preview?: string;
};

interface FileUploadContextProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  folder: string;
  maxSize: number;
  accepted: { [key: string]: string };
  files: Array<FileUpload>;
  errors: Array<string>;
  inputProps?: ComponentProps<"input">;
  addError: (error: string) => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  resetUploads: () => void;
}

const FileUploadContext = createContext<FileUploadContextProps | undefined>(
  undefined,
);

export const useFileUpload = () => {
  const context = useContext(FileUploadContext);
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUploadProvider");
  }
  return context;
};

interface FileUploadProviderProps {
  folder: string;
  accepted: { [key: string]: string };
  children: React.ReactNode;
  fileInputProps?: ComponentProps<"input">;
  maxFileSize?: number;
}

export const FileUploadProvider = ({
  folder,
  maxFileSize = 2 * 1024 * 1024,
  accepted,
  fileInputProps,
  children,
}: FileUploadProviderProps) => {
  const [uploadFolder] = useState(folder);
  const [maxSize] = useState(maxFileSize);
  const [acceptedExtensions] = useState(accepted);
  const [fileUploads, setFileUploads] = useState<Array<FileUpload>>([]);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [inputProps] = useState(fileInputProps);

  const inputRef = useRef<HTMLInputElement>(null);

  const addError = useCallback((error: string) => {
    setErrors((prev) => (prev ? [...prev, error] : [error]));
  }, []);

  const addFile = useCallback(
    (file: File) => {
      if (errors.length) {
        setErrors([]);
      }

      const newFile: FileUpload = {
        id: uuidV4(),
        file: file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      };

      setFileUploads((prev) => (prev ? [...prev, newFile] : [newFile]));
    },
    [errors],
  );

  const removeFile = useCallback((fileId: string) => {
    setFileUploads((prev) =>
      prev ? prev?.filter((file) => file.id !== fileId) : prev,
    );
  }, []);

  const resetUploads = useCallback(() => {
    if (fileUploads.length) {
      fileUploads.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    }

    setFileUploads([]);
  }, [fileUploads]);

  useEffect(() => {
    return fileUploads?.forEach((file) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
    });
  }, [fileUploads]);

  const value = useMemo(
    () => ({
      folder: uploadFolder,
      maxSize,
      accepted: acceptedExtensions,
      files: fileUploads,
      errors,
      addError,
      addFile,
      removeFile,
      resetUploads,
      inputRef,
      inputProps,
    }),
    [
      uploadFolder,
      maxSize,
      acceptedExtensions,
      fileUploads,
      errors,
      addError,
      addFile,
      removeFile,
      resetUploads,
      inputProps,
    ],
  );

  return (
    <FileUploadContext.Provider value={value}>
      {children}
    </FileUploadContext.Provider>
  );
};
