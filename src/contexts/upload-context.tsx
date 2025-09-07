import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface UploadContextProps {
  folder: string;
  files: FileList | null;
  handleFiles: (files: FileList) => void;
  preview: string | undefined;
  generatePreview: (file: File | null) => void;
}

const UploadContext = createContext<UploadContextProps | null>(null);

export const useUpload = () => {
  const uploadContext = useContext(UploadContext);

  if (!uploadContext) {
    throw new Error("useUpload must be used within a UploadProvider");
  }

  return uploadContext;
};

export const UploadProvider = ({
  children,
  uploadFolder,
}: {
  children: React.ReactNode;
  uploadFolder: string;
}) => {
  const [folder] = useState(uploadFolder);
  const [files, setFiles] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const previewUrlRef = useRef<string | null>(null);

  const handleFiles = useCallback((files: FileList) => {
    setFiles(files);
  }, []);

  const generatePreview = useCallback((file: File | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    if (!file) {
      setPreview(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreview(url);
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({ folder, files, handleFiles, preview, generatePreview }),
    [folder, files, handleFiles, preview, generatePreview],
  );

  return (
    <UploadContext.Provider value={value}>{children}</UploadContext.Provider>
  );
};
