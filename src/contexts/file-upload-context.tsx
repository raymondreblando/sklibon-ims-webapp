import { v4 as uuidV4 } from "uuid";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react";
import {
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react";

export type FileUpload = {
  id: string;
  name: string;
  size: number;
  type: string;
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
  addError: (error: string) => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  resetUploads: () => void;
  getFileIcon: (file: {
    file:
      | File
      | {
          type: string;
          name: string;
        };
  }) => JSX.Element;
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
  maxFileSize?: number;
}

export const FileUploadProvider = ({
  folder,
  maxFileSize = 2 * 1024 * 1024,
  accepted,
  children,
}: FileUploadProviderProps) => {
  const [uploadFolder] = useState(folder);
  const [maxSize] = useState(maxFileSize);
  const [acceptedExtensions] = useState(accepted);
  const [fileUploads, setFileUploads] = useState<Array<FileUpload>>([]);
  const [errors, setErrors] = useState<Array<string>>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = useCallback(
    (file: { file: File | { type: string; name: string } }) => {
      const fileType =
        file.file instanceof File ? file.file.type : file.file.type;
      const fileName =
        file.file instanceof File ? file.file.name : file.file.name;

      if (
        fileType.includes("pdf") ||
        fileName.endsWith(".pdf") ||
        fileType.includes("word") ||
        fileName.endsWith(".doc") ||
        fileName.endsWith(".docx")
      ) {
        return <FileTextIcon className="size-4" />;
      } else if (
        fileType.includes("zip") ||
        fileType.includes("archive") ||
        fileName.endsWith(".zip") ||
        fileName.endsWith(".rar")
      ) {
        return <FileArchiveIcon className="size-4" />;
      } else if (
        fileType.includes("excel") ||
        fileName.endsWith(".xls") ||
        fileName.endsWith(".xlsx")
      ) {
        return <FileSpreadsheetIcon className="size-4" />;
      } else if (fileType.includes("video/")) {
        return <VideoIcon className="size-4" />;
      } else if (fileType.includes("audio/")) {
        return <HeadphonesIcon className="size-4" />;
      } else if (fileType.startsWith("image/")) {
        return <ImageIcon className="size-4" />;
      }
      return <FileIcon className="size-4" />;
    },
    [],
  );

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
        name: file.name,
        size: file.size,
        type: file.type,
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
      getFileIcon,
      inputRef,
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
      getFileIcon,
    ],
  );

  return (
    <FileUploadContext.Provider value={value}>
      {children}
    </FileUploadContext.Provider>
  );
};
